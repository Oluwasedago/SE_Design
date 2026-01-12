// bundle-split.cjs
const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.ts', '.tsx', '.json', '.md'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'coverage', '.vite', '-p'];
const IGNORE_FILES = ['package-lock.json'];

function shouldInclude(filePath) {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath);
  if (IGNORE_FILES.includes(fileName)) return false;
  if (!EXTENSIONS.includes(ext)) return false;
  for (const dir of IGNORE_DIRS) {
    if (filePath.includes(path.sep + dir + path.sep) || filePath.includes(dir + path.sep)) return false;
  }
  return true;
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) walkDir(filePath, fileList);
    } else if (shouldInclude(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function getLanguage(filePath) {
  const ext = path.extname(filePath);
  const map = { '.ts': 'typescript', '.tsx': 'tsx', '.json': 'json', '.md': 'markdown' };
  return map[ext] || 'text';
}

function getCategory(filePath) {
  if (filePath.includes('src\\library\\')) return 'LIBRARY';
  if (filePath.includes('src\\core\\')) return 'CORE';
  if (filePath.includes('src\\renderer\\')) return 'RENDERER';
  if (filePath.includes('src\\')) return 'SRC_OTHER';
  if (filePath.includes('Docs\\')) return 'DOCS';
  return 'ROOT';
}

function bundle() {
  console.log('Scanning project...');
  const files = walkDir('.').sort();
  
  const categories = {};
  for (const f of files) {
    const cat = getCategory(f);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(f);
  }
  
  console.log('\n=== FILE DISTRIBUTION ===\n');
  for (const [cat, catFiles] of Object.entries(categories)) {
    let size = 0;
    for (const f of catFiles) {
      size += fs.statSync(f).size;
    }
    console.log(`${cat}: ${catFiles.length} files, ${(size / 1024).toFixed(2)} KB`);
    
    // Create bundle for each category
    let output = `# BUNDLE: ${cat}\n`;
    output += `# Generated: ${new Date().toISOString()}\n`;
    output += `# Files: ${catFiles.length}\n\n---\n\n`;
    
    for (const filePath of catFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lang = getLanguage(filePath);
      const relativePath = filePath.replace(/\\/g, '/');
      output += `## FILE: ${relativePath}\n\n\`\`\`${lang}\n${content}${content.endsWith('\n') ? '' : '\n'}\`\`\`\n\n---\n\n`;
    }
    
    const outFile = `BUNDLE_${cat}.md`;
    fs.writeFileSync(outFile, output);
    console.log(`  -> Created: ${outFile}`);
  }
}

bundle();