chrome.tabs.onUpdated.addListener((tabId, tab) => {
  //get the name of the account
  if(tab.url && tab.url.includes("twitter.com")){
    if(tab.url.split("/")[4] === "following")
      console.log(tab.url.split("/")[3]);

    //chrome.tabs.sendMessage(tabId, {
      //type: "NEW",
      //account_id: name
    //});
  }
})
