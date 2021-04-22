// --------------------TEACHER MODAL CODE ------------------------------------ //
function clearStorage() { 
  window.sessionStorage.clear();
}


// Add on click listeners to hide modals
window.onclick = function(event) {
  var addClassModal = document.getElementById("addClass-Modal");
  var addAssignmentModal = document.getElementById("addAssignment-Modal");
  var classSettingsModal = document.getElementById("classSettings-Modal");
  var allowedassignmentSubmissionsModal=document.getElementById("assignment-submissions-modal");
  var assignmentDateModal = document.getElementById("assignment-date-modal");
  var assignmentSettingsModal = document.getElementById('assignmentSettings-Modal');
  var assignmentSubmissionsModal = document.getElementById('assignmentSubmissions-Modal');

  switch (event.target) { 
    case (addClassModal): 
      var className = document.getElementById("class-name-modal");
      className.value = "";
      event.target.style.display = 'none';
      break;
    case (addAssignmentModal):
      var assignmentName = document.getElementById("assignment-name-modal");
      assignmentName.value = "";
      allowedassignmentSubmissionsModal.value = "";
      assignmentDateModal.value = "";
      event.target.style.display = 'none';
      break;
      case (classSettingsModal):
        event.target.style.display = 'none';
        break;
      case (assignmentSettingsModal): 
        event.target.style.display = 'none';
        break;
      case (assignmentSubmissionsModal): 
        event.target.style.display = 'none';
        break;

    default: 
    break;
  }
}





//Show the modals when function is ran
function showAddClassModal(isShown) { 
  var modal = document.getElementById("addClass-Modal");
  var className = document.getElementById("class-name-modal");

    if (isShown) { 
      modal.style.display = "block";
    }else { 
      modal.style.display = "none";
      className.value = "";
      
    }
  }
  

  function showAssignmentSubmissionsModal(isShown, assignmentID) { 
    var modal = document.getElementById("assignmentSubmissions-Modal");

    if (assignmentID) { 
      getAssignmentSubmissions(assignmentID);
    }
    
      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
       
      }
    }


  function showAssignmentSettingsModal(isShown, currAsignmentName, currDueDate, currMaxSubmission, assignmentID) { 
    var modal = document.getElementById("assignmentSettings-Modal");
    var settingsAssignmentName = document.getElementById('assignmentSettings-name-modal');
    var settingsDueDate = document.getElementById('assignmentSettings-date-modal');
    var settingsMaxSubmissions = document.getElementById('assignmentSettings-submissions-modal');
    var setassignmentID = document.getElementById('assignmentSettings-id-modal'); 

    if (currAsignmentName) { 
      settingsAssignmentName.value = currAsignmentName;
    }

    if (assignmentID) { 
      setassignmentID.value = assignmentID;
    }
    

    if (currDueDate) { 
      currDueDate += ' UTC'
      currDueDate = new Date(currDueDate);
      formattedDate = currDueDate.toISOString().replace('Z','')
      settingsDueDate.value = formattedDate
    }

    if (currMaxSubmission) { 
      settingsMaxSubmissions.value = currMaxSubmission;
    }

      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
       
      }
    }

  function showClassSettingsModal(isShown, classID, classCode, className) { 
    var modal = document.getElementById("classSettings-Modal");
    var classCodeSpan = document.getElementById("classCodeSpan-Modal");
    var classNameInput = document.getElementById("edit-class-name-modal");
    var classIDInput = document.getElementById('classSettings-classID-modal');

    if (classCode) { 
      classCodeSpan.innerText = classCode;
    }
    if (classID){ 
      classIDInput.value = classID;
      getClassAttendees(classID);
    }  
    if (className) { 
      classNameInput.value = className;
    } 

      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
        className.value = "";
        
      }
    }


  function showAddAssignmentModal(isShown, classID) { 
    var modal = document.getElementById("addAssignment-Modal");
    var className = document.getElementById("assignment-name-modal");
    var cID = document.getElementById('assignment-id-modal');
    var assignmentSubmissionsModal=document.getElementById("assignment-submissions-modal");
    var assignmentDateModal = document.getElementById("assignment-date-modal");

    cID.value = classID;

      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
        className.value = "";
        assignmentSubmissionsModal.value = "";
        assignmentDateModal.value = "";  
      }
    }




