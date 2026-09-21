/* Google owns the basemap and POI windows; our data owns attraction markers and the sidebar. */
(() => {
  'use strict';
  const config = window.TRAVEL_GOOGLE_MAPS;
  if (!config?.apiKey) return;
  const state = {
    sdk: null, map: null, markers: new Map(), city: null,
    generation: 0, error: false, preserveNextOpen: false, activeKey: null
  };
  const points = cityCoordinates.filter(p => cities[p.city]?.spots[p.index]
    && Number.isFinite(p.lat) && Number.isFinite(p.lon));
  const currentPoint = index => points.find(p => p.city === cityMapCity && p.index === index);
  const isVisible = () => onlineMapMode === 'interactive' && $('cityMapDialog').open;

  function message(text, failed = false) {
    $('googleLiveMessage').hidden = false;
    $('googleLiveMessageText').textContent = text;
    $('googleLiveRecovery').hidden = !failed;
    $('googleLivePane').setAttribute('aria-busy', String(!failed));
    $('googleLiveLocate').disabled = true;
    $('cityMapFit').disabled = onlineMapMode === 'interactive';
  }

  function fail() {
    state.error = true;
    if (isVisible()) message('互动地图暂时无法加载。可切换备用地图，或稍后重新加载。', true);
  }

  // One script request per page, only after the map is opened. No geocoding or Places requests.
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
    if (p.city !== cityMapCity) {
      // A marker in a neighbouring city changes the sidebar, never the camera.
      state.preserveNextOpen = true;
      openCityMap(p.city, p.index);
    } else selectCityMapSpot(p.index, true);
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
      state.markers.set(p.key, {marker, label, p});
    }
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
    $('googleLiveLocate').disabled = !state.map || state.error || !p;
    $('googleLiveExternal').href = googleSearch(p ? p.lat + ',' + p.lon : onlineCityQuery());
    // Deliberately no setCenter, panTo, fitBounds or setZoom in this selection path.
  }

  function fit() {
    if (!state.map || state.error || !isVisible()) return;
    const cityPoints = points.filter(p => p.city === cityMapCity);
    if (!cityPoints.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    cityPoints.forEach(p => bounds.extend({lat: p.lat, lng: p.lon}));
    state.map.fitBounds(bounds, {top: 55, right: 65, bottom: 45, left: 45});
  }

  function focus(index = cityMapSelected) {
    if (!state.map || state.error || !isVisible()) return;
    const p = currentPoint(index);
    if (p) state.map.panTo({lat: p.lat, lng: p.lon});
    // Explicit positioning also preserves the user's zoom level.
  }

  function showPane() {
    $('cityMapDialog').classList.add('google-mode', 'interactive-map-mode');
    $('cityMapCanvas').hidden = true;
    document.querySelector('.city-map-foot').hidden = true;
    $('cityGooglePane').hidden = true;
    $('cityMyMapsPane').hidden = true;
    $('googleOptions').hidden = true;
    $('googleMapSearch').hidden = true;
    $('googleLivePane').hidden = false;
    $('googleLiveTools').hidden = false;
    for (const id of ['localMapMode', 'googleMapMode', 'myMapsMode']) $(id).setAttribute('aria-pressed', 'false');
    $('googleLiveMode').setAttribute('aria-pressed', 'true');
    $('cityMapFit').textContent = '显示本城全部景点';
    $('cityMapFit').disabled = !state.map || state.error;
    $('cityOnlineHint').textContent = '点编号标记查看右侧介绍；点其他地点查看 Google 信息。切换景点保持地图视野，需要移动时点击“定位所选景点”。';
    $('googleMapAlternatives').open = false;
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
      $('cityMapFit').disabled = false;
      if (city !== state.city && !preserveView) {
        const point = currentPoint(spot);
        if (point) {
          state.map.setCenter({lat: point.lat, lng: point.lon});
          state.map.setZoom(15);
        } else fit();
      } else if (spot >= 0 && !preserveView) focus(spot);
      state.city = city;
      select(cityMapSelected);
    } catch {
      if (generation === state.generation && isVisible()) fail();
    }
  }

  function opened(id, spot) {
    if (id !== cityMapCity) return;
    const preserveView = state.preserveNextOpen;
    state.preserveNextOpen = false;
    void activate({spot, preserveView});
  }

  function deactivate() {
    ++state.generation;
    $('googleMapAlternatives').open = false;
    $('googleLivePane').hidden = true;
    $('googleLiveTools').hidden = true;
    $('googleLiveMode').setAttribute('aria-pressed', 'false');
    $('cityMapDialog').classList.remove('interactive-map-mode');
    $('cityMapFit').disabled = false;
  }

  function init() {
    const tabs = document.querySelector('.city-online-tabs');
    tabs.insertAdjacentHTML('afterbegin', '<button type="button" id="googleLiveMode" aria-pressed="false">谷歌互动地图</button>');
    tabs.insertAdjacentHTML('beforeend', '<details class="google-map-alternatives" id="googleMapAlternatives"><summary>更多地图</summary><div class="google-map-alternative-buttons"></div></details>');
    const alternatives = tabs.querySelector('.google-map-alternative-buttons');
    $('myMapsMode').textContent = '备用景点地图';
    $('googleMapMode').textContent = '地点搜索';
    alternatives.append($('myMapsMode'), $('googleMapMode'));
    document.querySelector('.city-online-bar').insertAdjacentHTML('beforeend', '<div class="google-live-tools" id="googleLiveTools" hidden><strong id="googleLiveCurrent"></strong><button type="button" id="googleLiveLocate" disabled>定位所选景点</button><a id="googleLiveExternal" target="_blank" rel="noopener noreferrer">在 Google 中打开 ↗</a></div>');
    $('cityGooglePane').insertAdjacentHTML('beforebegin', '<section class="google-live-pane" id="googleLivePane" aria-label="谷歌互动景点地图" hidden><div class="google-live-stage"><div id="googleLiveCanvas" role="region" aria-label="谷歌地图与推荐景点" tabindex="0"></div><div class="google-live-message" id="googleLiveMessage" role="status"><p id="googleLiveMessageText">正在加载谷歌地图…</p><div id="googleLiveRecovery" hidden><button type="button" id="googleLiveBackup">使用备用地图</button><button type="button" id="googleLiveReload">重新加载页面</button></div></div></div><p class="city-online-status">编号与介绍来自本站；道路和其他地点信息由 Google 提供。互动地图为测试版。</p></section>');
    $('googleLiveMode').onclick = () => setOnlineMode('interactive');
    $('googleLiveLocate').onclick = () => focus();
    $('googleLiveBackup').onclick = () => setOnlineMode(connectedMyMapsId ? 'mymaps' : 'google');
    $('googleLiveReload').onclick = () => window.location.reload();
    const legacyFit = $('cityMapFit').onclick;
    $('cityMapFit').onclick = event => onlineMapMode === 'interactive' ? fit() : legacyFit(event);
    $('cityMapDialog').addEventListener('close', () => { ++state.generation; state.preserveNextOpen = false; });
    // Focus the visible map when returning from the details on narrow screens.
    document.addEventListener('click', event => {
      if (event.target.closest('#cityMapBack') && isVisible()) $('googleLiveCanvas').focus({preventScroll: true});
    });
    onlineMapMode = 'interactive';
  }

  window.TravelGoogleMap = Object.freeze({activate, deactivate, opened, select, focus, fit});
  init();
})();
