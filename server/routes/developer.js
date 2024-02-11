const express = require('express');
const  verifyToken  = require('../middleware/verifyToken');
const router = express.Router();

const { getProjectsDeveloper } = require('../controllers/developerAuth');

router.post('/developerAuth', verifyToken, getProjectsDeveloper);

module.exports = router;