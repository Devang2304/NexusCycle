const User = require('../models/User');
const Admin = require('../models/Admin');
const ScrumMaster = require('../models/ScrumMaster');
const Developer = require('../models/Developer');
const ProductOwner = require('../models/ProductOwner'); 
const Project = require('../models/Project');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("recieved=",req.body)
    if(req.body.role === "admin"){
        try {
            const admin = await Admin.findOne({ email: req.body.email });
            if(admin){
                return res.status(400).json("Email already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newAdmin = new Admin({
                company: req.body.company,
                name : req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                profilePicture: req.body.profilePicture
            });
            const admin1 = await newAdmin.save();
            res.status(200).json(admin1);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    else{
        try {
            const customer = await ProductOwner.findOne({ email: req.body.email });
            if(customer){
                return res.status(400).json("Email already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newCustomer = new ProductOwner({
                name : req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                profilePicture: req.body.profilePicture
            });
            const c = await newCustomer.save();
            res.status(200).json(c);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
    // try {
    //     const admin = await Admin.findOne({ email: req.body.email });
    //     if(admin){
    //         return res.status(400).json("Email already exists");
    //     }
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //     const newAdmin = new Admin({
    //         company: req.body.company,
    //         email: req.body.email,
    //         password: hashedPassword,
    //         phone: req.body.phone,
    //         profilePicture: req.body.profilePicture,
    //     });
    //     const admin1 = await newAdmin.save();
    //     res.status(200).json(admin1);
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).json(err);
    // }
}

const login = async (req, res) => {
    console.log("recieved=",req.body)
    try {
        if(req.body.role === "admin"){
            const admin = await Admin.findOne({ email: req.body.email });
            if(!admin){
                return res.status(404).json("admin not found");
            }
            const validPassword = await bcrypt.compare(req.body.password, admin.password);
            if(!validPassword){
                return res.status(400).json("wrong password");
            }
            const { password, ...others } = admin._doc;
            const accessToken = jwt.sign({ id: admin._id, email: admin.email }, process.env.SECRET_KEY, { expiresIn: "5d" });
            res.status(200).json({ ...others, accessToken });
        }
        else if(req.body.role === "productowner"){
            const customer = await ProductOwner.findOne({ email: req.body.email });
            if(!customer){
                return res.status(404).json("customer not found");
            }
            const validPassword = await bcrypt.compare(req.body.password, customer.password);
            if(!validPassword){
                return res.status(400).json("wrong password");
            }
            const { password, ...others } = customer._doc;
            const accessToken = jwt.sign({ id: customer._id, email: customer.email }, process.env.SECRET_KEY, { expiresIn: "5d" });
            res.status(200).json({ ...others, accessToken });
        }
        else if(req.body.role==="developer"){
            const developer = await Developer.findOne({ email: req.body.email });
            if(!developer){
                return res.status(404).json("developer not found");
            }
            const validPassword = await bcrypt.compare(req.body.password, developer.password);
            if(!validPassword){
                return res.status(400).json("wrong password");
            }
            const { password, ...others } = developer._doc;
            const accessToken = jwt.sign({ id: developer._id, email: developer.email }, process.env.SECRET_KEY, { expiresIn: "5d" });
            res.status(200).json({ ...others, accessToken });
        }
        else if(req.body.role==="scrummaster"){
            const scrumMaster = await ScrumMaster.findOne({ email: req.body.email });
            if(!scrumMaster){
                return res.status(404).json("scrum master not found");
            }
            const validPassword = await bcrypt.compare(req.body.password, scrumMaster.password);
            if(!validPassword){
                return res.status(400).json("wrong password");
            }
            const { password, ...others } = scrumMaster._doc;
            const accessToken = jwt.sign({ id: scrumMaster._id, email: scrumMaster.email }, process.env.SECRET_KEY, { expiresIn: "5d" });
            res.status(200).json({ ...others, accessToken });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const verifyToken = (req, res, next) => {
    try{
        let token=req.header("Authorization")

        if(!token) return res.status(401).json("you are not authenticated")

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft()
        }

        const verified=jwt.verify(token,process.env.SECRET_KEY)
        req.user=verified
        res.status(200).json(verified)
    } catch(err){
        console.log("authController.js verifyToken error",err)
        res.status(500).json(err);
    }
}

module.exports = {
    register,
    login,
    verifyToken
};