const User = require('../models/User');
const Admin = require('../models/Admin');
const ScrumMaster = require('../models/ScrumMaster');
const Developer = require('../models/Developer');
const ProductOwner = require('../models/ProductOwner'); 
const Project = require('../models/Project');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const e = require('express');

const getProjectsDeveloper = async (req, res) => {
    try {
        const dev = await Developer.findOne({email : req.body.email});
        let allprojects = dev.project
        if(allprojects.length === 0){
            return res.status(200).json("No projects found");
        }
        let projectArray = []
        for (let i = 0; i < allprojects.length; i++) {
            const project = allprojects[i].project
            const projectDetails = await Project.findOne({ _id: project})
            projectArray.push(projectDetails);
        }
        res.status(200).json(projectArray);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProjectsDeveloper
};