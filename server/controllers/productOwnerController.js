const Project = require('../models/Project');


const createProject= async (req, res) => {
    try {
        const project = {...req.body, pending: req.body.features}
        new Project(req.body);
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
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        console.log("Error while fetching projects", error);
    }

}

module.exports = {
    createProject,
    getAllProjects
};