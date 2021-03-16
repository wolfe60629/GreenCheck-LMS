
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById("submitModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function showAssignmentModal(isShown,assignmentName,maxSubmissions) { 
  var modal = document.getElementById("submitModal");
  var assignmentNameElement = document.getElementById("modalAssignmentName")
  var maxSubmissionsElement = document.getElementById("modalMaxSubmissions");
    if (assignmentName && isShown) { 
      modal.style.display = "block";
      assignmentNameElement.innerText = (assignmentName);
     // maxSubmissionsElement.innerText =  'Number of Submissions Allowed: ' + maxSubmissions;
    }else { 
      modal.style.display = "none";
    }
  }



//________________________NOT USED YET ___________________
async function getUserClassInformationAsync() { 
    const sendData = {'command' : ''}; 

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

function getUserClassInformation (){ 
  getUserClassInformationAsync().then (data => { 
    
  return data;
});
};


