// Assembles src/pages/*.html with the shared partials into the site root.
// Each page starts with a comment: <!-- title: ... | description: ... -->
// Run: node build.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const src = 'src';
const partial = (name) => readFileSync(join(src, 'partials', name), 'utf8');
const head = partial('head.html');
const header = partial('header.html');
const footer = partial('footer.html');

for (const file of readdirSync(join(src, 'pages')).filter((f) => f.endsWith('.html'))) {
  const raw = readFileSync(join(src, 'pages', file), 'utf8');
  const meta = raw.match(/^<!--\s*title:\s*(.*?)\s*\|\s*description:\s*(.*?)\s*-->\s*/s);
  if (!meta) throw new Error(`${file}: missing title/description comment`);
  const body = raw.slice(meta[0].length);
  const html = head.replace(/{{title}}/g, meta[1]).replace(/{{description}}/g, meta[2])
    + header + '\n<main id="main">\n' + body.trim() + '\n</main>\n\n' + footer;
  writeFileSync(file, html);
  console.log('built', file);
}
