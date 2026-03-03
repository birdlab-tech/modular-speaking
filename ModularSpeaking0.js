// ===========================
// CSV-Driven Modular Speaking
// ===========================

// Global state
let rootNode = null;
let currentNode = null;

// Initialize the application
async function init() {
  try {
    // Load and parse CSV
    const csvData = await loadCSV('ModularSpeaking.csv');
    rootNode = parseCSV(csvData);

    // Start at root level (Column A items)
    currentNode = rootNode;
    renderCard();
  } catch (error) {
    showError(`Failed to load application: ${error.message}`);
  }
}

// Load CSV file
async function loadCSV(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    throw new Error(`Could not load ${filename}: ${error.message}`);
  }
}

// Parse CSV into hierarchy tree
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const root = {
    text: 'ROOT',
    level: -1,
    row: -1,
    parent: null,
    children: [],
    isRoot: true
  };

  // Track the most recent node at each level
  const levelStack = [root]; // levelStack[0] = root, levelStack[1] = Column A parent, etc.

  lines.forEach((line, rowIndex) => {
    if (!line.trim()) return; // Skip empty lines

    // Parse CSV line (simple parsing - handles basic CSV)
    const cells = parseCSVLine(line);

    // Process each column (A, B, C, D = indices 0, 1, 2, 3)
    cells.forEach((cellText, columnIndex) => {
      if (!cellText || !cellText.trim()) return; // Skip empty cells

      const text = cellText.trim();
      const level = columnIndex;

      // Find parent: previous level in stack
      const parent = levelStack[level] || root;

      // Create new node
      const node = {
        text: text,
        level: level,
        row: rowIndex + 1, // 1-indexed for user-friendly error messages
        parent: parent,
        children: [],
        isRoot: false
      };

      // Add to parent's children
      parent.children.push(node);

      // Update level stack for this level
      levelStack[level + 1] = node;

      // Clear deeper levels (we've moved to a new branch)
      for (let i = level + 2; i < levelStack.length; i++) {
        levelStack[i] = null;
      }
    });
  });

  // Validate: root must have children (Column A items)
  if (root.children.length === 0) {
    throw new Error('CSV file has no content in Column A (top-level items)');
  }

  return root;
}

// Simple CSV line parser (handles basic cases)
function parseCSVLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current); // Add last cell

  return cells;
}

// Render current card
function renderCard() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const cardEl = document.createElement('div');
  cardEl.className = 'card';

  const footerEl = document.createElement('div');
  footerEl.className = 'card-footer';

  // Main navigation: show children of current node
  const navRowMain = document.createElement('div');
  navRowMain.className = 'nav-row main-nav';

  const nodesToShow = currentNode.children;

  if (nodesToShow.length === 0) {
    // Leaf node - no children
    const message = document.createElement('div');
    message.style.color = '#888';
    message.style.textAlign = 'center';
    message.style.padding = '20px';
    message.textContent = 'No items to display';
    navRowMain.appendChild(message);
  } else {
    // Show all children as buttons
    nodesToShow.forEach((node) => {
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.textContent = node.text;

      // Style differently if it's a leaf node (no children)
      if (node.children.length === 0) {
        // Leaf node - make it blend into background (not clickable looking)
        btn.style.border = '1px solid #000';
        btn.style.background = '#000';
        btn.style.cursor = 'default';
        btn.onclick = null; // No click action
      } else {
        // Has children - clickable
        btn.onclick = () => {
          currentNode = node;
          renderCard();
        };
      }

      navRowMain.appendChild(btn);
    });
  }

  footerEl.appendChild(navRowMain);

  // Bottom navigation (Top/Up buttons)
  const navRowBottom = document.createElement('div');
  navRowBottom.className = 'nav-row bottom-nav';

  // Show Top button if not at root (left side)
  if (!currentNode.isRoot) {
    const topBtn = document.createElement('button');
    topBtn.className = 'nav-btn bottom-btn';
    topBtn.textContent = 'Top';
    topBtn.onclick = () => {
      currentNode = rootNode;
      renderCard();
    };
    navRowBottom.appendChild(topBtn);
  }

  // Show Up button if not at root (right side)
  if (!currentNode.isRoot) {
    const upBtn = document.createElement('button');
    upBtn.className = 'nav-btn bottom-btn';
    upBtn.textContent = 'Up';
    upBtn.onclick = () => {
      if (currentNode.parent) {
        currentNode = currentNode.parent;
        renderCard();
      }
    };
    navRowBottom.appendChild(upBtn);
  }

  // Only add bottom nav if it has buttons
  if (navRowBottom.children.length > 0) {
    footerEl.appendChild(navRowBottom);
  }

  cardEl.appendChild(footerEl);
  app.appendChild(cardEl);
}

// Show error message
function showError(message) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div style="color: #ff6b6b; padding: 40px; text-align: center; max-width: 400px;">
      <h2 style="margin-bottom: 20px;">Error</h2>
      <p style="line-height: 1.6;">${message}</p>
      <p style="margin-top: 30px; font-size: 0.9em; color: #999;">
        Check the browser console for details.
      </p>
    </div>
  `;
  console.error('Error:', message);
}

// Show temporary message
function showMessage(message) {
  const app = document.getElementById('app');
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #222;
    color: #fff;
    padding: 20px 30px;
    border-radius: 8px;
    border: 1px solid #444;
    z-index: 1000;
  `;
  overlay.textContent = message;
  app.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 2000);
}

// Start the application
init();
