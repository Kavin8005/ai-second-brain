const statusEl = document.getElementById('status');
const countEl = document.getElementById('count');
const enabledEl = document.getElementById('enabled');

async function loadSettings() {
  const data = await chrome.storage.local.get(['enabled', 'captured']);
  enabledEl.checked = data.enabled !== false;
  countEl.textContent = data.captured || 0;
}

async function checkServer() {
  try {
    const res = await fetch('http://localhost:3001/api/health', { signal: AbortSignal.timeout(2000) });
    const data = await res.json();
    statusEl.textContent = '🟢 Server online';
    statusEl.className = 'status online';
  } catch {
    statusEl.textContent = '🔴 Server offline — run npm start';
    statusEl.className = 'status offline';
  }
}

enabledEl.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: enabledEl.checked });
});

loadSettings();
checkServer();
