(() => {
   let currentNameAcc = "";

   chrome.runtime.onMessage.addListener((obj, sender, response) => {
     const { type, name } = obj; //destructioring

     if(type === "NEW"){
       currentNameAcc = name;
       newPageLoaded();
     }
   })
})();
