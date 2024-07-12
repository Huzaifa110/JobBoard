const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

const authController = require('../controllers/authController'); 

router.post('/signup', authController.signup); 

router.get('/signup-confirmation', (req, res) => {
    res.send('Signup was successful!');
});

module.exports = router;