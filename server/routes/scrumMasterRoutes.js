const express = require('express');
const router = express.Router();

const { getAllProjects, assignProjects } = require('../controllers/scrumMasterController');

router.get('/getAllProjects', getAllProjects);
router.post('/assignProjects', assignProjects);


module.exports = router;
