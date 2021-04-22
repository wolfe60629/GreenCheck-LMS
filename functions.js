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
    sql = 'call verifyuser(' + connection.escape(username) + ',' + connection.escape(password) + ')';
    console.log(sql);
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
 * Create a local registration method
 **************************************************/
 exports.localreg = function (username,firstname,lastname,email, password, teacherStatus) {
  var deferred = Q.defer();

    //Connect To Database
    const connection = mysql.createConnection( { 
        host : databaseConfig.database.host,
        database : databaseConfig.database.dbname,
        user : databaseConfig.database.username,
        password : databaseConfig.database.password
    });



    //Add The New User To The Database 
    profPic = null;
    sql = 'call createUser(' + connection.escape(username) + ',' + connection.escape(password) + ',' + connection.escape(firstname) + ',' + connection.escape(lastname) + ',' + connection.escape(email) + ',' + connection.escape(teacherStatus) + ',' + profPic + ');';
    console.log(sql);
    query = connection.query(sql);
    query.on('result', function(row) {
        if(row.constructor.name == 'RowDataPacket') { 
            //Grab the columns that get sent
            success = row['success'];
                result = {success}; 
                deferred.resolve(result);
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
  sql = 'call getClassInformation(' + connection.escape(user_id) + ');';
  console.log(sql);
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
          pointsAssigned =row['points_assigned'];
          var ampm = dueDate?.getHours() >= 12 ? ' PM' : ' AM';
          let formatted_date = dueDate?.getMonth()+1 + "/" + dueDate?.getDate() + "/" + dueDate?.getFullYear() + " " + (dueDate?.getHours()%12 == 0 ? '12' : (dueDate?.getHours() === '12' ? '12' : dueDate?.getHours()%12)) + ":" + (dueDate?.getMinutes() < 10 ? "0" + dueDate?.getMinutes() : dueDate?.getMinutes()) + ampm ;
              result = {  'classID' : classID,
                          'className' : className,
                          'classCode' : classCode,
                          'assignmentID' : assignmentID,
                          'assignmentName' : assignmentName, 
                          'dueDate' : formatted_date, 
                          'maxSubmissions': maxSubmissions,
                          'submissionCount' : submissionCount,
                          'pointsAssigned' : pointsAssigned  
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
 * Get Assignment Submissions From Database
 **************************************************/
 exports.getAssignmentSubmissions = function (assignmentID) { 
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
  sql = 'call getAssignmentSubmissions(' + connection.escape(assignmentID) + ');';
  console.log(sql);
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;

          downloadLink = row['URL'];
          submissionID = row['Submission_ID'];
          submissionTime = row['Submission_Time'];
          fullName = row['Full_Name'];

              result = {    downloadLink,
                            submissionID,
                            submissionTime,
                            fullName  
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
 exports.submitAssignment = function (user_id, assignment_id, document, documentName) { 
  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });


  //Query Database
  console.log(sql);
  sql = 'call submitAssignment(' + connection.escape(user_id) + ',' + connection.escape(assignment_id) + ',' + connection.escape(document) + ',' + connection.escape(documentName) + ');';
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
  sql = 'call createClass(' + connection.escape(user_id) + ',' + connection.escape(className) + ');';
  console.log(sql);
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
  sql = 'call getClassUsers(' + connection.escape(classID) + ');';
  console.log(sql);
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

/**************************************************
 * Add Assignments into a Class
 **************************************************/
 exports.createNewAssignment = function (classID, assignmentName, dueDate, maxSubmissions) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var newAssignment = [];


  //Query Database
  sql = 'call createAssignment(' + connection.escape(assignmentName) + ',' + connection.escape(classID) + ',' + connection.escape(dueDate) + ',' + connection.escape(maxSubmissions) + ');';
  console.log(sql);
  query = connection.query(sql);
  query.on('result', function(row) {
  });
  deferred.resolve("AddedAssignment");
  connection.end();
    return deferred.promise;

}


/**************************************************
 * Edit Assignments in a Class
 **************************************************/
 exports.editAssignment = function (assignmentID, assignmentName, dueDate, maxSubmissions) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var newAssignment = [];


  //Query Database
  sql = 'call editAssignment(' + connection.escape(assignmentID) + ',' + connection.escape(assignmentName) + ',' + connection.escape(dueDate) + ',' + connection.escape(maxSubmissions) + ');';
  console.log(sql);
  query = connection.query(sql);
  query.on('result', function(row) {
  });
  deferred.resolve("Edited Assignment");
  connection.end();
    return deferred.promise;

}



/*********************************************************************
 * Add a Class To The Student Profile - Pending Teacher Confirmation 
 *********************************************************************/

 exports.addClassToPending = function (class_code, user_id) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  // Formulate Return Structure
  var wasAdded = [];


  //Query Database
  sql = 'call addStudentClass(\'' + class_code + '\',' + user_id + ')';
  console.log('Database Query - addStudentClass(\'' + class_code + '\',' + user_id + ')');
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;
          classAdded = row['correct'];

              result = {classAdded}; 
              wasAdded.push(result)
              deferred.resolve(wasAdded);
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
 * Remove User From Class
 **************************************************/
 exports.removeUserFromClass = function (userID, classID) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  //Query Database
  sql = 'call removeUserFromClass(' + connection.escape(userID) + ','  + connection.escape(classID) + ');';
  console.log(sql);
  query = connection.query(sql);
  query.on('result', function(row) {
  });
  deferred.resolve("Removed User");
  connection.end();
    return deferred.promise;

}


/**************************************************
 * Edit Class
 **************************************************/
 exports.editClass = function (classID, className) { 
  var deferred = Q.defer();

  //Connect To Database
  const connection = mysql.createConnection( { 
      host : databaseConfig.database.host,
      database : databaseConfig.database.dbname,
      user : databaseConfig.database.username,
      password : databaseConfig.database.password
  });

  //Query Database
  sql = 'call editClass(' + connection.escape(classID) + ','  + connection.escape(className) + ');';
  console.log(sql);
  query = connection.query(sql);
  query.on('result', function(row) {
  });
  deferred.resolve("Edited Class");
  connection.end();
    return deferred.promise;

}


/**************************************************
 * Get Teacher Weekly Seeds
 **************************************************/
 exports.getWeeklySeeds = function (userID) { 
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
  sql = 'call getWeeklySeeds(' + connection.escape(userID) + ');';
  console.log(sql);
  dataRecivedNotNull = false;
  query = connection.query(sql);
  query.on('result', function(row) {
      if(row.constructor.name == 'RowDataPacket') { 
          //Grab the columns that get sent
          dataRecivedNotNull = true;
          className = row['Class_Name'];
          fullName = row['full_name'];
          pointsEarned = row['class_points_earned'];
    
              result = {fullName,className,pointsEarned}; 
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