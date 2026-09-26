import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.hdr': 'application/octet-stream', '.glb': 'model/gltf-binary', '.pdf': 'application/pdf' };
createServer(async (req, res) => {
  try {
    const file = resolve(root, `.${decodeURIComponent(new URL(req.url, 'http://localhost').pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const target = (await stat(file)).isDirectory() ? resolve(file, 'index.html') : file;
    res.writeHead(200, { 'Content-Type': mime[extname(target).toLowerCase()] ?? 'application/octet-stream' });
    res.end(await readFile(target));
  } catch { res.writeHead(404).end(); }
}).listen(8000, '127.0.0.1', () => console.log('http://127.0.0.1:8000'));
