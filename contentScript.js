console.log("Chrome extension started");

let nameAccTab, element, objToAdd, id, targetNode, config1, observer1, startTab, firstRefresh, lastURL;
let myArray = new Array(32);

startTab = true;

chrome.runtime.onMessage.addListener(tabUpdated);

function tabUpdated(msg, sender, response){
  nameAccTab = msg.name; //get the name of the acc of the tab you"re in
  console.log("I've received a message!");
  id = setInterval(getThings, 100);
}

if(startTab && window.location.href.includes("following")){ //when the tab is first opened
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
  console.log("Observation started");

  buttonsGeneration();

  config1 = {
    childList: true //mutations I want to observe
  }

  observer1 = new MutationObserver(observerFunc1); // Create an observer instance linked to the callback function
  observer1.observe(targetNode.firstChild, config1); // Start observing the target node for configured mutations

  function observerFunc1(mutationList, observer){
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
  console.log(children);
  for(var i = 0; i < children.length; i++){
    myArray[i] = children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.firstChild.firstChild.children[1].firstChild.firstChild.href.substring(20);
    if(children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children.length < 4){
      objToAdd = document.createElement("p");
      let elementToAppend = children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[1];
      elementToAppend.parentNode.insertBefore(objToAdd, elementToAppend.nextSibling);
      objToAdd.innerHTML = "Unfollow";
      objToAdd.style.border = "1px solid";
      objToAdd.style.borderRadius = "9999px";
      objToAdd.style.padding = "7px";
      objToAdd.style.paddingRight = "16px";
      objToAdd.style.paddingLeft = "16px";
      objToAdd.style.fontWeight = "bold";
      objToAdd.style.fontFamily = "TwitterChirp";
      objToAdd.style.fontSize = "14px";
      objToAdd.style.setProperty("color", "white");
      objToAdd.style.borderColor = "rgb(83, 100, 113)";
      objToAdd.style.backgroundColor = "green";
      objToAdd.addEventListener("mouseover", mouseOver);
      objToAdd.addEventListener("mouseout", mouseOut);

      let distance = getDistanceBetweenElements(elementToAppend, objToAdd);

      objToAdd.style.marginLeft = distance*2 + 50 + "px";

      console.log("Element added");
    }
  }
  console.log(...myArray);
}

function mouseOver(){
  this.style.setProperty("color", "red");
  this.style.borderColor = "red";
  this.style.backgroundColor = "white";
}

function mouseOut(){
  this.style.setProperty("color", "white");
  this.style.borderColor = "rgb(83, 100, 113)";
  this.style.backgroundColor = "green";
}

function getPosRightX1LeftX2(element) {
  let {top, left, width, height} = element.getBoundingClientRect();
  return {
    x1: left + width,
    x2: left
  };
}

function getDistanceBetweenElements(a, b) {
  let aPosition = getPosRightX1LeftX2(a);
  let bPosition = getPosRightX1LeftX2(b);

  return aPosition.x1 - bPosition.x2;
}
