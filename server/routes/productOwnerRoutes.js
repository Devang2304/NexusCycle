const express = require('express');
const router = express.Router();

const {createProject, getAllProjects} = require('../controllers/productOwnerController');
const {verifyToken} = require('../middlewares/verifyToken');

router.post('/productOwner/createProject',verifyToken, createProject);
router.get('/productOwner/getAllProjects',verifyToken, getAllProjects);


module.exports = router