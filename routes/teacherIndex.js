//Routes Avalible to Teachers

const express = require('express');
const router = express.Router();
var posts = [{Name: "Jeremy Wolfe", Post: "This is a test post"}, {Name: "Bob Smith", Post: "Wow! It Works!"}, {Name:"Tommy Baloon", Post: "Helloooooo out there"}, {Name: 'Sam', Post: "Applejuice"}];

router.get('/', (req, res, next) => {
  res.render('teacherIndex', {page: 'Home', 'feed' : posts});
});

module.exports = router;
