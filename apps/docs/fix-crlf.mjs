import fs from 'fs';
import path from 'path';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const normalized = content.replace(/\r\n/g, '\n');
      if (content !== normalized) {
        fs.writeFileSync(fullPath, normalized, 'utf8');
        console.log('Normalized', fullPath);
      }
    }
  }
}

walkDir('c:/Users/Admin/Desktop/WEB DEV/PERSONAL PROJECTS/konfig/apps/docs/content');
console.log('Done.');
