/* Google owns the basemap and POI windows; our data owns attraction markers and the sidebar. */
(() => {
  'use strict';
  const config = window.TRAVEL_GOOGLE_MAPS;
  if (!config?.apiKey) return;
  const state = {
    sdk: null, map: null, markers: new Map(), city: null,
    generation: 0, error: false, preserveNextOpen: false, activeKey: null,
    searchGeneration: 0, placesLibrary: null, searchElement: null,
    searchMarkers: new Map(), searchInfo: null, searchTimer: null,
    labels: new Map(), projection: null, layoutFrame: null, resizeObserver: null,
    filter: '全部', filterCity: null
  };
  const points = cityCoordinates.filter(p => cities[p.city]?.spots[p.index]
    && Number.isFinite(p.lat) && Number.isFinite(p.lon));
  const currentPoint = index => points.find(p => p.city === cityMapCity && p.index === index);
  const isVisible = () => onlineMapMode === 'interactive' && $('cityMapDialog').open;
  const matchesSpot = p => cityEntryMatches(cities[p.city].spots[p.index].cat, 'spot', state.filter);

  function renderFilters() {
    const group = $('cityMapFilters');
    group.replaceChildren();
    for (const category of cityEntryCategories(cityMapCity)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.cityMapFilter = category;
      button.textContent = category;
      button.setAttribute('aria-pressed', String(category === state.filter));
      group.append(button);
    }
  }

  function applyFilters() {
    const cityPoints = points.filter(p => p.city === cityMapCity && matchesSpot(p));
    const indices = new Set(cityPoints.map(p => p.index));
    for (const entry of state.markers.values()) {
      const visible = matchesSpot(entry.p);
      entry.marker.map = visible ? state.map : null;
      if (!visible) {
        entry.hovered = entry.focused = false;
        entry.label.classList.remove('expanded');
        moveLabel(entry, {dx: 0, dy: 0, side: 'right'});
      }
    }
    $('cityMapList').querySelectorAll('[data-map-spot]').forEach(button => {
      button.closest('li').hidden = !indices.has(Number(button.dataset.mapSpot));
    });
    const activities = cityActivities(cityMapCity);
    const activityIds = new Set(activities.filter(a => cityEntryMatches(a.type, 'activity', state.filter)).map(a => a.id));
    $('cityMapActivities').querySelectorAll('[data-activity-map]').forEach(button => {
      button.hidden = !activityIds.has(button.dataset.activityMap);
    });
    $('cityMapActivities').hidden = activityIds.size === 0;
    $('cityMapUnlocated').innerHTML = renderUnlocatedPlaces(cityMapCity, state.filter);
    const count = cityPoints.length + activityIds.size;
    $('cityMapFilterCount').textContent = '显示 ' + count + ' / ' + (cities[cityMapCity].spots.length + activities.length) + ' 项';
    $('cityMapFilterEmpty').hidden = count > 0;
    $('cityMapList').hidden = cityPoints.length === 0;
    if (!indices.has(cityMapSelected)) {
      if (cityPoints.length) selectCityMapSpot(cityPoints[0].index, false);
      else {
        cityMapSelected = -1;
        $('cityMapList').querySelectorAll('[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', 'false'));
        select(-1);
      }
    }
    $('cityMapFocus').hidden = !indices.has(cityMapSelected);
    $('cityMapFit').textContent = state.filter === '全部' ? '显示本城全部地点' : '显示筛选地点';
    $('cityMapFit').disabled = !state.map || state.error || cityPoints.length === 0;
    $('cityMapFilters').querySelectorAll('button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.cityMapFilter === state.filter));
    });
    scheduleLayout();
  }

  function prepareFilters(id, spot) {
    if (state.filterCity !== id || !cityEntryCategories(id).includes(state.filter)
      || (spot >= 0 && !cityEntryMatches(cities[id].spots[spot]?.cat, 'spot', state.filter))) state.filter = '全部';
    state.filterCity = id;
    renderFilters();
    applyFilters();
  }

  function message(text, failed = false) {
    $('googleLiveMessage').hidden = false;
    $('googleLiveMessageText').textContent = text;
    $('googleLiveRecovery').hidden = !failed;
    $('googleLivePane').setAttribute('aria-busy', String(!failed));
    $('googleLiveLocate').disabled = true;
    $('googleMapTerm').disabled = true;
    $('googleMapSearch').querySelector('[type="submit"]').disabled = true;
    $('cityMapFit').disabled = onlineMapMode === 'interactive';
  }

  function fail() {
    state.error = true;
    resetSearch();
    if (isVisible()) message('互动地图暂时无法加载，请稍后重新加载，或在 Google 地图中打开。', true);
  }

  // Load the map once per page; Places UI Kit is loaded only when a search is submitted.
  function loadSdk() {
    if (state.sdk) return state.sdk;
    state.sdk = new Promise((resolve, reject) => {
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (error) reject(error); else resolve(window.google.maps);
      };
      const timer = setTimeout(() => finish(new Error('Maps load timed out')), 20000);
      const previousAuthFailure = window.gm_authFailure;
      window.gm_authFailure = () => {
        fail();
        finish(new Error('Maps authentication or quota unavailable'));
        if (typeof previousAuthFailure === 'function') previousAuthFailure();
      };
      window.__spainGoogleMapReady = () => {
        if (!window.google?.maps?.Map || !window.google.maps.marker?.AdvancedMarkerElement) {
          finish(new Error('Maps libraries unavailable'));
        } else finish();
      };
      const script = document.createElement('script');
      script.id = 'travelGoogleMapsSdk';
      script.async = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?' + new URLSearchParams({
        key: config.apiKey, v: config.version || 'weekly', libraries: 'maps,marker',
        loading: 'async', callback: '__spainGoogleMapReady',
        language: config.language || 'zh-CN', region: config.region || 'ES'
      });
      script.onerror = () => finish(new Error('Maps network unavailable'));
      document.head.append(script);
    });
    return state.sdk;
  }

  function chooseMarker(p) {
    if (!isVisible()) return;
    resetSearch(false);
    // An explicit search result may reveal a place excluded by the current category.
    if (p.city === cityMapCity && !matchesSpot(p)) {
      state.filter = '全部';
      applyFilters();
    }
    if (p.city !== cityMapCity) {
      // A marker in a neighbouring city changes the sidebar, never the camera.
      state.preserveNextOpen = true;
      openCityMap(p.city, p.index);
    } else selectCityMapSpot(p.index, true);
  }

  function scheduleLayout() {
    if (!state.map || !isVisible() || state.layoutFrame !== null) return;
    state.layoutFrame = requestAnimationFrame(() => {
      state.layoutFrame = null;
      layoutLabels();
    });
  }

  function attachLabel(id, marker, label, p = null) {
    const face = document.createElement('div');
    face.className = 'gmap-marker-face';
    face.append(...label.childNodes);
    const leader = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    leader.classList.add('gmap-marker-leader');
    leader.setAttribute('aria-hidden', 'true');
    leader.innerHTML = '<path class="gmap-leader-halo"/><path class="gmap-leader-line"/><circle r="2.5"/>';
    label.replaceChildren(leader, face);
    // Only the visible face receives clicks; the empty anchor and leader are transparent.
    marker.style.pointerEvents = 'none';
    const entry = {marker, label, face, leader, p, name: label.querySelector('.gmap-marker-name'),
      hovered: false, focused: false, placement: null};
    const expand = () => {
      label.classList.toggle('expanded', entry.hovered || entry.focused);
      scheduleLayout();
    };
    face.addEventListener('pointerenter', () => { entry.hovered = true; expand(); });
    face.addEventListener('pointerleave', () => { entry.hovered = false; expand(); });
    marker.addEventListener('focusin', () => { entry.focused = true; expand(); });
    marker.addEventListener('focusout', () => { entry.focused = false; expand(); });
    state.labels.set(id, entry);
    return entry;
  }

  function moveLabel(entry, placement) {
    const {dx, dy, side} = placement;
    entry.placement = placement;
    entry.face.style.transform = `translate(${dx}px,${dy}px)`;
    entry.label.classList.toggle('name-left', side === 'left');
    const distance = Math.hypot(dx, dy);
    entry.label.classList.toggle('displaced', distance > 1);
    // A diagonal leaves the true coordinate, then a horizontal tail meets the label.
    const path = window.TravelMarkerLayout.leader(placement);
    entry.leader.querySelectorAll('path').forEach(line => line.setAttribute('d', path));
  }

  function layoutLabels() {
    const canvas = $('googleLiveCanvas');
    const width = canvas.clientWidth, height = canvas.clientHeight;
    const projection = state.projection?.getProjection();
    if (!isVisible() || !projection || width < 120 || height < 100 || !window.TravelMarkerLayout) return;
    const items = [];
    const entries = [...state.labels.values()];
    const pinned = entries.find(entry => entry.hovered) || entries.find(entry => entry.focused);
    for (const [id, entry] of state.labels) {
      if (entry.marker.map !== state.map) continue;
      const pixel = projection.fromLatLngToContainerPixel(entry.marker.position);
      if (!pixel || pixel.x < -24 || pixel.y < -24 || pixel.x > width + 24 || pixel.y > height + 24) {
        moveLabel(entry, {dx: 0, dy: 0, side: 'right'});
        continue;
      }
      const active = id === state.activeKey;
      const expanded = active || entry.hovered || entry.focused;
      if (entry.name) entry.name.style.maxWidth = Math.min(width <= 700 ? 150 : active ? 250 : 190, width - 64) + 'px';
      const nameWidth = expanded && entry.name ? entry.name.getBoundingClientRect().width : 0;
      const priority = entry.hovered || entry.focused ? 20000 : active ? 10000 : !entry.p ? 2000 : entry.p.city === cityMapCity ? 100 : 1;
      entry.marker.zIndex = priority;
      items.push({id, x: pixel.x, y: pixel.y, nameWidth, priority,
        fixed: entry === pinned && !!entry.placement, previous: entry.placement});
    }
    // Leave the map-type and zoom controls clear, along with the search results panel.
    const obstacles = [
      {left: 0, top: 0, right: Math.min(240, width), bottom: 48},
      {left: width - 58, top: height - 145, right: width, bottom: height}
    ];
    if (!$('googleLiveResults').hidden) {
      const origin = canvas.getBoundingClientRect(), box = $('googleLiveResults').getBoundingClientRect();
      obstacles.push({left: box.left - origin.left, top: box.top - origin.top,
        right: box.right - origin.left, bottom: box.bottom - origin.top});
    }
    for (const placement of window.TravelMarkerLayout(items, {width, height, obstacles})) {
      moveLabel(state.labels.get(placement.id), placement);
    }
  }

  function clearSearchMarkers() {
    state.searchMarkers.forEach((marker, id) => {
      marker.map = null;
      state.labels.delete('search:' + id);
    });
    state.searchMarkers.clear();
    scheduleLayout();
  }

  function createMap(maps) {
    const first = currentPoint(0) || points[0];
    state.map = new maps.Map($('googleLiveCanvas'), {
      mapId: config.mapId || 'DEMO_MAP_ID', center: {lat: first.lat, lng: first.lon},
      zoom: 12, maxZoom: 20, minZoom: 3, clickableIcons: true,
      gestureHandling: 'greedy', fullscreenControl: false,
      mapTypeControl: true, streetViewControl: false, zoomControl: true
    });
    for (const p of points) {
      const spot = cities[p.city].spots[p.index];
      const label = document.createElement('div');
      label.className = 'gmap-marker';
      label.style.setProperty('--marker-color', mapSpotColor(spot));
      const number = document.createElement('span');
      number.className = 'gmap-marker-number';
      number.textContent = String(p.index + 1).padStart(2, '0');
      const name = document.createElement('span');
      name.className = 'gmap-marker-name';
      name.textContent = cityMapNames[p.key] || spot.n;
      label.append(number, name);
      const marker = new maps.marker.AdvancedMarkerElement({
        map: state.map, position: {lat: p.lat, lng: p.lon},
        title: cities[p.city].name + ' · ' + spot.n,
        gmpClickable: true, anchorLeft: '-50%', anchorTop: '-50%',
        collisionBehavior: maps.CollisionBehavior.REQUIRED, zIndex: 1
      });
      marker.append(label);
      marker.addListener('click', () => chooseMarker(p));
      state.markers.set(p.key, attachLabel(p.key, marker, label, p));
    }
    const overlay = new maps.OverlayView();
    overlay.onAdd = () => {};
    overlay.draw = scheduleLayout;
    overlay.onRemove = () => {};
    state.projection = overlay;
    overlay.setMap(state.map);
    state.map.addListener('idle', scheduleLayout);
    state.resizeObserver = new ResizeObserver(scheduleLayout);
    state.resizeObserver.observe($('googleLiveCanvas'));
    state.resizeObserver.observe($('googleLiveResults'));
    // Leave basemap clicks alone so Google's own POI information windows keep working.
  }

  function select(index) {
    if (onlineMapMode !== 'interactive') return;
    const p = currentPoint(index);
    const previous = state.markers.get(state.activeKey);
    if (previous) { previous.label.classList.remove('active'); previous.marker.zIndex = 1; }
    state.activeKey = p?.key || null;
    const entry = state.markers.get(state.activeKey);
    if (entry) { entry.label.classList.add('active'); entry.marker.zIndex = 10000; }
    const spot = cities[cityMapCity]?.spots[index];
    $('googleLiveCurrent').textContent = spot ? cities[cityMapCity].name + ' · ' + spot.n : cities[cityMapCity].name;
    $('googleLiveLocate').disabled = !state.map || state.error || !p || !matchesSpot(p);
    $('cityMapFocus').hidden = !p || !matchesSpot(p);
    $('googleLiveExternal').href = googleSearch(p ? p.lat + ',' + p.lon : onlineCityQuery());
    scheduleLayout();
    // Highlighting alone leaves the camera unchanged; sidebar clicks also call focus().
  }

  function fit() {
    if (!state.map || state.error || !isVisible()) return;
    const cityPoints = points.filter(p => p.city === cityMapCity && matchesSpot(p));
    if (!cityPoints.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    cityPoints.forEach(p => bounds.extend({lat: p.lat, lng: p.lon}));
    state.map.fitBounds(bounds, {top: 55, right: 65, bottom: 45, left: 45});
  }

  function focus(index = cityMapSelected) {
    if (!state.map || state.error || !isVisible()) return;
    const p = currentPoint(index);
    if (p && matchesSpot(p)) state.map.panTo({lat: p.lat, lng: p.lon});
    // Both sidebar selection and explicit positioning preserve the user's zoom level.
  }

  function resetSearch(clearInput = true) {
    ++state.searchGeneration;
    clearTimeout(state.searchTimer);
    state.searchTimer = null;
    state.searchElement?.remove();
    state.searchElement = null;
    clearSearchMarkers();
    state.searchInfo?.close();
    $('googleLiveResults').hidden = true;
    $('googleLiveResults').setAttribute('aria-busy', 'false');
    $('googleLiveLocalResults').replaceChildren();
    $('googleLiveRemoteResults').replaceChildren();
    $('googleLiveSearchStatus').textContent = '';
    $('googleLiveSearchExternal').hidden = true;
    if (clearInput) $('googleMapTerm').value = '';
    $('googleLiveSearchClear').hidden = !$('googleMapTerm').value.trim();
  }

  const normalized = text => String(text || '').normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  function pointNames(p) {
    const spot = cities[p.city].spots[p.index];
    return [spot.n, spot.en, spot.q, cityMapNames[p.key]].filter(Boolean);
  }

  function localResults(query) {
    const term = normalized(query);
    if (!term) return [];
    return points.filter(p => pointNames(p).some(name =>
      normalized(name).includes(term) || normalized(cities[p.city].name + name).includes(term)))
      .sort((a, b) => Number(b.city === cityMapCity) - Number(a.city === cityMapCity)).slice(0, 8);
  }

  function showLocalResults(query) {
    const results = localResults(query);
    const list = $('googleLiveLocalResults');
    list.replaceChildren();
    for (const point of results) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = cities[point.city].name + ' · ' + cities[point.city].spots[point.index].n;
      button.onclick = () => { chooseMarker(point); focus(point.index); };
      list.append(button);
    }
    $('googleLiveResults').hidden = false;
    $('googleLiveSearchClear').hidden = false;
    scheduleLayout();
    return results;
  }

  function showSearchPlace(place) {
    const marker = state.searchMarkers.get(place.id);
    if (!marker || !place.location || !isVisible() || state.error) return;
    state.map.panTo(place.location);
    const details = document.createElement('gmp-place-details-compact');
    details.className = 'google-search-place-details';
    details.setAttribute('orientation', 'horizontal');
    details.setAttribute('truncation-preferred', '');
    const request = document.createElement('gmp-place-details-place-request');
    request.place = place;
    details.append(request, document.createElement('gmp-place-standard-content'));
    if (!state.searchInfo) state.searchInfo = new window.google.maps.InfoWindow({disableAutoPan: true, maxWidth: 320});
    state.searchInfo.setContent(details);
    state.searchInfo.open({map: state.map, anchor: marker, shouldFocus: false});
  }

  async function search(query) {
    query = String(query || '').trim();
    if (!state.map || state.error || !isVisible()) return;
    resetSearch(false);
    $('googleMapTerm').value = query;
    if (!query) { resetSearch(); return; }
    const matches = showLocalResults(query);
    const exact = matches.find(p => pointNames(p).some(name => normalized(name) === normalized(query)));
    if (exact) { chooseMarker(exact); focus(exact.index); return; }
    const generation = state.searchGeneration, city = cityMapCity;
    let failed = false;
    const current = () => !failed && generation === state.searchGeneration && city === cityMapCity && isVisible();
    const failSearch = () => {
      if (!current()) return;
      failed = true;
      clearTimeout(state.searchTimer);
      state.searchElement?.remove();
      state.searchElement = null;
      clearSearchMarkers();
      state.searchInfo?.close();
      $('googleLiveResults').setAttribute('aria-busy', 'false');
      $('googleLiveSearchStatus').textContent = 'Google 地点搜索暂时不可用。可选择已收录的地点，或稍后重试。';
      const link = $('googleLiveSearchExternal');
      link.href = googleSearch(query + ' ' + onlineCityQuery());
      link.hidden = false;
    };
    $('googleLiveSearchStatus').textContent = '正在搜索地图附近的地点…';
    $('googleLiveResults').setAttribute('aria-busy', 'true');
    state.searchTimer = setTimeout(failSearch, 15000);
    try {
      if (!state.placesLibrary) state.placesLibrary = window.google.maps.importLibrary('places').catch(error => {
        state.placesLibrary = null;
        throw error;
      });
      const {PlaceSearchElement, PlaceTextSearchRequestElement} = await state.placesLibrary;
      if (!current()) return;
      const element = new PlaceSearchElement({selectable: true, truncationPreferred: true});
      const request = new PlaceTextSearchRequestElement({
        textQuery: query, locationBias: state.map.getCenter(), maxResultCount: 5
      });
      state.searchElement = element;
      element.append(document.createElement('gmp-place-standard-content'), request);
      element.addEventListener('gmp-error', failSearch);
      element.addEventListener('gmp-load', () => {
        if (!current()) return;
        clearTimeout(state.searchTimer);
        $('googleLiveResults').setAttribute('aria-busy', 'false');
        clearSearchMarkers();
        const results = element.places.filter(place => place.location);
        results.forEach((place, index) => {
          const label = document.createElement('div');
          label.className = 'gmap-marker gmap-marker-search';
          label.style.setProperty('--marker-color', '#2568b2');
          label.textContent = 'S' + (index + 1);
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map: state.map, position: place.location, title: '搜索结果 ' + (index + 1),
            gmpClickable: true, zIndex: 2000, collisionBehavior: window.google.maps.CollisionBehavior.REQUIRED,
            anchorLeft: '-50%', anchorTop: '-50%'
          });
          marker.append(label);
          marker.addListener('click', () => showSearchPlace(place));
          state.searchMarkers.set(place.id, marker);
          attachLabel('search:' + place.id, marker, label);
        });
        $('googleLiveSearchStatus').textContent = results.length
          ? '找到 ' + results.length + ' 处地点，点击结果或蓝色标记查看。'
          : '未找到匹配的地点，请换个名称或加上城市名。';
        // Search results use the same map and retain its current zoom level.
        if (results.length) state.map.panTo(results[0].location);
        scheduleLayout();
      });
      element.addEventListener('gmp-select', event => {
        if (current()) showSearchPlace(event.place);
      });
      $('googleLiveRemoteResults').append(element);
    } catch { failSearch(); }
  }

  function showPane() {
    $('cityMapDialog').classList.add('google-mode', 'interactive-map-mode');
    $('cityMapCanvas').hidden = true;
    document.querySelector('.city-map-foot').hidden = true;
    $('cityGooglePane').hidden = true;
    $('cityMyMapsPane').hidden = true;
    $('googleOptions').hidden = true;
    $('googleMapSearch').hidden = false;
    $('googleLivePane').hidden = false;
    $('googleLiveTools').hidden = false;
    $('cityMapFit').textContent = state.filter === '全部' ? '显示本城全部地点' : '显示筛选地点';
    $('cityMapFit').disabled = !state.map || state.error || !points.some(p => p.city === cityMapCity && matchesSpot(p));
    $('cityOnlineHint').textContent = '点编号标记查看右侧介绍；右侧选点自动定位，保持当前缩放；点其他地点查看 Google 信息。';
    $('googleLiveOpenExternal').href = googleSearch(onlineCityQuery());
  }

  async function activate({spot = -1, preserveView = false} = {}) {
    showPane();
    select(cityMapSelected);
    if (!isVisible()) return;
    const generation = ++state.generation;
    const city = cityMapCity;
    if (state.error) { fail(); return; }
    if (!state.map) message('正在加载谷歌地图…');
    try {
      const maps = await loadSdk();
      if (generation !== state.generation || !isVisible() || city !== cityMapCity || state.error) return;
      if (!state.map) createMap(maps);
      $('googleLiveMessage').hidden = true;
      $('googleLivePane').setAttribute('aria-busy', 'false');
      applyFilters();
      $('googleMapTerm').disabled = false;
      $('googleMapSearch').querySelector('[type="submit"]').disabled = false;
      if (city !== state.city && !preserveView) {
        const point = currentPoint(spot);
        if (point) {
          state.map.setCenter({lat: point.lat, lng: point.lon});
          state.map.setZoom(15);
        } else fit();
      } else if (spot >= 0 && !preserveView) focus(spot);
      state.city = city;
      select(cityMapSelected);
      return true;
    } catch {
      if (generation === state.generation && isVisible()) fail();
    }
  }

  function opened(id, spot, query = '') {
    if (id !== cityMapCity) return;
    resetSearch();
    prepareFilters(id, spot);
    const preserveView = state.preserveNextOpen;
    state.preserveNextOpen = false;
    void activate({spot, preserveView}).then(ready => {
      if (ready && query && id === cityMapCity && isVisible()) void search(query);
    });
  }

  function deactivate() {
    ++state.generation;
    resetSearch();
    $('googleLivePane').hidden = true;
    $('googleLiveTools').hidden = true;
    $('cityMapDialog').classList.remove('interactive-map-mode');
    $('cityMapFit').disabled = false;
  }

  function init() {
    $('cityMapFocus').insertAdjacentHTML('afterend', '<div id="cityMapUnlocated"></div>');
    const tabs = document.querySelector('.city-online-tabs');
    tabs.innerHTML = '<strong class="google-live-heading">谷歌互动地图</strong>';
    tabs.removeAttribute('role');
    tabs.removeAttribute('aria-label');
    $('cityMapList').insertAdjacentHTML('afterend', '<p class="city-map-filter-empty" id="cityMapFilterEmpty" role="status" hidden>此筛选下暂无地点，请选择其他类型。</p>');
    document.querySelector('.city-online-bar').insertAdjacentHTML('beforeend', '<section class="city-map-filter-bar" aria-label="城市地图筛选"><div class="city-map-filter-heading"><strong>收录地点筛选</strong><span id="cityMapFilterCount" aria-live="polite"></span></div><div class="city-map-filters" id="cityMapFilters" role="group" aria-label="地点类型筛选"></div></section>');
    $('cityMapFilters').addEventListener('click', event => {
      const button = event.target.closest('[data-city-map-filter]');
      if (!button) return;
      state.filter = button.dataset.cityMapFilter;
      resetSearch();
      applyFilters();
    });
    document.querySelector('.city-online-bar').insertAdjacentHTML('beforeend', '<div class="google-live-tools" id="googleLiveTools" hidden><strong id="googleLiveCurrent"></strong><button type="button" id="googleLiveLocate" disabled>定位所选地点</button><a id="googleLiveExternal" target="_blank" rel="noopener noreferrer">在 Google 中打开 ↗</a></div>');
    $('cityGooglePane').insertAdjacentHTML('beforebegin', '<section class="google-live-pane" id="googleLivePane" aria-label="谷歌互动城市地图" hidden><div class="google-live-stage"><div id="googleLiveCanvas" role="region" aria-label="谷歌地图与收录地点" tabindex="0"></div><section class="google-live-results" id="googleLiveResults" aria-label="地点搜索结果" hidden><div class="google-search-results-head"><strong>搜索结果</strong><button type="button" id="googleLiveResultsClose" aria-label="关闭搜索结果">关闭 ×</button></div><p id="googleLiveSearchStatus" role="status"></p><div class="google-live-local-results" id="googleLiveLocalResults"></div><div id="googleLiveRemoteResults"></div><a id="googleLiveSearchExternal" target="_blank" rel="noopener noreferrer" hidden>在 Google 地图中搜索 ↗</a></section><div class="google-live-message" id="googleLiveMessage" role="status"><p id="googleLiveMessageText">正在加载谷歌地图…</p><div id="googleLiveRecovery" hidden><button type="button" id="googleLiveReload">重新加载页面</button><a id="googleLiveOpenExternal" target="_blank" rel="noopener noreferrer">在 Google 地图中打开 ↗</a></div></div></div><div class="google-live-legend" aria-label="地图标记图例"><span class="legend-classic">经典景点</span><span class="legend-culture">博物馆／文化收藏</span><span class="legend-restaurant">餐厅</span><span class="legend-hotel">酒店</span><span class="legend-warning">开放待复核</span><span class="legend-selected">当前选中</span><span class="legend-search">搜索结果</span><small>错开标记用细线连接，线端小圆点是实际位置。</small></div></section>');
    $('googleLiveLocate').onclick = () => focus();
    $('cityMapList').addEventListener('click', event => {
      const button = event.target.closest('button[data-map-spot]');
      if (button) { resetSearch(false); focus(Number(button.dataset.mapSpot)); }
    });
    const form = $('googleMapSearch');
    form.insertAdjacentHTML('beforeend', '<button type="button" id="googleLiveSearchClear" hidden>清除</button>');
    const input = $('googleMapTerm');
    input.placeholder = '搜索景点、餐厅、酒店或地址';
    input.setAttribute('aria-label', '在当前互动地图搜索地点');
    input.autocomplete = 'off';
    form.onsubmit = event => { event.preventDefault(); void search(input.value); };
    input.oninput = () => {
      resetSearch(false);
      const query = input.value.trim();
      if (!query) return;
      const matches = showLocalResults(query);
      $('googleLiveSearchStatus').textContent = matches.length
        ? '已收录的地点可直接定位；点击“查找”搜索更多地点。'
        : '点击“查找”，搜索当前地图附近的地点。';
    };
    $('googleLiveSearchClear').onclick = () => resetSearch();
    $('googleLiveResultsClose').onclick = () => resetSearch();
    $('googleLiveReload').onclick = () => window.location.reload();
    $('cityMapFit').onclick = () => { resetSearch(); fit(); };
    $('cityMapDialog').addEventListener('close', () => { ++state.generation; state.preserveNextOpen = false; resetSearch(); });
    // Focus the visible map when returning from the details on narrow screens.
    document.addEventListener('click', event => {
      if (event.target.closest('#cityMapBack') && isVisible()) $('googleLiveCanvas').focus({preventScroll: true});
    });
    onlineMapMode = 'interactive';
  }

  window.TravelGoogleMap = Object.freeze({activate, deactivate, opened, select, focus, fit, search});
  init();
})();
