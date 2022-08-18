console.log("Chrome extension started");

let nameAccTab, element, objToAdd, id, targetNode, config, observer, startTab, firstRefresh;
let myArray = new Array(32);

startTab = true;

chrome.runtime.onMessage.addListener(tabUpdated);

function tabUpdated(msg, sender, response){
  nameAccTab = msg.name; //get the name of the acc of the tab you"re in
  console.log("I've received a message!");
  firstRefresh = true; //needed when refreshing the page but no children has been added
  id = setInterval(getThings, 100);
}

if(startTab){
  id = setInterval(getThings, 100);
  console.log("Start tab happened");
  startTab = false;
}

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
    childList: true //mutations I want to observe
  }

  observer = new MutationObserver(observerFunc); // Create an observer instance linked to the callback function
  observer.observe(targetNode.firstChild, config); // Start observing the target node for configured mutations
  console.log("Observation started");

  function observerFunc(mutationList, observer){
    buttonsGeneration();

    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        buttonsGeneration();
      }
    }
  }
}

function buttonsGeneration(){
  for(var i = 0; i < myArray.length; i++){
    myArray[i] = undefined;
  }
  var children = targetNode.firstChild.children;
  for(var i = 0; i < children.length; i++){
    myArray[i] = children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.firstChild.firstChild.children[1].firstChild.firstChild.href.substring(20);
    if(children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children.length < 4){
      objToAdd = document.createElement("p");
      objToAdd.innerHTML = "Unfollow: " + myArray[i];
      objToAdd.style.color = "white";
      objToAdd.style.border = "1px solid";
      objToAdd.style.borderColor = "rgb(83, 100, 113)";
      objToAdd.style.borderRadius = "9999px";
      objToAdd.style.padding = "7px";
      objToAdd.style.paddingRight = "16px";
      objToAdd.style.paddingLeft = "16px";
      objToAdd.style.fontWeight = "bold";
      objToAdd.style.fontFamily = "TwitterChirp";
      objToAdd.style.fontSize = "14px";
      let elementToAppend = children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[1];
      elementToAppend.parentNode.insertBefore(objToAdd, elementToAppend.nextSibling);
      console.log("Element added");
    }
  }
  console.log(...myArray);
}
