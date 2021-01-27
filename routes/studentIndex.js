//Routes Avalible to Students

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('studentIndex', {page: 'Home'});
});

router.get('/student/profile', (req, res, next) => {
  res.render('studentIndex', {page: 'My Profile'});
});

module.exports = router;
