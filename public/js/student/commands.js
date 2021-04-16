
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById("submitModal");
  if (event.target == modal) {
    modal.style.display = "none";
    //location.reload(true);
  }
}
function showAssignmentModal(isShown, assignmentID, assignmentName,maxSubmissions) { 
  var modal = document.getElementById("submitModal");
  var assignmentNameElement = document.getElementById("modalAssignmentName");
  var assignmentIDElement = document.getElementById("modalAssignmentID");
  var maxSubmissionsElement = document.getElementById("modalMaxSubmissions");
  var assignmentSubmissions = document.getElementById("modalAssignmentSubmissions");
  var submissionCount = document.getElementById("submissioncount-" + assignmentID)?.innerText;

  
    if (assignmentName && isShown) { 
      modal.style.display = "block";
      assignmentNameElement.innerText = (assignmentName);
      assignmentIDElement.innerText = (assignmentID);
      maxSubmissionsElement.innerText = maxSubmissions;
      assignmentSubmissions.innerText = submissionCount;
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