const bcrypt = require('bcryptjs');
const Q = require('q');
const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');
const databaseConfig = ini.parse(fs.readFileSync('./Config/database.ini', 'utf-8'));


// MongoDB connection information



//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
  var deferred = Q.defer();

    //Connect To Database
    const connection = mysql.createConnection( { 
        host : databaseConfig.database.host,
        database : databaseConfig.database.dbname,
        user : databaseConfig.database.username,
        password : databaseConfig.database.password
    });

    //Query Database
    sql = 'call verifyuser(\'' + username + '\',\'' + password +'\');'
    query = connection.query(sql);
    query.on('result', function(row) {
        if(row.constructor.name == 'RowDataPacket') { 
            //Grab the columns that get sent
            isvaliduser = row['Valid_User'];
            isTeacher = row['Is_Teacher'];
            profilePicture = row['Profile_Picture'];
            firstname = row['First_Name'];
            lastname = row['Last_Name'];
            email = row['Email'];
            points =  row['Points'];

            //Change Profile Picture To Base64
            let buff = new Buffer(profilePicture);
            profilePicture = buff.toString('base64');

            //Change isTeacher to Null if Student
            if (isTeacher == 0) { 
              isTeacher = null;
            }



            if (!isvaliduser == 0) { 
                result = {'username' : username, 
                            'isTeacher' : isTeacher, 
                            'profilepicture' : profilePicture, 
                            'firstname': firstname,
                            'lastname' : lastname,
                            'email' : email,
                            'points' : points}; 


                deferred.resolve(result);
            }else { 
                deferred.resolve(false);
            }

        }  
    });
    connection.end();
  return deferred.promise;
}