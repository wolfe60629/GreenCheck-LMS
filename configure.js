var prompt = require('prompt');
var fs = require('fs');
var shell = require('shelljs');


prompt.start();

prompt.get([{name: 'dbip' , description : 'What is the Database IP?'}, 
            {name: 'dbport' , description : 'What is the Database Port?'},
            {name: 'dbname' , description : 'What is the Database Name?'},
            {name: 'dbuser' , description : 'Username: '},
            {name: 'dbpass' , description : 'Password: '}],
                function (err, result) {
fs.mkdir('./Config', { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile('./Config/database.ini', '[database]\n', function (err) {});
fs.appendFile('./Config/database.ini', 'host = ' + result.dbip + '\n', function (err) {});
fs.appendFile('./Config/database.ini', 'dbname = ' + result.dbname + '\n', function (err) {});
fs.appendFile('./Config/database.ini', 'port = ' + result.dbport + '\n', function (err) {});
fs.appendFile('./Config/database.ini', 'username = ' + result.dbuser + '\n', function (err) {});
fs.appendFile('./Config/database.ini', 'password = ' + result.dbpass + '\n', function (err) {});


shell.exec('openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./Config/selfsigned.key -out ./Config/selfsigned.crt -subj "/C=US/ST=Denial/L=Denial/O=Denial/CN=www.greenchecklms.com"');
});

