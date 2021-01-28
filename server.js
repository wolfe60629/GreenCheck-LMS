const express = require('express');
const teacherIndexRouter = require('./routes/teacherIndex');
const studentIndexRouter = require('./routes/studentIndex');
const app = express();
const port = process.env.PORT || 3000;

//Added for future seperate views
const isStudent = true;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));


//Check if the person is a student and set appropriate routes
if (isStudent ==false) { 
    app.use('/', teacherIndexRouter);
}else { 
    app.use('/', studentIndexRouter);
}


app.use((req, res, next) => {
    res.status(404).render('404', {page: 'Page not found'});
});

app.listen(port, console.log(`Server is listening at port ${port}.`));

module.exports = app;
