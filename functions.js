const bcrypt = require('bcryptjs');
const Q = require('q');
const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');
const databaseConfig = ini.parse(fs.readFileSync('./Config/database.ini', 'utf-8'));

/**************************************************
 * Create a local authentication method
 **************************************************/
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
    console.log('Database Query - VerifyUser');
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
            userID =  row['User_ID'];

            
            //Change Profile Picture To Base64
            if (profilePicture == null) { 
              profilePicture = "";
            }
              let buff = new Buffer(profilePicture);
              profilePicture = buff.toString('base64');
          
            //Change isTeacher to Null if Student
            if (isTeacher == 0) { 
              isTeacher = null;
            }



            if (!isvaliduser == 0) { 
                result = {'username' : username,
                            'userID' : userID,
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

/**************************************************
 * Get user classes and assignments from database
 **************************************************/
exports.getUserClassInformation = function (user_id) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var assignments = [];


  //Query Database
  sql = 'call getClassInformation(\'' + user_id +'\');'
  console.log('Database Query - getClassInformation(' + user_id + ')');
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;
          classID = row['Class_ID'];
          className = row['Class_Name'];
          classCode = row['Class_Code'];
          assignmentName = row['Assignment_Name'];
          assignmentID = row['Assignment_ID'];
          dueDate = row['Due_Date'];
          maxSubmissions = row['Max_Submissions'];
          submissionCount = row['submission_count'];
          var ampm = dueDate?.getHours() >= 12 ? 'PM' : 'AM';
          let formatted_date = dueDate?.getMonth() + "/" + dueDate?.getDate() + "/" + dueDate?.getFullYear() + " " + (dueDate?.getHours()%12 == 0 ? '12' : (dueDate?.getHours() === '12' ? '12' : dueDate?.getHours()%12)) + ":" + (dueDate?.getMinutes() < 10 ? "0" + dueDate?.getMinutes() : dueDate?.getMinutes()) + ampm ;
              result = {  'classID' : classID,
                          'className' : className,
                          'classCode' : classCode,
                          'assignmentID' : assignmentID,
                          'assignmentName' : assignmentName, 
                          'dueDate' : formatted_date, 
                          'maxSubmissions': maxSubmissions,
                          'submissionCount' : submissionCount 
                        }; 
              assignments.push(result)
              deferred.resolve(assignments);
          }else { 
            // If no rows were returned from the database
              if (!dataRecivedNotNull) { 
                deferred.resolve(null);
              }
              deferred.resolve(false);
          }
  });
  connection.end();
return deferred.promise;

}

/**************************************************
 * Submit Assignments From Student Account
 **************************************************/
 exports.submitAssignment = function (user_id, assignment_id, document) { 
  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });


  //Query Database
  sql = 'call submitAssignment(' + user_id + ',' + assignment_id + ',\'' + document + '\');'
  query = connection.query(sql);  
  connection.end();

}


/**************************************************
 * Create a new Class
 **************************************************/
 exports.createNewClass = function (user_id,className) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var newClass = [];


  //Query Database
  sql = 'call createClass(\'' + user_id +'\', \'' + className + '\');'
  console.log('Database Query - CreateNewClass(' + className + ')');
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;
          classID = row['Class_ID'];
          className = row['Class_Name'];
          classCode = row['Class_Code'];
    
              result = {  'classID' : classID,
                          'className' : className,
                          'classCode' : classCode
                        }; 
              newClass.push(result)
              deferred.resolve(newClass);
          }else { 
            // If no rows were returned from the database
              if (!dataRecivedNotNull) { 
                deferred.resolve(null);
              }
              deferred.resolve(false);
          }
  });
  connection.end();
return deferred.promise;

}


/**************************************************
 * Get Attendees Inside of a Class
 **************************************************/
 exports.getClassAttendees = function (classID) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var students = [];


  //Query Database
  sql = 'call getClassUsers(\'' + classID +'\');'
  console.log('Database Query - getClassUsers(' + classID + ')');
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;
          userID = row['User_ID'];
          fullName = row['Full Name'];
          isPending = row['isPending'];
    
              result = {  'userID' : userID,
                          'fullName' : fullName,
                          'isPending' : isPending
                        }; 
              students.push(result)
              deferred.resolve(students);
          }else { 
            // If no rows were returned from the database
              if (!dataRecivedNotNull) { 
                deferred.resolve(null);
              }
              deferred.resolve(false);
          }
  });
  connection.end();
return deferred.promise;

}