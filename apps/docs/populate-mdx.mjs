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
      if (content.trim() === '') {
        const title = file.replace('.mdx', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const newContent = `---\ntitle: ${title}\ndescription: Documentation for ${title}\n---\n\n# ${title}\n\nContent coming soon...\n`;
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Populated', fullPath);
      }
    }
  }
}

walkDir('c:/Users/Admin/Desktop/WEB DEV/PERSONAL PROJECTS/konfig/apps/docs/content');
console.log('Done.');
