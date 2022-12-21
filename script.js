const STORAGE_KEY = 'HIDE_YOUTUBE_TIME_LABEL';
const stylesheet = document.createElement('style');
stylesheet.id = STORAGE_KEY;
const rule = `ytd-thumbnail-overlay-time-status-renderer {display: none;}`;
stylesheet.innerHTML = rule;
let enabled = true;

chrome.storage.onChanged.addListener(async (changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key !== STORAGE_KEY) continue;
    setValue(newValue);
    toggleStylesheet(newValue);
    return;
  }
});

window.addEventListener('load', async () => {
  enabled = await getValue();
  toggleStylesheet(enabled);
});

async function getValue() {
  const result = await chrome.storage.local.get([STORAGE_KEY]);
  return result[STORAGE_KEY];
}

function setValue(val) {
  enabled = val;
}

function insertStyleSheet() {
  document.head.appendChild(stylesheet);
}

function removeStyleSheet() {
  document.querySelector(`#${STORAGE_KEY}`)?.remove();
}

function toggleStylesheet(newValue) {
  if (newValue) {
    insertStyleSheet();
  } else {
    removeStyleSheet();
  }
}