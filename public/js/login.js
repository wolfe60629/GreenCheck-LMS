function sendLogin(username,password) { 
    //Send login information over to the api
    const sendData = {'command' : 'login', 'username' : username, 'password' : password}; 

    //Send to API
fetch('/api' , {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {'Content-Type' : 'application/JSON'}
   })
   .then(response => {
     if (!response.ok) { throw Error(response.statusText)};
     console.log(response);
     return response.json; //JSON.stringify(response);
   })
}