// --------------------- Add a New Class ---------------------------------
async function createNewClassAsync(className) { 
  const sendData = {'command' : 'createClass', 'className' : className}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function createNewClass (){ 
  className = document.getElementById('class-name-modal').value;

if (!className) { 
  alert("You Must Enter A Class Name"); 
  return ""
}

  createNewClassAsync(className).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showAddClassModal(false);
return 0;
};




// --------------------- Add a New Assignment ---------------------------------
async function createNewAssignmentAsync(classID, assignmentName, dueDate, maxSubmissions) { 
  const sendData = {'command' : 'createAssignment', classID, assignmentName, dueDate, maxSubmissions}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function createAssignmentClass (){ 
  assignmentName = document.getElementById('assignment-name-modal').value;
  dueDate = document.getElementById('assignment-date-modal').value;
  maxSubmissions = document.getElementById('assignment-submissions-modal').value;
  classID = document.getElementById('assignment-id-modal').value; 
  if (!(assignmentName && dueDate && maxSubmissions && classID)) { 
    alert("You must fill out the form.")
    return "Blank Input"
  }
  createNewAssignmentAsync(classID, assignmentName, dueDate, maxSubmissions).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showAddAssignmentModal(false);
return 0;
};


// --------------------- Edit Assignment ---------------------------------
async function editAssignmentAsync(assignmentID, assignmentName, dueDate, maxSubmissions) { 
  const sendData = {'command' : 'editAssignment', assignmentID, assignmentName, dueDate, maxSubmissions}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function editAssignment(){ 
  assignmentName = document.getElementById('assignmentSettings-name-modal').value;
  dueDate = document.getElementById('assignmentSettings-date-modal').value;
  maxSubmissions = document.getElementById('assignmentSettings-submissions-modal').value;
  assignmentID = document.getElementById('assignmentSettings-id-modal').value; 

  if (!(assignmentName && dueDate && maxSubmissions && assignmentID)) { 
    alert("You must fill out the form.")
    return "Blank Input"
  }

  editAssignmentAsync(assignmentID, assignmentName, dueDate, maxSubmissions).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showAssignmentSettingsModal(false);
return 0;
};




// --------------------- Remove User From Class ---------------------------------
async function removeUserFromClassAsync(userID, classID) { 
  const sendData = {'command' : 'removeUserFromClass', userID, classID}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function removeUserFromClass(userID, classID){ 
  if (!(userID && classID)) { 
    return "Blank Input"
  }

  removeUserFromClassAsync(userID, classID).then (data => { 
    console.log(data);
    //location.reload();
   return JSON.stringify(data.body);
   
});

showAssignmentSettingsModal(false);
return 0;
};



// --------------------- Edit Class ---------------------------------
async function editClassAsync(classID, className) { 
  const sendData = {'command' : 'editClass', classID, className}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function editClass(){ 
className = document.getElementById('edit-class-name-modal').value;
classID = document.getElementById('classSettings-classID-modal').value;


  if (!(className && classID)) { 
    return "Blank Input"
  }

  editClassAsync(classID, className).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showClassSettingsModal(false);
return 0;
};





// --------------------- Get Class Attendees ---------------------------------
async function getClassAttendeesAsync(classID) { 
  const sendData = {'command' : 'getAttendees', 'classID' : classID}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function getClassAttendees (classID){ 
  className = document.getElementById('class-name-modal').value;
  getClassAttendeesAsync(classID).then (data => { 
    var tbodyRef = document.getElementById('classAttendees-modal').getElementsByTagName('tbody')[0];
    tbodyRef.innerHTML = "";
    if ((data.Students != 'null')) { 
    JSON.parse(data.Students).forEach(element => {
    var newRow = tbodyRef.insertRow();
    var studentIDCell = newRow.insertCell();
    var studentNameCell = newRow.insertCell();
    var studentCommandCell = newRow.insertCell();
    var studentIDText = document.createTextNode(element.userID);
    studentIDCell.appendChild(studentIDText);

    var studentNameText = document.createTextNode(element.fullName);
    studentNameCell.appendChild(studentNameText);

    if (element.isPending == "0") { 
      //If is a current student of the class
      var studentCommandText = document.createElement("a");
      studentCommandText.onclick = function () { 
        removeUserFromClass(element.userID, classID);
      }
      studentCommandText.href = "";
      studentCommandText.text = "Remove";
      studentCommandCell.appendChild(studentCommandText);
    }else { 
      //If the student is pending authentication from the teacher
      var addElement = document.createElement("a");
      var deleteElement = document.createElement("a");

      addElement.onClick = "";
      deleteElement.onClick = "";

      addElement.href = "#";
      deleteElement.href = "#";

      addElement.text = "Add";
      deleteElement.text = "Delete";

      addElement.style = "margin-right:5px;"; 

      studentCommandCell.appendChild(addElement);
      studentCommandCell.appendChild(deleteElement);
      newRow.class = "table-secondary";
    }

    });
  }

   return data.body;
   
});
return 0;
};




// --------------------- Get Assignment Submissions ---------------------------------
async function getAssignmentSubmissionsAsync(assignmentID) { 
  const sendData = {'command' : 'getSubmissions', 'assignmentID' : assignmentID}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function getAssignmentSubmissions (assignmentID){ 
  getAssignmentSubmissionsAsync(assignmentID).then (data => { 
    var tbodyRef = document.getElementById('assignmentSubmissionsList-modal').getElementsByTagName('tbody')[0];
    tbodyRef.innerHTML = "";
    i = 0;
    JSON.parse(data.Submissions).forEach(element => {
      i++;
      var newRow = tbodyRef.insertRow();
          var studentIDCell = newRow.insertCell();
          var studentNameCell = newRow.insertCell();
          var studentSubmittedCell = newRow.insertCell();
          var studentDownloadCell = newRow.insertCell();

      //Insert Number Into Cell
      var studentNumberText = document.createTextNode(i);
      studentIDCell.appendChild(studentNumberText);

      //Insert Name Into Cell
      var studentNameText = document.createTextNode(element.fullName);
      studentNameCell.appendChild(studentNameText);


      // Insert Submitted Time Into Cell

      currDueDate = new Date(element.submissionTime);
      var studentSubmitText = document.createTextNode(currDueDate.toLocaleString());
      studentSubmittedCell.appendChild(studentSubmitText);

      //Create Download Link
      var studentCommandText = document.createElement("a");
      studentCommandText.onClick = "";
      studentCommandText.href = element.downloadLink;
      studentCommandText.download = '';
      studentCommandText.text = "Download Assignment";
      studentDownloadCell.appendChild(studentCommandText);
      
      
   

    });

    
   return data.body;
   
});
return 0;
};



// --------------------- Get Weekly Seeds ---------------------------------
async function getWeeklySeedsAsync(userID) { 
  const sendData = {'command' : 'getWeeklySeeds', userID}; 

  //Send to API
 let promise = new Promise((resolve, reject) => {

  fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => response.json())
   .then(data => {
     resolve(data);
   })

  
});
let result = await promise
return result;
}

function getWeeklySeeds (userID){ 
  getWeeklySeedsAsync(userID).then (data => { 
  var weeklySeedsArr = data.weeklySeeds;
  
  if (weeklySeedsArr){
  weeklySeedsArr.forEach( seed => {
    var fullName = seed.fullName;
    var className = seed.className;
    var pointsEarned = seed.pointsEarned;
    var sideBar = document.getElementById('weeklySeedsBody');
    var tableRow = sideBar.insertRow();
    var tableData = document.createElement('td');

    tableData.classList.add("u-border-2");
    tableData.classList.add("u-border-grey-dark-1");
    tableData.classList.add("u-table-cell");
    tableData.classList.add("u-table-cell-3");
    tableRow.style = 'height: 120px;';

    // Get Name And Add To Field
    var boldedName = document.createElement('b');
    boldedName.innerText = fullName + '\n';
    tableData.appendChild(boldedName);

    // Get Class And Add To Field
    var italClass = document.createElement('i');
    italClass.innerText = className + '\n';
    tableData.appendChild(italClass);

    // Get Points And Add To Field
    var italPoints = document.createElement('i');
    italPoints.innerText = pointsEarned + ' Avocados';
    tableData.appendChild(italPoints);
  
    tableRow.appendChild(tableData);
  })
   return data.body;
} else { 
    var sideBar = document.getElementById('weeklySeedsBody');
    var tableRow = sideBar.insertRow();
    var tableData = document.createElement('td');
    tableData.classList.add("u-table-cell");

    tableRow.style = 'height: 120px;';

    // Add No Seeds
    var boldedName = document.createElement('p');
    boldedName.innerText = 'There Are No Weekly Seeds \n \n \n';
    tableData.appendChild(boldedName);
    tableRow.appendChild(tableData);
}
});
return 0;
};