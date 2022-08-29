console.log("Chrome extension started");

//including css sh1t for the button and pop-up
var style = document.createElement("link");
style.rel = "stylesheet";
style.type = "text/css";
style.href = chrome.runtime.getURL("style.css");
(document.head||document.documentElement).appendChild(style);

let element, objToAdd, id, targetNode, config1, observer1, startTab, firstRefresh, lastURL;
let myArray = new Array(32);

startTab = false; //used only if the first url is https...../*name*/following

chrome.runtime.onMessage.addListener(tabUpdated);

function tabUpdated(msg, sender, response){ //when tab is updated
  if(id) clearInterval(id);
  console.log("I've received a message!");
  if(window.location.href.includes("following")){
    id = setInterval(getThings, 100);
  }
}

if(!startTab && window.location.href.includes("following")){ //when the following tab is first opened
  startTab = true;
  console.log("Start tab happened");
  id = setInterval(getThings, 100);
}

function getThings(){
  element = document.querySelector("a[data-testid='AppTabBar_Profile_Link']"); //element for the profile name
  targetNode = document.querySelector("div[aria-label='Timeline: Following']"); //targetNode to check for DOM changes

  if(element && element.getAttribute("href").substring(1) === window.location.href.split("/")[3]){
    if(targetNode){
      clearInterval(id);
      console.log("Element username = " + element.getAttribute("href").substring(1));
      console.log("Element targetNode = " + targetNode);
      observationStart();
    }
  } else{
    if(startTab){
      console.log("Some elements are still unknown");
    } else{
      clearInterval(id);
      console.log("Some elements are still unknown");
    }
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
    myArray[i] = children[i].firstChild.firstChild.firstChild.children ? children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.firstChild.firstChild.children[1].firstChild.firstChild.href.substring(20) : undefined;
    if(children[i].firstChild.firstChild.firstChild.children && children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children.length < 4){
      objToAdd = document.createElement("button");
      let elementToAppend = children[i].firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[1];
      elementToAppend.parentNode.insertBefore(objToAdd, elementToAppend.nextSibling);
      let distance = getDistanceBetweenElements(elementToAppend, objToAdd);
      objToAdd.innerHTML = "Unfollow";
      objToAdd.style.marginLeft = distance*2 + 130 + "px";
      objToAdd.classList.add("btn");
      objToAdd.setAttribute("name", myArray[i]);
      objToAdd.addEventListener("click", animateButton);
      objToAdd.addEventListener("click", function(){ clickAction(children) });
      console.log("Element added");
    }
  }
  console.log(...myArray);
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

function animateButton(e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");
  e.target.classList.add("animate");
  setTimeout(function(){
    e.target.classList.remove("animate");
  },500);
}

function clickAction(element){
  //element.firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[1].firstChild.click();
  console.log(element);

}
