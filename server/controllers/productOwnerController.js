const Project = require('../models/Project');
// const jwt = require('jsonwebtoken');


const createProject= async (req, res) => {
    try {
        
        const project = new Project(req.body);
        await project.save();
        res.status(200).json({
        message: 'Project saved successfully',
        project
    });
    } catch (error) {
        console.log("Error while creating project", error);
    }
}

const getAllProjects = async (req, res) => {
    try {
        const email2 = req.body.email; 
        console.log("this is coming from frontend",email2);
        const projects = await Project.find({
            owner_email:email2
        });
        res.status(200).json(projects);
    } catch (error) {
        console.log("Error while fetching projects", error);
    }

}

module.exports = {
    createProject,
    getAllProjects
};