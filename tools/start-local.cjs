'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const root = fs.realpathSync(path.resolve(__dirname, '..'));
const identity = 'spain-travel:' + crypto.createHash('sha256').update(root.toLowerCase()).digest('hex');
const url = 'http://127.0.0.1:8765/';
async function health() {
  try { return await (await fetch(url + '__spain_preview_health', {signal: AbortSignal.timeout(1000)})).text(); }
  catch { return ''; }
}
async function main() {
  const running = await health();
  if (running && running !== identity) throw new Error('端口 8765 已被其他程序占用，请关闭之前的本地预览后重试。');
  if (running !== identity) {
    const child = spawn(process.execPath, [path.join(__dirname, 'local-server.cjs')], {cwd: root, detached: true, windowsHide: true, stdio: 'ignore'});
    let launchError;
    child.on('error', error => { launchError = error; });
    child.unref();
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      if (launchError) throw launchError;
      if (await health() === identity) { ready = true; break; }
      if (child.exitCode !== null) throw new Error('本地网页未能启动，端口 8765 可能已被占用。');
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!ready) throw new Error('本地预览没有响应，请稍后重试。');
  }
  console.log('本地网页已启动：' + url);
  if (!process.argv.includes('--no-browser')) {
    const browser = spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], {detached: true, windowsHide: true, stdio: 'ignore'});
    browser.on('error', () => console.error('请在浏览器打开：' + url));
    browser.unref();
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
