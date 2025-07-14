const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/UserMiddleware').authenticateUser;

const resultsController = require('../controllers/ResultsController');

router.get('/', authenticateUser, resultsController.getAllResults);
router.get('/:id', authenticateUser, resultsController.getResultById);

module.exports = router;