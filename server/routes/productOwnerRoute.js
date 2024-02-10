const express = require('express');
const router = express.Router();

const {createProject, getAllProjects} = require('../controllers/productOwnerController');
const verifyToken = require('../middleware/verifyToken');

router.post('/createProject',verifyToken, createProject);
router.get('/getAllProjects',verifyToken, getAllProjects);


module.exports = router