const STORAGE_KEY = 'HIDE_YOUTUBE_TIME_LABEL';

function setBadge(text) {
  chrome.action.setBadgeText({
    text
  });
}


function setValue(value = true) {
  chrome.storage.local.set({ [STORAGE_KEY]: value }).then(() => {
    setBadge(value ? 'ON' : 'OFF');
  });
}

async function getValue() {
  const result = await chrome.storage.local.get([STORAGE_KEY]);
  return result[STORAGE_KEY];
}

async function toggle() {
  const value = await getValue();
  setValue(!value)
}


chrome.runtime.onInstalled.addListener(setValue);
chrome.action.onClicked.addListener(toggle);
