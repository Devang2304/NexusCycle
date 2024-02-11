const express = require('express');
const router = express.Router();
const verifyToken= require('../middleware/verifyToken');

const { getAllProjects, assignProjects } = require('../controllers/scrumMasterController');

router.get('/getAllProjects', getAllProjects);
router.post('/assignProjects', assignProjects);


module.exports = router;
