const express = require('express');
const router = express.Router();

const {getAllProjects, getOnlyNewProjects, addNewDeveloper, addScrumMaster, assignScrumMaster} = require('../controllers/adminController');
const {verifyToken} = require('../middlewares/verifyToken');

router.get('/projects',verifyToken, getAllProjects);
router.get('/newProjects',verifyToken, getOnlyNewProjects);
router.post('/addNewDeveloper',verifyToken, addNewDeveloper);
router.post('/addScrumMaster',verifyToken, addScrumMaster);
router.post('/assignScrumMaster',verifyToken, assignScrumMaster);

module.exports = router;