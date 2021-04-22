//index.js/
    const express = require('express');
    const exphbs = require('express-handlebars');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const methodOverride = require('method-override');
    const session = require('express-session');
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const helmet = require('helmet');
    var https = require('https');
    var http = require('http');
    const fs = require('fs');
    const ini = require('ini');
    const mysql = require('mysql');
    const databaseConfig = ini.parse(fs.readFileSync(__dirname + '/Config/database.ini', 'utf-8'));
    var key = fs.readFileSync(__dirname + '/Config/selfsigned.key');
    var cert = fs.readFileSync(__dirname + '/Config/selfsigned.crt');
    var options = {
      key: key,
      cert: cert
    };

    const app = express();
    const httpport = 80;
    const httpsport = 443;
    const funct  = require('./functions.js');


    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

//===============PASSPORT=================
// Use the LocalStrategy within Passport to login/"signin" users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});


//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());


// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', //we will be creating this layout shortly
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
hbs.handlebars.registerHelper('checkAssignment', function (a, b) {
  if (a==b) { 
    return true;
  }else{
    return false;
  }
});

hbs.handlebars.registerHelper('isdefined', function (value) {
    return value != undefined && value != '';
});
hbs.handlebars.registerHelper('filterPriorityQueue', function(value, options) {
  if(!hbs.handlebars.Utils.isArray(value)){
      return [];
  } else {
      arr1 = value.filter(function(ele){
          return !hbs.handlebars.Utils.isEmpty(ele.assignmentName);
      });
      
      //SHOW TOP 5
      return arr1.slice(0,5);
  }
});

//================POST DATA (API) =============


app.post('/api', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  //If you are authenticated
  user = req.user;
  if (user) { 
    if (user.isTeacher) { 
      //TEACHER COMMANDS 
      switch(req.body.command) { 
      case ("createClass"): 
          funct.createNewClass(user.userID,req.body.className)
          .then(dbRes => { 
            res.json({
              'Status' : 'SUCCESS',
              'Timestamp' : Date.now(),
              'Class' : JSON.stringify(dbRes)
            });
          });
        break;
      case ("getAttendees") : 
      funct.getClassAttendees(req.body.classID)
      .then(dbRes => { 
        res.json({
          'Status' : 'SUCCESS',
          'Timestamp' : Date.now(),
          'Students' : JSON.stringify(dbRes)
        });
        });
          break;
       case ("createAssignment"): 
       funct.createNewAssignment(req.body.classID,req.body.assignmentName,req.body.dueDate,req.body.maxSubmissions)
       .then(dbRes => { 
         res.json({
           'Status' : 'SUCCESS',
           'Timestamp' : Date.now()
         });
       });
       break;


       case ('editAssignment'): 
          funct.editAssignment(req.body.assignmentID,req.body.assignmentName,req.body.dueDate,req.body.maxSubmissions)
          .then(dbRes => { 
           res.json({
            'Status' : 'SUCCESS',
            'Timestamp' : Date.now()
           });
          });
       break;

       case ('getSubmissions'):
         funct.getAssignmentSubmissions(req.body.assignmentID)
         .then(dbRes => { 
          res.json({
            'Status' : 'SUCCESS',
            'Timestamp' : Date.now(),
            'Submissions' : JSON.stringify(dbRes)
          });
        });
         break;


         case ('removeUserFromClass'):
          funct.removeUserFromClass(req.body.userID, req.body.classID)
          .then(dbRes => { 
           res.json({
             'Status' : 'SUCCESS',
             'Timestamp' : Date.now()
           });
         });
          break;

          case ('editClass'):
            funct.editClass(req.body.classID, req.body.className)
            .then(dbRes => { 
             res.json({
               'Status' : 'SUCCESS',
               'Timestamp' : Date.now()
             });
           });
            break;

            case ('getWeeklySeeds'):
              funct.getWeeklySeeds(req.body.userID)
              .then(dbRes => { 
               res.json({
                 'Status' : 'SUCCESS',
                 'Timestamp' : Date.now(),
                 'weeklySeeds' : dbRes
               });
             });
              break;

      }

    }else if (user.isTeacher == null) { 
      //STUDENT COMMANDS
      switch(req.body.command) { 
        case ('submitAssignment'):

        funct.submitAssignment(req.body.userID, req.body.assignmentID, req.body.document, req.body.documentName);
          res.json({
            'Status' : 'SUCCESS',
            'Timestamp' : Date.now()
          });
          break; 


          case ('addClass') : 
          funct.addClassToPending(req.body.classCode, req.body.userID)
          .then(data => { 
            res.json({
              'Status' : 'SUCCESS',
              'Timestamp' : Date.now(),
              'ClassAdded' : data
            });
          });


          break;
      }

    }
  } else { 
  //Return Not Authenticated User
    res.json({
      'Status' : 'FAILED AUTHENTICATION',
      'Timestamp' : Date.now()
    });
  }
});



//===============ROUTES===============
//displays our homepage
app.get('/', function(req, res){
  if (!req.secure) {
    res.redirect('https://' + req.headers.host + req.url);
  }

  if (req.user) {
    funct.getUserClassInformation(req.user.userID)
    .then(function (classInformation) { 

      //Get all unique classes and generate 
      let classes = [];
      let assignmentQueue = [];
      

      //Check to see if no classes are returned
      if (classInformation == null) { 
        console.log("No Classes Were Found - Setting Null");
        classInformation = []
      }

      classInformation.forEach(element =>  { 
        classes.push([element.className,element.classID,element.classCode]);

        //If database pulls empty record, inialize the array to blank
        if (element.assignmentName == '') { 
          element.assignmentName = null;
          element.dueDate = null;
        }
      });


      let uniqueClasses = [];
       classMap = new Map();
       classes.forEach(item => { 
          if(!classMap.has(item[1])){
            classMap.set(item[1], true);    // set any value to Map
              uniqueClasses.push({"classID" : item[1] , "className" : item[0], "classCode" : item[2]});
          }
       });

      //Render the Dashboard
      res.render('home', {user: req.user, 'classes' : uniqueClasses , 'assignments' : classInformation});
    });
  }else { 
    res.render('home', {user: req.user});
  }

  
  
});

//displays our signup page
app.get('/login', function(req, res){
  if (!req.secure) {
    res.redirect('https://' + req.headers.host + req.url);
  }
  res.render('login');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/local-reg', function(req,res) { 

  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var teacherStatus = req.body.teacherStatus;

  if (teacherStatus == '0') { 
    teacherStatus = false;
  } else if (teacherStatus == '1') {
    teacherStatus = true;
  }

  console.log(req.body);

  funct.localreg(username,firstname,lastname, email, password, teacherStatus);
 res.redirect('/login');
}
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  if (!req.secure) {
    res.redirect('https://' + req.headers.host + req.url);
  }
  var name = req.user.username;
  console.log("LOGGING OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//===============PORT=================
http.createServer(app).listen(httpport);
https.createServer(options, app).listen(httpsport);

console.log("listening on " + httpport + " and " + httpsport + "!");