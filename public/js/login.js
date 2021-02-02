async function sendLoginAsnyc(username,password) { 
    //Send login information over to the api
    const sendData = {'command' : 'login', 'username' : username, 'password' : password}; 

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

  function sendLogin (username,password){ 
   sendLoginAsnyc(username,password).then (data => { 
    console.log(data);
    return data;
  });
  return 'Login Requested...'
};



