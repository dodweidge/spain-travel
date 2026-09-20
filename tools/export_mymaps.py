#!/usr/bin/env python3
"""Export the website's existing attraction data for Google My Maps import."""
import argparse
import csv
import json
import math
import re
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NS = 'http://www.opengis.net/kml/2.2'
ET.register_namespace('', NS)


def read_array(source, name):
    match = re.search(r'\bconst\s+' + re.escape(name) + r'\s*=\s*', source)
    if not match:
        raise ValueError('Missing website data: ' + name)
    value, _ = json.JSONDecoder().raw_decode(source[match.end():])
    return value


def attractions(pending_only):
    source = (ROOT / 'index.html').read_text(encoding='utf-8')
    cities = read_array(source, 'cities')
    coordinates = read_array(source, 'cityCoordinates')
    by_location = {}
    for point in coordinates:
        location = (point['city'], point['index'])
        if location in by_location:
            raise ValueError('Duplicate coordinate record: ' + str(location))
        by_location[location] = point
    rows = []
    ids = set()
    for city in cities:
        for index, spot in enumerate(city['spots']):
            if pending_only and spot.get('googleImported'):
                continue
            point = by_location[(city['id'], index)]
            lat, lon = float(point['lat']), float(point['lon'])
            if not (math.isfinite(lat) and math.isfinite(lon) and -90 <= lat <= 90 and -180 <= lon <= 180):
                raise ValueError('Invalid coordinates: ' + spot['n'])
            key = point['key']
            if key in ids:
                raise ValueError('Duplicate attraction ID: ' + key)
            ids.add(key)
            description = [spot['d']]
            for field, label in [('duration', '建议预留'), ('highlights', '看点'), ('tip', '参观提示'), ('source', '景点官网')]:
                if spot.get(field):
                    description.append(label + '：' + spot[field])
            description.extend(['位置来源：' + point['source'], '位置为旅行规划参考，不代表售票口或唯一入口。'])
            rows.append({
                '景点ID': key,
                '名称': f"{city['name']} · {index + 1:02d} {spot['n']}",
                '城市': city['name'],
                '分类': spot.get('cat', '景点'),
                '纬度': str(point['lat']),
                '经度': str(point['lon']),
                '介绍': '\n'.join(description),
                '景点官网': spot.get('source', ''),
                '位置来源': point['source'],
            })
    return rows


def export(rows, output, title, *, csv_output=True):
    if not rows:
        raise ValueError('No attractions to export; no files were written.')
    output.parent.mkdir(parents=True, exist_ok=True)
    kml = ET.Element(f'{{{NS}}}kml')
    document = ET.SubElement(kml, f'{{{NS}}}Document')
    ET.SubElement(document, f'{{{NS}}}name').text = title
    ET.SubElement(document, f'{{{NS}}}description').text = f'{len(rows)} 处公共景点，来自旅游网页的中文介绍和参考坐标。'
    for row in rows:
        mark = ET.SubElement(document, f'{{{NS}}}Placemark', id=row['景点ID'])
        ET.SubElement(mark, f'{{{NS}}}name').text = row['名称']
        ET.SubElement(mark, f'{{{NS}}}description').text = row['介绍']
        extended = ET.SubElement(mark, f'{{{NS}}}ExtendedData')
        for key in ['景点ID', '城市', '分类', '景点官网', '位置来源']:
            data = ET.SubElement(extended, f'{{{NS}}}Data', name=key)
            ET.SubElement(data, f'{{{NS}}}value').text = row[key]
        point = ET.SubElement(mark, f'{{{NS}}}Point')
        ET.SubElement(point, f'{{{NS}}}coordinates').text = row['经度'] + ',' + row['纬度'] + ',0'
    ET.indent(kml, space='  ')
    ET.ElementTree(kml).write(output.with_suffix('.kml'), encoding='utf-8', xml_declaration=True)
    result = {'count': len(rows), 'cities': len({r['城市'] for r in rows}), 'kml': str(output.with_suffix('.kml'))}
    if csv_output:
        with output.with_suffix('.csv').open('w', encoding='utf-8-sig', newline='') as target:
            writer = csv.DictWriter(target, fieldnames=list(rows[0]))
            writer.writeheader()
            writer.writerows(rows)
        result['csv'] = str(output.with_suffix('.csv'))
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pending-only', action='store_true', help='Only attractions whose googleImported flag is false.')
    parser.add_argument('--per-city', action='store_true', help='Also refresh each city KML beside the combined export (all-attraction export only).')
    parser.add_argument('--output', type=Path, required=True, help='Output filename stem (writes .kml and .csv).')
    parser.add_argument('--title', default='西班牙与葡萄牙城市景点')
    options = parser.parse_args()
    if options.pending_only and options.per_city:
        parser.error('--per-city requires a full export; do not replace city files with partial data.')
    rows = attractions(options.pending_only)
    result = export(rows, options.output, options.title)
    if options.per_city:
        for city in dict.fromkeys(row['城市'] for row in rows):
            export([row for row in rows if row['城市'] == city], options.output.parent / (city + '-景点'), city + ' · 景点', csv_output=False)
        result['city_files'] = len({row['城市'] for row in rows})
    print(json.dumps(result, ensure_ascii=False))
