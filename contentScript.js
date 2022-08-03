(() => {
  let username;
  const userRow;
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

    const unFollowButton = document.getElementByClassName('css-1dbjc4n r-19u6a5r')[0];
    userRow = document.getElementByClassName('css-1dbjc4n r-1wbh5a2 r-dnmrzs r-1ny4l3l')[0];  // 0->4 primo utente e cosi via
  }

})();
