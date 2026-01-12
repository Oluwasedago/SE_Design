// bundle-for-ai.cjs
const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.ts', '.tsx', '.json', '.md'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'coverage', '.vite', '-p'];
const IGNORE_FILES = ['package-lock.json'];
const OUTPUT_FILE = 'PROJECT_BUNDLE.md';

function shouldInclude(filePath) {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath);
  
  if (IGNORE_FILES.includes(fileName)) return false;
  if (!EXTENSIONS.includes(ext)) return false;
  
  for (const dir of IGNORE_DIRS) {
    if (filePath.includes(path.sep + dir + path.sep) || filePath.includes(dir + path.sep)) {
      return false;
    }
  }
  return true;
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        walkDir(filePath, fileList);
      }
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

function bundle() {
  console.log('Scanning project...');
  
  const files = walkDir('.').sort();
  let output = `# PROJECT BUNDLE\n`;
  output += `# Generated: ${new Date().toISOString()}\n`;
  output += `# Total Files: ${files.length}\n\n---\n\n`;
  
  output += `## FILE INDEX\n\n`;
  files.forEach((f, i) => { output += `${i + 1}. ${f}\n`; });
  output += `\n---\n\n`;
  
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lang = getLanguage(filePath);
    const relativePath = filePath.replace(/\\/g, '/');
    
    output += `## FILE: ${relativePath}\n\n`;
    output += `\`\`\`${lang}\n${content}${content.endsWith('\n') ? '' : '\n'}\`\`\`\n\n---\n\n`;
  }
  
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Bundle created: ${OUTPUT_FILE}`);
  console.log(`Total files: ${files.length}`);
  console.log(`Bundle size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB`);
}

bundle();