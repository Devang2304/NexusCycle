import axios from 'axios';

const URL =process.env.REACT_APP_BACKEND_URL;

export const getAllProjects = (data) => {
    try {
        return  axios.get(`${URL}/admin/projects`, data);
    } catch (error) {
        console.log("Error while fetching projects",error);
    }
}

export const getOnlyNewProjects = (data) => {
    try {
        return  axios.get(`${URL}/admin/newProjects`, data);
    }catch (error) {
        console.log("Error while fetching new projects",error);
    }
}

export const addNewDeveloper = (data) => {
    try {
        return  axios.post(`${URL}/admin/addNewDeveloper`, data);
    }catch (error) {
        console.log("Error while adding new developer", error);
    }
}

export const addScrumMaster = (data) => {
    try {
        return  axios.post(`${URL}/admin/addScrumMaster`, data);
    }catch (error) {
        console.log("Error while adding scrummaster", error);
    }
}

export const assignScrumMaster = (data) => {
    try {
        return  axios.post(`${URL}/admin/assignScrumMaster`, data);
    }catch (error) {
        console.log("Error while assigning scrummaster", error);
    }
}

export const getAllProjectsByScrumMaster = (data) => {
    try {
        return axios.get(`${URL}/scrumMaster/getAllProjects`, data);
    }catch (error) {
        console.log("Error while fetching getAllProjectsByScrumMaster", error);
    }
}

export const assignProjects = (data) => {
    try {
        return axios.post(`${URL}/scrumMaster/assignProjects`, data);
    } catch (error) {
        console.log("Error while assigning projects by scrumMaster", error);
    }
}

export const createProject = (data) => {
    try {
        return axios.post(`${URL}/productOwner/createProject`, data);
    } catch (error) {
        console.log("Error while creating project", error);
    }
}

export const getAllProjectsByOwner = (data) => {
    try {
        return axios.get(`${URL}/productOwner/getAllProjects`, data);
    } catch (error) {
        console.log("Error while fetching projects", error);
    }
}