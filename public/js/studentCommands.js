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


