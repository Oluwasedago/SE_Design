const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const KANBAN_PATH = path.join(ROOT, '.vscode', 'vscode-kanban.json');

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function walk(dir, cb, ignore = new Set(['node_modules', '.git', 'dist', '.vscode'])) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return; // skip unreadable dirs
  }
  for (const e of entries) {
    if (ignore.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, cb, ignore);
    else cb(full);
  }
}

function readKanban() {
  const defaultBoard = {
    columns: [
      { id: 'todo', title: 'To Do', cards: [] },
      { id: 'in-progress', title: 'In Progress', cards: [] },
      { id: 'done', title: 'Done', cards: [] },
    ],
  };
  try {
    const raw = fs.readFileSync(KANBAN_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.columns)) return defaultBoard;
    return parsed;
  } catch {
    return defaultBoard;
  }
}

function saveKanban(obj) {
  const dir = path.dirname(KANBAN_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(KANBAN_PATH, JSON.stringify(obj, null, 2), 'utf8');
  console.log('Updated', KANBAN_PATH);
}

function extractTodosFromFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const items = [];
  const re = /(TODO|FIXME)\s*[:\-]?\s*(.*)/i;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (m) {
      const note = m[2].trim() || m[1];
      items.push({
        file: path.relative(ROOT, file),
        line: i + 1,
        note,
      });
    }
  }
  return items;
}

function generateKanban() {
  const found = [];
  walk(ROOT, (file) => {
    const ext = path.extname(file).toLowerCase();
    if (!['.ts', '.tsx', '.js', '.jsx', '.md', '.json', '.css', '.scss'].includes(ext)) return;
    if (file.includes('.vscode')) return;
    try {
      const todos = extractTodosFromFile(file);
      found.push(...todos);
    } catch (err) {
      /* ignore parse errors */
    }
  });

  const board = readKanban();
  // ensure columns array exists
  if (!Array.isArray(board.columns)) {
    board.columns = [
      { id: 'todo', title: 'To Do', cards: [] },
      { id: 'in-progress', title: 'In Progress', cards: [] },
      { id: 'done', title: 'Done', cards: [] },
    ];
  }

  const todoCol = board.columns.find(c => c.id === 'todo') || board.columns[0];
  const existingDescriptions = new Set((todoCol.cards || []).map(c => c.description));

  const newCards = [];
  for (const f of found) {
    const title = f.note.length > 60 ? f.note.slice(0, 57) + '...' : f.note;
    const description = `${f.note}\n\nFile: ${f.file}:${f.line}`;
    if (existingDescriptions.has(description)) continue;
    newCards.push({
      id: genId(),
      title,
      description,
      createdAt: new Date().toISOString(),
      tags: ['todo'],
    });
  }

  if (newCards.length === 0) {
    // if kanban file missing, write default board so users get the file even with no matches
    if (!fs.existsSync(KANBAN_PATH)) {
      saveKanban(board);
      console.log('Created', KANBAN_PATH);
    }
    console.log('No new TODO/FIXME items found.');
    return;
  }

  // Prepend new cards to To Do
  todoCol.cards = newCards.concat(todoCol.cards);
  saveKanban(board);
  console.log(`Added ${newCards.length} card(s) to "${todoCol.title}".`);
}

if (require.main === module) {
  generateKanban();
}

module.exports = { generateKanban };