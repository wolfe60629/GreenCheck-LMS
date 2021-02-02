const express = require('express');
const teacherIndexRouter = require('./routes/teacherIndex');
const studentIndexRouter = require('./routes/studentIndex');
const loginPageRouter = require('./routes/login');
var isLoggedIn = false;

const app = express();
const port = process.env.PORT || 3000;

//Added for future seperate views
const isStudent = false;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));


//Check if the person is a student and set appropriate routes
if (isLoggedIn) { 
    if (isStudent ==false) { 
        app.use('/', teacherIndexRouter);
    }else { 
        app.use('/', studentIndexRouter);
    }
}else { 
    app.use('/', loginPageRouter);
}




 app.use((req, res, next) => {
    if (req.path != '/api') { 
        res.status(404).render('404', {page: 'Page not found'});
    }
    next();
}); 
 
module.exports = app;

//Start Listening For API Calls
app.use(express.json({limit: "1mb"}));
app.post('/api', function(req,res) { 
    res.setHeader('Content-Type', 'application/json');
    
    console.log(req.body);
   return res.json({
        'Status' : 'SUCCESS',
        'Timestamp' : Date.now(),
        'Data': 'NONE'
    });
});

app.listen(port, console.log(`Server is listening at port ${port}.`))

