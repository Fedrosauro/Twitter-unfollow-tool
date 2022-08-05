(() => {

  /*const jQueryLib = document.createElement('script'); //inluding JQuery library
  jQueryLib.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';

  const mainDiv = document.getElementById('react-root');
  mainDiv.appendChild(jQueryLib);*/


  //start here
  let username;
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    var { tab } = obj;

    if(!username) {
      getNameAccount(); //get the username of the user
    }

    if(tab.url.split("/")[3] === username){
      generateButtons();
    }

  });

  const getNameAccount = () => {
    username = document.querySelector('a[data-testid=AppTabBar_Profile_Link]').getAttribute('href').substring(1);
    console.log(username); //testing thing
  }

  const generateButtons = () => {
    console.log("generation....");

    var unFollowButton = document.getElementsByClassName('css-1dbjc4n r-19u6a5r')[0];
    const userRow = document.getElementsByClassName('css-1dbjc4n r-1awozwy r-18u37iz r-1wtj0ep')[0];  // 0->4 primo utente e cosi via

    userRow.appendChild($('.css-1dbjc4n .r-19u6a5r').clone(true));
  }

  //cloneFunction(unFollowButton, true, true)

  const cloneFunction = (eNodeOrig, bDeep, bEvents) => {
    var aInputSubElements, eNodeCopy, aNodeCopySubElements, i, j
    ,allEvents = ['onabort','onbeforecopy','onbeforecut','onbeforepaste','onblur','onchange','onclick',
    'oncontextmenu','oncopy','ondblclick','ondrag','ondragend','ondragenter', 'ondragleave' ,
    'ondragover','ondragstart', 'ondrop','onerror','onfocus','oninput','oninvalid','onkeydown',
    'onkeypress', 'onkeyup','onload','onmousedown','onmousemove','onmouseout',
    'onmouseover','onmouseup', 'onmousewheel', 'onpaste','onreset', 'onresize','onscroll',
    'onsearch', 'onselect','onselectstart','onsubmit','onunload'];

    // clone
  	eNodeCopy = eNodeOrig.cloneNode(bDeep);

  	// events
  	if (bEvents) {
  		aInputSubElements = eNodeOrig.getElementsByTagName('*');
  		aNodeCopySubElements = eNodeCopy.getElementsByTagName('*');

  		// The node root
  		for (j = 0; j < allEvents.length; j++) {
  			if (eNodeOrig[allEvents[j]]) eNodeCopy[allEvents[j]] = eNodeOrig[allEvents[j]];
  		}
    }

    // Node descendants
  	for (i = 0; i < aInputSubElements.length; i++) {
  		for (j = 0; j < allEvents.length; j++) {
    		if (aInputSubElements[i][allEvents[j]]) aNodeCopySubElements[i][allEvents[j]] = aInputSubElements[i][allEvents[j]];
  			}
  		}

  	return eNodeCopy;
  }

})();
