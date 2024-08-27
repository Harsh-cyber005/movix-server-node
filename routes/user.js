const express = require('express');
const {HandleUserSignUp,HandleUserSignIn,HandlePlan} = require('../controllers/user');
const router = express.Router();

router.post('/signup',HandleUserSignUp)
router.post('/signin',HandleUserSignIn)
router.post('/plan',HandlePlan)

module.exports = router;