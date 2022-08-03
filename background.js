chrome.tabs.onUpdated.addListener((tabId, tab) => {
  //get the name of the account
  if(tab.url && tab.url.includes("twitter.com") && tab.url.includes("following")){
    chrome.tabs.sendMessage(tabId, { tab: tab});
  }
})
