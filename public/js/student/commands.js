function clearStorage() { 
  window.sessionStorage.clear();
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var submitModal = document.getElementById("submitModal");
  var addClassModal = document.getElementById("addClass-Modal");
  var redeemPointsModal = document.getElementById('redeem-points-Modal');


  switch (event.target) { 
    case (addClassModal): 
      var classCode = document.getElementById("class-code-modal");
      classCode.value = "";
      event.target.style.display = 'none';
      break;

      case (submitModal): 
      event.target.style.display = 'none';
      break;

      case (redeemPointsModal): 
      event.target.style.display = 'none';
      break;
   

    default: 
    break;
  }
}





function showAssignmentModal(isShown, assignmentID, assignmentName,maxSubmissions,points) { 
  var pointsField = document.getElementById('modalPoints');
  var modal = document.getElementById("submitModal");
  var assignmentNameElement = document.getElementById("modalAssignmentName");
  var assignmentIDElement = document.getElementById("modalAssignmentID");
  var maxSubmissionsElement = document.getElementById("modalMaxSubmissions");
  var assignmentSubmissions = document.getElementById("modalAssignmentSubmissions");
  var submissionCount = document.getElementById("submissioncount-" + assignmentID)?.innerText;

  
    if (assignmentName && isShown) { 
      modal.style.display = "block";
      pointsField.innerText = points
      assignmentNameElement.innerText = (assignmentName);
      assignmentIDElement.innerText = (assignmentID);
      maxSubmissionsElement.innerText = maxSubmissions;
      assignmentSubmissions.innerText = submissionCount;
    }else { 
      modal.style.display = "none";
      
    }
  }


//Show the modals when function is ran
function showAddClassModal(isShown) { 
  var modal = document.getElementById("addClass-Modal");
  var classCode = document.getElementById("class-code-modal");

    if (isShown) { 
      modal.style.display = "block";
    }else { 
      modal.style.display = "none";
      classCode.value = "";
      
    }
  }

  //Show the modals when function is ran
