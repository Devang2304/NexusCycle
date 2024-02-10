const express = require('express');
const router = express.Router();

const {getAllProjects, getOnlyNewProjects, addNewDeveloper, addScrumMaster, assignScrumMaster} = require('../controllers/adminController');
const {verifyToken} = require('../middlewares/verifyToken');

router.get('/admin/projects',verifyToken, getAllProjects);
router.get('/admin/newProjects',verifyToken, getOnlyNewProjects);
router.post('/admin/addNewDeveloper',verifyToken, addNewDeveloper);
router.post('/admin/addScrumMaster',verifyToken, addScrumMaster);
router.post('/admin/assignScrumMaster',verifyToken, assignScrumMaster);

module.exports = router;