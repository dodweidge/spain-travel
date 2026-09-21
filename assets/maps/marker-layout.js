/* Screen-space label placement. Geographic marker positions are never changed. */
(() => {
  'use strict';
  const intersects = (a, b, gap = 4) => a.left < b.right + gap && a.right + gap > b.left
    && a.top < b.bottom + gap && a.bottom + gap > b.top;
  // Matches the 32px number/search circles in google-map.css; shadows and names do not count.
  const iconDiameter = 32;

  function fanPositions(items) {
    const remaining = new Set(items), targets = new Map();
    // Only actual circle overlap at the unshifted coordinates starts a callout group.
    while (remaining.size) {
      const group = [remaining.values().next().value];
      remaining.delete(group[0]);
      for (let i = 0; i < group.length; i++) {
        for (const other of remaining) {
          if (Math.hypot(group[i].x - other.x, group[i].y - other.y) < iconDiameter) {
            group.push(other);
            remaining.delete(other);
          }
        }
      }
      if (group.length < 2) continue;
      group.sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
      const split = Math.ceil(group.length / 2);
      const left = Math.min(...group.map(p => p.x)) - 96;
      const right = Math.max(...group.map(p => p.x)) + 96;
      for (const [side, column] of [['left', group.slice(0, split)], ['right', group.slice(split)]]) {
        column.sort((a, b) => a.y - b.y || a.id.localeCompare(b.id));
        const centerY = column.reduce((sum, p) => sum + p.y, 0) / column.length - 36;
        column.forEach((item, i) => targets.set(item.id, {side,
          x: side === 'left' ? left : right,
          y: centerY + (i - (column.length - 1) / 2) * 48}));
      }
    }
    return targets;
  }

  window.TravelMarkerLayout = (items, {width, height, obstacles = []}) => {
    const bounds = {left: 8, top: 8, right: width - 8, bottom: height - 28};
    const placed = [], occupied = [...obstacles];
    // Stable ordering prevents labels swapping places while the map is dragged.
    const ordered = [...items].sort((a, b) => Number(b.fixed) - Number(a.fixed)
      || b.priority - a.priority || a.id.localeCompare(b.id));
    const fans = fanPositions(items);
    // Everything outside an overlapping group stays exactly at its own coordinate,
    // including hovered labels, viewport edges and labels underneath map controls.
    // Reserve those positions first so callouts cannot push a stationary icon away.
    for (const item of ordered) {
      if (fans.has(item.id)) continue;
      const rect = {left: item.x - 20, right: item.x + Math.max(20, 14 + item.nameWidth),
        top: item.y - 20, bottom: item.y + 20};
      placed.push({id: item.id, dx: 0, dy: 0, side: 'right', rect, endX: 0});
      occupied.push(rect);
    }
    if (!fans.size) return placed;
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
      const fan = fans.get(item.id);
      if (!fan) continue;
      const preferredSide = fan.side;
      const sides = [preferredSide, preferredSide === 'left' ? 'right' : 'left'];
      const size = side => ({
        left: side === 'left' && item.nameWidth ? 14 + item.nameWidth : 20,
        right: side === 'right' && item.nameWidth ? 14 + item.nameWidth : 20
      });
      let best = null, bestScore = Infinity;
      const target = {x: fan.x - item.x, y: fan.y - item.y};
      // The first candidate is a left/right callout with a short diagonal and horizontal tail.
      // Further rows / columns are used only when the preferred callout cannot fit.
      const alternatives = offsets.map(offset => ({x: target.x + offset.x, y: target.y + offset.y}));
      const candidates = item.fixed && item.previous
        ? [{x: item.previous.dx, y: item.previous.dy}]
        : alternatives;
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
          const sidePenalty = side === preferredSide ? 0 : 20000;
          // At an edge, use the spacious side instead of turning the name across its own leader.
          const inward = side !== (dx < 0 ? 'left' : 'right');
          const shortTail = Math.max(0, 64 - Math.abs(dx));
          const score = (overlap + overflow) * 1e9 + (inward ? 1e7 : 0) + shortTail * 1e4
            + (dx - target.x) ** 2 + (dy - target.y) ** 2 + sidePenalty;
          if (score < bestScore) { bestScore = score; best = {id: item.id, dx, dy, side, rect,
            // Attach to the near edge of the entire label if its name extends inward.
            endX: (dx >= 0 ? rect.left + 3 : rect.right - 3) - item.x}; }
          if (!overlap && !overflow && !inward && !shortTail) fits = true;
        }
        // All earlier candidates are closer rings. Stop once the label fits freely.
        if (fits) break;
      }
      occupied.push(best.rect);
      placed.push(best);
    }
    return placed;
  };

  window.TravelMarkerLayout.leader = ({dx, dy, endX}) => {
    const end = endX ?? dx - Math.sign(dx) * 17;
    const knee = Math.sign(end) * Math.min(Math.abs(dy), Math.max(0, Math.abs(end) - 28));
    return `M0 0 L${knee} ${dy} L${end} ${dy}`;
  };
})();
