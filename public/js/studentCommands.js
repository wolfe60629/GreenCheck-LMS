async function getUserClassInformationAsync() { 
    //Send login information over to the api
    const sendData = {'command' : 'getUserClassInformation'}; 

    //Send to API
   let promise = new Promise((resolve, reject) => {

    fetch('/api' , {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {'Content-Type' : 'application/JSON'}
     })
     .then(response => response.json())
     .then(data => {
      setTimeout(() => resolve(data), 1000);
     })

    
  });
  let result = await promise
  return result;
  }





function addClassesToPage(classesToAdd) { 
  //Define
  tabsControl = document.getElementById('classTabs');
  tabsPanel = document.getElementById('classTabsPanel');

  //Add The Class Tabs
  classesToAdd.forEach(element => {
    var className = element.className;
    var classID = element.classID
    tabsControl.innerHTML +=  '<li class=\"u-tab-item u-tab-item-1\" role=\"presentation\"><a class=\"u-active-white u-border-6 u-border-active-palette-1-base u-border-grey-15 u-border-hover-grey-15 u-border-no-bottom u-border-no-left u-border-no-right u-button-style u-grey-10 u-hover-grey-10 u-tab-link u-tab-link-1\" id=\"tabControl-' + classID + '\" href=\"#tab-' + classID + '\" role=\"tab\" aria-controls=\"tab-e382\" aria-selected=\"true\">'+ className + '</a></li>';
    tabsPanel.innerHTML += "<div class=\"u-align-center u-container-style u-tab-active u-tab-pane u-white u-tab-pane-1\" id=\"tab-" + classID + "\" role=\"tabpanel\" aria-labelledby=\"tab-" + classID + "\"></div>";
});               
}

function getUserClassInformation (){ 
  getUserClassInformationAsync().then (data => { 
    console.log(data);

  //Add The Classes To The Page
  addClassesToPage(data.Classes);


  
  return data;
});
};


