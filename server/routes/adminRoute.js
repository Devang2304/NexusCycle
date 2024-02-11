const express = require('express');
const router = express.Router();

const {getAllProjects, getOnlyNewProjects, addNewDeveloper, addScrumMaster, assignScrumMaster,addAccount,getAllAccount,rejectProject} = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');

router.post('/projects',verifyToken, getAllProjects);
router.post('/newProjects',verifyToken, getOnlyNewProjects);
router.post('/addNewDeveloper',verifyToken, addNewDeveloper);
router.post('/addScrumMaster',verifyToken, addScrumMaster);
router.post('/assignScrumMaster',verifyToken, assignScrumMaster);
router.post('/addAccount',verifyToken, addAccount);
router.post('/getAllAccount',verifyToken, getAllAccount);
router.post('/rejectProject',verifyToken, rejectProject);

module.exports = router;