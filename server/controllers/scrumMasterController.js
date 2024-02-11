const Project = require('../models/Project');


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
}

const assignProjects = async (req, res) => {
    try {
        const { projectId, userId } = req.body;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json("Project not found");
        }else{
            project.developers.push({ type: userId, default: null });
            await project.save();
            res.status(200).json("Project assigned successfully");
        }
    } catch (error) {
        console.log("Error while assigning project", error);
        res.status(500).json("Internal Server Error");
    }
};



module.exports = {
    getAllProjects,
    assignProjects
};