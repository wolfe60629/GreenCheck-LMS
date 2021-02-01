//Routes Avalible to Students

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', {page: 'Login'});
});

module.exports = router;
