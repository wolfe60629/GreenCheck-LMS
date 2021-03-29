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




