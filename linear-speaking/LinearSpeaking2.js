// ===========================
// CSV-Driven Linear Speaking
// ===========================
// CSV format: Column A only. Consecutive non-empty rows form one slide.
// An empty row separates slides.

let slides = [];
let currentSlide = 0;

async function init() {
  try {
    const csvFile = 'LinearSpeaking2.csv';
    const response = await fetch(csvFile);
    if (!response.ok) throw new Error(`Could not load ${csvFile} (HTTP ${response.status})`);
    const text = await response.text();

    slides = parseCSV(text);
    if (slides.length === 0) throw new Error('No content found in Column A of the CSV');

    currentSlide = 0;
    render();
  } catch (e) {
    showError(e.message);
  }
}

function parseCSV(text) {
  const lines = text.split('\n');
  const result = [];
  let current = [];

  for (const line of lines) {
    const cell = getColumnA(line);
    if (cell) {
      current.push(cell);
    } else {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }
    }
  }
  if (current.length > 0) result.push(current);

  return result;
}

function getColumnA(line) {
  line = line.replace(/\r$/, '');
  if (!line) return '';

  if (line.startsWith('"')) {
    let i = 1;
    let value = '';
    while (i < line.length) {
      if (line[i] === '"' && line[i + 1] === '"') {
        value += '"';
        i += 2;
      } else if (line[i] === '"') {
        break;
      } else {
        value += line[i++];
      }
    }
    return value.trim();
  } else {
    const comma = line.indexOf(',');
    const value = comma >= 0 ? line.substring(0, comma) : line;
    return value.trim();
  }
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const mainNav = document.createElement('div');
  mainNav.className = 'nav-row main-nav';

  const slide = slides[currentSlide];
  slide.forEach(line => {
    const item = document.createElement('button');
    item.className = 'nav-btn';
    item.textContent = line;
    item.style.border = '1px solid #000';
    item.style.background = '#000';
    item.style.cursor = 'default';
    mainNav.appendChild(item);
  });

  footer.appendChild(mainNav);

  const bottomNav = document.createElement('div');
  bottomNav.className = 'nav-row bottom-nav';

  const fwdBtn = document.createElement('button');
  fwdBtn.className = 'nav-btn bottom-btn nav-arrow';
  fwdBtn.textContent = '>';
  if (currentSlide >= slides.length - 1) {
    fwdBtn.disabled = true;
    fwdBtn.style.opacity = '0.25';
  } else {
    fwdBtn.onclick = () => { currentSlide++; render(); };
  }

  const startBtn = document.createElement('button');
  startBtn.className = 'nav-btn bottom-btn start-btn';
  startBtn.textContent = 'Start';
  if (currentSlide === 0) {
    startBtn.style.opacity = '0.3';
  } else {
    startBtn.onclick = () => { currentSlide = 0; render(); };
  }

  const backBtn = document.createElement('button');
  backBtn.className = 'nav-btn bottom-btn nav-arrow';
  backBtn.textContent = '<';
  if (currentSlide === 0) {
    backBtn.disabled = true;
    backBtn.style.opacity = '0.25';
  } else {
    backBtn.onclick = () => { currentSlide--; render(); };
  }

  bottomNav.appendChild(fwdBtn);
  bottomNav.appendChild(startBtn);
  bottomNav.appendChild(backBtn);

  footer.appendChild(bottomNav);
  card.appendChild(footer);
  app.appendChild(card);
}

function showError(msg) {
  document.getElementById('app').innerHTML = `
    <div style="color:#ff6b6b;padding:40px;text-align:center;max-width:400px;">
      <h2 style="margin-bottom:20px;">Error</h2>
      <p style="line-height:1.6;">${msg}</p>
      <p style="margin-top:30px;font-size:0.9em;color:#999;">
        Check the browser console for details.
      </p>
    </div>
  `;
  console.error('LinearSpeaking error:', msg);
}

init();
