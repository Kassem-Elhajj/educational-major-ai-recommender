const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/UserMiddleware').authenticateUser;
const {recommendMajor} = require('../controllers/RecommendationController');

router.post('/getrecommendations', authenticateUser, recommendMajor);

module.exports = router;