const express = require('express');
const router = express.Router();
const verifyToken= require('../middleware/verifyToken');

const { getAllProjects, assignProjects } = require('../controllers/scrumMasterController');

router.get('/getAllProjects', verifyToken, getAllProjects);
router.post('/assignProjects', verifyToken, assignProjects);


module.exports = router;
