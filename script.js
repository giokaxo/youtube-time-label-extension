const STORAGE_KEY = 'HIDE_YOUTUBE_TIME_LABELs';
const stylesheet = document.createElement('style');
stylesheet.id = STORAGE_KEY;
const rule = `ytd-thumbnail-overlay-time-status-renderer {display: none;}`;
stylesheet.innerHTML = rule;
let enabled = true;

window.addEventListener('load', onload);

async function onload() {
  const value = await getValue();
  await setValue(value);
  toggleStylesheet(value);
}

chrome.storage.onChanged.addListener(async (changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key !== STORAGE_KEY) continue;
    setValue(newValue);
    toggleStylesheet(newValue);
    return;
  }
});


async function getValue(defaultValue = true) {
  const result = await chrome.storage.local.get([STORAGE_KEY]);
  return result[STORAGE_KEY] || defaultValue;
}

async function setValue(value) {
  enabled = value;
  return chrome.storage.local.set({ [STORAGE_KEY]: value })
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
