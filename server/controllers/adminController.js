const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Developer = require('../models/Developer');
const ScrumMaster = require('../models/ScrumMaster');
const bcrypt = require('bcrypt');

const getAllProjects = async (req, res) => {
    try {
        const email = req.body.email;
        const projects = await Project.find({
            admin_email: email,
            status: { $ne: "Pending" }
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json("Error while getting all projects", error);
    }
}

const getOnlyNewProjects = async (req, res) => {
    try {
        const email = req.body.email;
        const projects = await Project.find({ admin_email: email, status: "Pending" });
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json("Error while getting all projects", error);
    }
}

const addAccount = async (req, res) => {
    const { role } = req.body;
    if (role === "developer") {
        try {
            const checkIfExist = await Developer.findOne({ email: req.body.email });
            if (checkIfExist) {
                res.status(400).json("Developer already exist");
            } else {
                const p='password'
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(p, salt);
                const newDeveloper = new Developer({ ...req.body, password: hashedPassword });
                const developer = await newDeveloper.save();
                res.status(200).json(developer);
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Error while adding new developer", error });
        }
    } else {
        try {
            const checkIfExist = await ScrumMaster.findOne({ email: req.body.email });
            if (checkIfExist) {
                res.status(400).json("Scrum Master already exist");
            } else {
                const p='password'
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(p, salt);
                const newScrumMaster = new ScrumMaster({ ...req.body, password: hashedPassword });
                const scrumMaster = await newScrumMaster.save();
                res.status(200).json(scrumMaster);
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Error while adding new developer", error });
        }
    
    }
}

const addNewDeveloper = async (req, res) => {
    const data = req.body;
    try {
        const checkIfExist = await Developer.findOne({ email: data.email });
        if (checkIfExist) {
            res.status(400).json("Developer already exist");
        } else {
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
        const checkIfExist = await ScrumMaster.findOne({ email: data.email });
        if (checkIfExist) {
            res.status(400).json("Scrum Master already exist");
        } else {
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

const getAllAccount = async (req, res) => {
    try {
        const developers = await Developer.find({ company: req.body.company });
        const scrumMasters = await ScrumMaster.find({ company: req.body.company });
        res.status(200).json({ developers, scrumMasters });
    }
    catch (error) {
        res.status(404).json("Error while getting all accounts", error);
    }
}

module.exports = {
    getAllProjects,
    getOnlyNewProjects,
    addNewDeveloper,
    addScrumMaster,
    assignScrumMaster,
    addAccount,
    getAllAccount
};