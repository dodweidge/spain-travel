const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/maps/marker-layout.js'), 'utf8'), context);
const layout = context.window.TravelMarkerLayout;
const viewport = {width: 800, height: 550};
const point = (id, x, y, nameWidth = 0, priority = 1) => ({id, x, y, nameWidth, priority});
function clearLabels(result, area = viewport) {
  for (const a of result) {
    assert(Number.isFinite(a.dx) && Number.isFinite(a.dy));
    assert(a.rect.left >= 8 && a.rect.right <= area.width - 8);
    assert(a.rect.top >= 8 && a.rect.bottom <= area.height - 28);
    for (const b of result) if (a.id !== b.id) {
      assert(a.rect.right + 4 <= b.rect.left || b.rect.right + 4 <= a.rect.left
        || a.rect.bottom + 4 <= b.rect.top || b.rect.bottom + 4 <= a.rect.top,
      `${a.id} overlaps ${b.id}`);
    }
  }
}
// Casa Batlló and Casa Amatller: nearby numbers, with the selected name expanded.
const neighbours = [point('03', 370, 278), point('05', 390, 260, 104, 10000)];
const original = JSON.stringify(neighbours);
const result = layout(neighbours, viewport);
clearLabels(result);
assert(result.some(p => Math.hypot(p.dx, p.dy) > 0));
assert.equal(JSON.stringify(neighbours), original, 'geographic anchors are immutable');
assert.equal(JSON.stringify(result), JSON.stringify(layout(neighbours, viewport)), 'stable placement');
// Reference style: both numbers fan out, with a diagonal followed by a horizontal leader.
const leftCallout = result.find(p => p.id === '03'), rightCallout = result.find(p => p.id === '05');
assert(leftCallout.dx <= -60 && rightCallout.dx >= 60, 'close pair opens to opposite sides');
assert(leftCallout.dy < 0 && rightCallout.dy < 0);
assert.equal(leftCallout.side, 'left'); assert.equal(rightCallout.side, 'right');
for (const p of result) {
  const segments = layout.leader(p).match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.equal(segments.length, 6, 'one diagonal and one horizontal segment');
  assert.equal(segments[3], segments[5], 'horizontal tail');
  assert(Math.abs(segments[4] - segments[2]) >= 28, 'visible horizontal length');
  assert(Math.abs(segments[2]) > 0 && Math.abs(segments[3]) > 0, 'diagonal leaves the true coordinate');
}
const compactPair = neighbours.map(p => ({...p, nameWidth: 0, priority: 1}));
const compactLayout = layout(compactPair, viewport);
assert(compactLayout.find(p => p.id === '03').dx < 0 && compactLayout.find(p => p.id === '05').dx > 0);
assert.equal(JSON.stringify(compactLayout), JSON.stringify(layout([...compactPair].reverse(), viewport)), 'sides do not depend on input order');
// An expanded hovered label stays under the pointer while neighbours move away.
const hovered = neighbours.map(p => ({...p, nameWidth: 150,
  fixed: p.id === '03', previous: result.find(r => r.id === p.id)}));
const hoverResult = layout(hovered, viewport);
clearLabels(hoverResult);
const old = result.find(p => p.id === '03'), held = hoverResult.find(p => p.id === '03');
assert.equal(held.dx, old.dx); assert.equal(held.dy, old.dy);
// Coincident points and dense neighbourhoods must still expose every number.
clearLabels(layout(Array.from({length: 16}, (_, i) => point(String(i), 400, 260)), viewport));
const dense = Array.from({length: 24}, (_, i) => point(String(i), 365 + (i % 6) * 12, 240 + Math.floor(i / 6) * 12));
clearLabels(layout(dense, viewport));
// Edge labels choose the inward side; narrow screens also keep names readable.
const edge = layout([point('edge', 770, 220, 150, 10000)], viewport)[0];
assert.equal(edge.side, 'left'); assert.equal(edge.dx, 0);
const mobile = {width: 320, height: 380};
clearLabels(layout([point('a', 300, 55, 150), point('b', 295, 60), point('c', 290, 68)], mobile), mobile);
const edgePair = layout([point('03', 465, 180), point('05', 470, 164, 104, 10000)], {width: 550, height: 270});
clearLabels(edgePair, {width: 550, height: 270});
for (const p of edgePair) assert.equal(p.side, p.dx < 0 ? 'left' : 'right', 'names face away from the leader at an edge');
// Search result panels / controls are excluded from candidate label positions.
const obstacle = {left: 280, top: 140, right: 500, bottom: 320};
const withPanel = layout(neighbours, {...viewport, obstacles: [obstacle]});
clearLabels(withPanel);
for (const p of withPanel) assert(p.rect.right + 4 <= obstacle.left || p.rect.left >= obstacle.right + 4
  || p.rect.bottom + 4 <= obstacle.top || p.rect.top >= obstacle.bottom + 4);
// Zooming in releases displaced labels back to their own coordinates.
const separated = layout([point('03', 180, 230), point('05', 480, 260, 104, 10000)], viewport);
assert(separated.every(p => p.dx === 0 && p.dy === 0));
console.log('Marker layout: paired callouts, elbow leaders, stable sides, dense, hovered, edge, mobile and camera-independent anchors passed.');
