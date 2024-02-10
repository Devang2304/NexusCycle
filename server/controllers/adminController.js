const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Developer = require('../models/Developer');
const ScrumMaster = require('../models/ScrumMaster');


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json("projects fetched successfully",projects);
    } catch (error) {
        res.status(404).json("Error while getting all projects",error);
    }
}

const getOnlyNewProjects = async (req, res) => {
    try {
        const projects = await Project.find({ scrumMaster: null });
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json("Error while getting all projects", error);
    }
}

const addNewDeveloper = async (req, res) => {
    const data = req.body;
    try {
        const checkIfExist=await Developer.findOne({email:data.email});
        if(checkIfExist){
            res.status(400).json("Developer already exist");
        }else{
            const newDeveloper = new Developer(data);
            const developer = await newDeveloper.save();
            res.status(200).json(developer);
        }
    } catch (error) {
        res.status(404).json("Error while adding new developer", error);
    }
}

const addScrumMaster = async (req, res) => {
    const data = req.body;
    try {
        const checkIfExist=await ScrumMaster.findOne({email:data.email});
        if(checkIfExist){
            res.status(400).json("Scrum Master already exist");
        }else{
            const newScrumMaster = new ScrumMaster(data);
            const scrumMaster = await newScrumMaster.save();
            res.status(200).json(scrumMaster);
        }
    } catch (error) {
        res.status(404).json("Error while adding new scrum master", error);
    }
}

const assignScrumMaster = async (req, res) => {
    const data = req.body;
    try {
        const project = await Project.findById(data.projectId);
        project.scrumMaster = data.scrumMaster;
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json("Error while assigning scrum master", error);
    }
}
    
module.exports = {
    getAllProjects,
    getOnlyNewProjects,
    addNewDeveloper,
    addScrumMaster,
    assignScrumMaster
};