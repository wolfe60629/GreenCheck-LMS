// --------------------TEACHER MODAL CODE ------------------------------------ //

// Add on click listeners to hide modals
window.onclick = function(event) {
  var addClassModal = document.getElementById("addClass-Modal");
  var addAssignmentModal = document.getElementById("addAssignment-Modal");
  var classSettingsModal = document.getElementById("classSettings-Modal");

  switch (event.target) { 
    case (addClassModal): 
      var className = document.getElementById("class-name-modal");
      className.value = "";
      event.target.style.display = 'none';
      break;
    case (addAssignmentModal):
      var assignmentName = document.getElementById("assignment-name-modal");
      assignmentName.value = "";
      event.target.style.display = 'none';
      break;
      case (classSettingsModal):
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

  function showClassSettingsModal(isShown, classID, classCode) { 
    var modal = document.getElementById("classSettings-Modal");
    var classCodeSpan = document.getElementById("classCodeSpan-Modal");

    if (classCode) { 
      classCodeSpan.innerText = classCode;
    }
    if (classID){ 
      getClassAttendees(classID)
      }   

      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
        className.value = "";
        
      }
    }


  function showAddAssignmentModal(isShown) { 
    var modal = document.getElementById("addAssignment-Modal");
    var className = document.getElementById("assignment-name-modal");
  
      if (isShown) { 
        modal.style.display = "block";
      }else { 
        modal.style.display = "none";
        className.value = "";
        
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
  createNewClassAsync(className).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showAddClassModal(false);
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
      studentCommandText.onClick = "";
      studentCommandText.href = "#";
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

    
   return data.body;
   
});
return 0;
};




