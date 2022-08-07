(() => {
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

    const unFollowButton = document.getElementsByClassName('css-1dbjc4n r-19u6a5r')[0];
    const copy = unFollowButton.cloneNode(true); //fake copy of the button
    const userRow = document.getElementsByClassName('css-1dbjc4n r-1awozwy r-18u37iz r-1wtj0ep')[0];  // 0->4 primo utente e cosi via

    copy.firstChild.style.borderColor = 'magenta';
    copy.firstChild.firstChild.style.color = 'magenta';
    copy.firstChild.firstChild.firstChild.firstChild.innerHTML = 'can Unfollow';

    userRow.appendChild(copy);

  }

})();
