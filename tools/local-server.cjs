'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = fs.realpathSync(path.resolve(__dirname, '..'));
const identity = crypto.createHash('sha256').update(root.toLowerCase()).digest('hex');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.geojson': 'application/geo+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.kml': 'application/vnd.google-earth.kml+xml', '.csv': 'text/csv; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  const send = (status, body) => { res.writeHead(status, {'Content-Type': 'text/plain; charset=utf-8'}); res.end(body); };
  if (!['GET', 'HEAD'].includes(req.method)) return send(405, 'Method not allowed');
  if (!['127.0.0.1:8765', 'localhost:8765'].includes(req.headers.host)) return send(403, 'Forbidden host');
  let requested;
  try { requested = decodeURIComponent(new URL(req.url, 'http://127.0.0.1:8765').pathname); }
  catch { return send(400, 'Invalid URL'); }
  res.setHeader('Cache-Control', 'no-cache');
  if (requested === '/__spain_preview_health') return send(200, 'spain-travel:' + identity);
  const parts = requested.split(/[\\/]/);
  if (parts.some(part => part.startsWith('.') || part.includes(':') || part.includes('\0'))) return send(403, 'Forbidden path');
  let file = path.resolve(root, '.' + requested);
  if (file !== root && !file.startsWith(root + path.sep)) return send(403, 'Forbidden path');
  try {
    if ((await fs.promises.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    file = await fs.promises.realpath(file);
    if (!file.startsWith(root + path.sep)) return send(403, 'Forbidden path');
    const stat = await fs.promises.stat(file);
    if (!stat.isFile()) return send(404, 'Not found');
    res.writeHead(200, {'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': stat.size, 'X-Content-Type-Options': 'nosniff'});
    if (req.method === 'HEAD') return res.end();
    const stream = fs.createReadStream(file);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch { send(404, 'Not found'); }
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? 'Port 8765 is already in use.' : error.message); process.exitCode = 1; });
server.listen(8765, '127.0.0.1', () => console.log('http://127.0.0.1:8765/'));
