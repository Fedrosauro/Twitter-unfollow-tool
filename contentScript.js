console.log("Chrome extension started");

let nameAccTab, username, element, id;

id = setInterval(getName, 100);

function getName(){
  element = document.querySelector("a[data-testid=AppTabBar_Profile_Link]");
  console.log(element.getAttribute("href").substring(1));
  if(element){clearInterval(id);}
}

//const myTimeOut = setTimeout(getName, 100);

/*function getName(){
  element = document.querySelector("a[data-testid=AppTabBar_Profile_Link]");
  console.log(element.getAttribute("href").substring(1));
}*/

chrome.runtime.onMessage.addListener(messageReceiver);

function messageReceiver(msg, sender, response){
  nameAccTab = msg.name; //get the name of the acc of the tab you"re in
  console.log("I've received a message!")
  console.log(element.getAttribute("href").substring(1));
}

/*setNameAccount(); //get the username of the user

/*if(nameAccTab === username){
generateButtons();
}

function setNameAccount(){
  username = document.querySelector("a[data-testid=AppTabBar_Profile_Link]").getAttribute("href").substring(1);
  console.log("The username is : " + username); //testing thing
}

const generateButtons = () => {
  console.log("generation....");

  for(let i = 0; i < 2; i++){
    let userRow = document.getElementsByClassName("css-1dbjc4n r-1adg3ll r-1ny4l3l")[i];

    let element = document.createElement("p");
    element.innerHTML = "This is a paragraph";
    element.style.color = "white";

    userRow.appendChild(element);
  }
}*/



/*

const unFollowButton = document.getElementsByClassName("css-1dbjc4n r-19u6a5r")[i]; //0->17
const copy = unFollowButton.cloneNode(true); //fake copy of the button
copy.firstChild.style.backgroundColor = null;
copy.firstChild.style.borderColor = "#EA526F";
copy.firstChild.firstChild.style.color = "#EA526F";
copy.firstChild.firstChild.firstChild.firstChild.innerHTML = "Unfollow";

copy.addEventListener("mouseover", function (){
copy.firstChild.style.backgroundColor = "#F9F9F9";
copy.firstChild.style.borderColor = "#F9F9F9";
copy.firstChild.firstChild.style.color = "#484A47";
});
copy.addEventListener("mouseout", function (){
copy.firstChild.style.backgroundColor = null;
copy.firstChild.style.borderColor = "#EA526F";
copy.firstChild.firstChild.style.color = "#EA526F";
});
*/