function showRedeemPointsModal(isShown) { 
  var modal = document.getElementById("redeem-points-Modal");

    if (isShown) { 
      modal.style.display = "block";
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
      body: sendData,
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
return 0;
};



// --------------------- Submit an Assignment ---------------------------------
async function submitStudentAssignmentAsync(userID,assignmentID,document,documentName) { 
  const sendData = {'command' : 'submitAssignment', 'userID'  : userID, 'assignmentID' : assignmentID, 'document' : document, 'documentName' : documentName}; 

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

function submitStudentAssignment (userID){ 
//Get the requred information 
assignmentID = parseInt(document.getElementById("modalAssignmentID").innerText);
assignmentBox = document.getElementById("assignment-" + assignmentID);
assignmentPriorityQueue = document.getElementById("assignmentQueue-" + assignmentID);
assignmentSubmissions = parseInt(document.getElementById("modalAssignmentSubmissions").innerText);
assignmentMaxSubmissions = parseInt(document.getElementById("modalMaxSubmissions").innerText);
submissionCount = document.getElementById("submissioncount-"+assignmentID);
fileInput = document.getElementById('file-input');
fileName = fileInput.files.item(0).name;

submitStudentAssignmentAsync(userID,assignmentID,fileContents,fileName).then (data => { 
    console.log(data);
  return JSON.stringify(data.body);
});


//Hide The Submission Box and Priority Queue if Out of Submissions
if (assignmentSubmissions+1 >= assignmentMaxSubmissions) { 
  assignmentBox.style.display = 'none';
  assignmentPriorityQueue.style.display = 'none';
}else { 
   submissionCount.innerText = assignmentSubmissions + 1;
}

showAssignmentModal(false);
fileInput.value = '';
return 0;
};


var fileContents;
var reader;
var progress = document.querySelector('.percent');

function abortRead() {
	reader.abort();
}

function errorHandler(evt) {
	switch (evt.target.error.code) {
		case evt.target.error.NOT_FOUND_ERR:
			alert('File Not Found!');
			break;
		case evt.target.error.NOT_READABLE_ERR:
			alert('File is not readable');
			break;
		case evt.target.error.ABORT_ERR:
			break; // noop
		default:
			alert('An error occurred reading this file.');
	};
}

function updateProgress(evt) {
	// evt is an ProgressEvent.
	if (evt.lengthComputable) {
		var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
		// Increase the progress bar length.
		if (percentLoaded < 100) {
			progress.style.width = percentLoaded + '%';
			progress.textContent = percentLoaded + '%';
		}
	}
}

function handleFileSelect(evt) {
	// Reset progress indicator on new file selection.
  var output = document.getElementById("result");
	progress.style.width = '0%';
	progress.textContent = '0%';
	reader = new FileReader();
	reader.onerror = errorHandler;
	reader.onprogress = updateProgress;
	reader.onabort = function(e) {
		alert('File read cancelled');
	};
	reader.onloadstart = function(e) {
		document.getElementById('progress_bar').className = 'loading';
	};
	reader.onload = function(e) {
		// Ensure that the progress bar displays 100% at the end.
		progress.style.width = '100%';
		progress.textContent = '100%';
    fileContents = event.target.result;
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
	}


reader.readAsDataURL(evt.target.files[0]);

	
}

document.getElementById('file-input').addEventListener('change', handleFileSelect, false);



// --------------------- Add a New Class ---------------------------------
async function addClassAsync(classCode, userID) { 
  const sendData = {'command' : 'addClass', 'classCode' : classCode, 'userID' : userID}; 

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

function addClass (userID){ 
  classCode = document.getElementById('class-code-modal').value;

if (!classCode) { 
  alert("Please Enter a Class Code"); 
  return ""
}

addClassAsync(classCode,userID).then (data => { 
    console.log(data);
    location.reload();
   return JSON.stringify(data.body);
   
});

showAddClassModal(false);
return 0;
};


// --------------------- Get Redeemable Items ---------------------------------
async function getItemsAsync(userID) { 
  const sendData = {'command' : 'getItems', userID}; 

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

function getItems (userID){ 
  getItemsAsync(userID).then (data => {
  console.log(data);
  var itemsArr = data.Items;
  console.log(itemsArr)
  if (itemsArr){
    modalBody = document.getElementById('redeem-points-modal-body');
    modalBody.innerHTML = '';
    itemsArr.forEach(item => { 

    itemID = item.itemID;
    itemName = item.itemName;
    pointValue = item.pointValue;
    itemDescription = item.itemDescription;
    itemValue = item.itemValue;

    card = document.createElement('div');
    card.classList.add('card');
    card.style = 'width: 18rem;';

    //Item Image
    itemImageElement = document.createElement('img');
    itemImageElement.classList.add('card-img-top');
    itemImageElement.src = "data:image/png;base64, " + itemValue;
    itemImageElement.alt = 'Card image cap';
    itemImageElement.style = 'height:200px;width:208px;';
    card.appendChild(itemImageElement);

    //Card Body
    cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    //Item Name
    itemNameElement = document.createElement('h5');
    itemNameElement.classList.add('card-title');
    itemNameElement.innerText = itemName;
    cardBody.appendChild(itemNameElement);

    //Item Amount
    itemAmountElement = document.createElement('h6');
    itemAmountElement.classList.add('card-title');
    itemAmountElement.innerText = pointValue + ' Avocados';
    itemAmountElement.style = 'color:green;'
    cardBody.appendChild(itemAmountElement);

    // Item Description
    itemDescriptionElement = document.createElement('p');
    itemDescriptionElement.classList.add('card-text');
    itemDescriptionElement.innerText = itemDescription;
    cardBody.appendChild(itemDescriptionElement);


    // Item Action 
    itemActionElement = document.createElement('a');
    itemActionElement.className += 'btn btn-primary';
    itemActionElement.innerText = 'Redeem Item';
    itemActionElement.href = "#";
    
    cardBody.appendChild(itemActionElement);

    // Append Body To Card
    card.appendChild(cardBody);

    //Append Card To Document
    modalBody.appendChild(card);
    });



   return data.body;
} else { 

}
});
return 0;
};