const express = require('express');
const router = express.Router();

const {createProject, getAllProjects} = require('../controllers/productOwnerController');
// const verifyToken = require('../middleware/verifyToken');

router.post('/createProject', createProject);
router.post('/getAllProjects', getAllProjects);


module.exports = router