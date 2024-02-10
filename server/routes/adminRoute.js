const express = require('express');
const router = express.Router();

const {getAllProjects, getOnlyNewProjects, addNewDeveloper, addScrumMaster, assignScrumMaster} = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

router.post('/projects',verifyToken, getAllProjects);
router.post('/newProjects',verifyToken, getOnlyNewProjects);
router.post('/addNewDeveloper',verifyToken, addNewDeveloper);
router.post('/addScrumMaster',verifyToken, addScrumMaster);
router.post('/assignScrumMaster',verifyToken, assignScrumMaster);

module.exports = router;