// Tiny static server for local preview: node serve.mjs  ->  http://localhost:4173
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const port = process.env.PORT || 4173;
const root = process.cwd();

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(req.url.split('?')[0])).split(sep).filter((p) => p && p !== '..').join(sep);
  if (!path || req.url.endsWith('/')) path = join(path, 'index.html');
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(await readFile(join(root, '404.html')));
  }
}).listen(port, () => console.log(`Serving on http://localhost:${port}`));
