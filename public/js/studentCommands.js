async function requestAssignmentsAsync(user_id) { 
    //Send login information over to the api
    const sendData = {'command' : 'assignmentRequest', 'user_id' : user_id}; 

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


  function requestAssignments (user_id){ 
    requestAssignmentsAsync(user_id).then (data => { 
    console.log(data);
    return data;
  });
  return 'Login Requested...'
};



