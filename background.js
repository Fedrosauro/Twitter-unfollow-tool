console.log("Background script running");

chrome.tabs.onUpdated.addListener(twitterTab);

function twitterTab(tabId, tab){
  if(tab.url && tab.url.includes("twitter.com") && tab.url.includes("following")){ //checks if we're in a twitter tab and it contains "following"
    let msg = { //create the object we will send back to the tab
      name: tab.url.split("/")[3]
    }
    chrome.tabs.sendMessage(tabId, msg); //send msg to tab with the id "tabID"
  }
}
