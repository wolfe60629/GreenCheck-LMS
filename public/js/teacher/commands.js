// --------------------TEACHER MODAL CODE ------------------------------------ //

// Add on click listeners to hide modals
window.onclick = function(event) {
  var addClassModal = document.getElementById("addClass-Modal");
  var addAssignmentModal = document.getElementById("addAssignment-Modal");

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




