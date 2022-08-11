console.log("Chrome extension started");

let nameAccTab;
chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(msg, sender, response){
  nameAccTab = msg.name; //get the name of the acc of the tab you"re in
  console.log("I've received a message!")
}

let element, id, targetNode, config, observer;
let finished = false;

id = setInterval(getThings, 100);

function getThings(){
  element = document.querySelector("a[data-testid='AppTabBar_Profile_Link']"); //element for the profile name
  targetNode = document.querySelector("div[aria-label='Timeline: Following']"); //targetNode to check for DOM changes

  console.log((element && targetNode) ? "I got the elements" : "Some elements are still unknown" );
  if(element && targetNode){
    clearInterval(id);
    console.log("Element username = " + element.getAttribute("href").substring(1));
    console.log("Element targetNode = " + targetNode);
    observationStart();
  }
}

function observationStart(){
  config = {
    childList: true, //mutations I want to observe
    attributes: true,
    subtree: true
  }

  observer = new MutationObserver(observerFunc); // Create an observer instance linked to the callback function
  observer.observe(targetNode.firstChild, config); // Start observing the target node for configured mutations
  console.log("Observation started");

  function observerFunc(mutationList, observer){
    for (const mutation of mutationList) {
      if (mutation.type === "childList" || mutation.type === "attributes" || mutation.type === "subtree") {
        console.log("A Node has been added or removed or modified");
      }
    }
  }
}
