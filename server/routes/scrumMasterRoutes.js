const express = require('express');
const router = express.Router();

const { getAllProjects, assignProjects } = require('../controllers/scrumMasterController');

router.get('/scrummaster/getAllProjects', getAllProjects);
router.post('/', assignProjects);


module.exports = router;
