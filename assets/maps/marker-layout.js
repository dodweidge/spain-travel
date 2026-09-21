/* Screen-space label placement. Geographic marker positions are never changed. */
(() => {
  'use strict';
  const intersects = (a, b, gap = 4) => a.left < b.right + gap && a.right + gap > b.left
    && a.top < b.bottom + gap && a.bottom + gap > b.top;

  window.TravelMarkerLayout = (items, {width, height, obstacles = []}) => {
    const bounds = {left: 8, top: 8, right: width - 8, bottom: height - 28};
    const placed = [], occupied = [...obstacles];
    // Stable ordering prevents labels swapping places while the map is dragged.
    const ordered = [...items].sort((a, b) => Number(b.fixed) - Number(a.fixed)
      || b.priority - a.priority || a.id.localeCompare(b.id));
    const offsets = [{x: 0, y: 0}];
    const limit = Math.ceil(Math.max(width, height) / 40);
    for (let ring = 1; ring <= limit; ring++) {
      const shell = [];
      for (let n = -ring; n <= ring; n++) {
        shell.push({x: n * 40, y: -ring * 40}, {x: n * 40, y: ring * 40});
        if (Math.abs(n) !== ring) shell.push({x: -ring * 40, y: n * 40}, {x: ring * 40, y: n * 40});
      }
      shell.sort((a, b) => a.x * a.x + a.y * a.y - b.x * b.x - b.y * b.y);
      offsets.push(...shell);
    }
    for (const item of ordered) {
      const sides = item.nameWidth ? ['right', 'left'] : ['right'];
      const size = side => ({
        left: side === 'left' && item.nameWidth ? 14 + item.nameWidth : 20,
        right: side === 'right' && item.nameWidth ? 14 + item.nameWidth : 20
      });
      let best = null, bestScore = Infinity;
      const candidates = item.fixed && item.previous
        ? [{x: item.previous.dx, y: item.previous.dy}]
        : offsets;
      for (const offset of candidates) {
        let fits = false;
        for (const side of sides) {
          const extent = size(side);
          // Keep the hovered circle under the pointer, even near the viewport edge.
          const x = item.fixed ? item.x + offset.x
            : Math.min(bounds.right - extent.right, Math.max(bounds.left + extent.left, item.x + offset.x));
          const y = item.fixed ? item.y + offset.y
            : Math.min(bounds.bottom - 20, Math.max(bounds.top + 20, item.y + offset.y));
          const rect = {left: x - extent.left, right: x + extent.right, top: y - 20, bottom: y + 20};
          let overlap = 0;
          for (const box of occupied) {
            if (intersects(rect, box)) overlap += Math.max(1,
              Math.min(rect.right + 4, box.right) - Math.max(rect.left - 4, box.left))
              * Math.max(1, Math.min(rect.bottom + 4, box.bottom) - Math.max(rect.top - 4, box.top));
          }
          // Leave small location dots visible when a neighbouring label has moved.
          for (const point of ordered) {
            if (point.id === item.id || Math.hypot(point.x - item.x, point.y - item.y) < 7) continue;
            if (intersects(rect, {left: point.x - 4, right: point.x + 4, top: point.y - 4, bottom: point.y + 4}, 1)) overlap += 64;
          }
          const overflow = Math.max(0, bounds.left - rect.left) + Math.max(0, rect.right - bounds.right)
            + Math.max(0, bounds.top - rect.top) + Math.max(0, rect.bottom - bounds.bottom);
          const dx = x - item.x, dy = y - item.y;
          const score = (overlap + overflow) * 1e9 + dx * dx + dy * dy + (side === 'left' ? 1 : 0);
          if (score < bestScore) { bestScore = score; best = {id: item.id, dx, dy, side, rect}; }
          if (!overlap && !overflow) fits = true;
        }
        // All earlier candidates are closer rings. Stop once the label fits freely.
        if (fits) break;
      }
      occupied.push(best.rect);
      placed.push(best);
    }
    return placed;
  };
})();
