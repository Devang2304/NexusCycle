import React, {useState, useEffect} from 'react';
import '../../css_files/allprojectstyles.css';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import CurrProject from './CurrProject';
const axios = require('axios');

const AllProjects = () => {
    const [details, setDetails] = useState([]);
    const handleProjectClick = (index) => {
        // Set a flag to trigger rendering of ProjectDetails component
        setDetails(projects[index]);
        setShowProjectDetails(true);
      };
      const [showProjectDetails, setShowProjectDetails] = useState(false);
    // const projects = [
    //     { projectName: 'Project 1', projectStatus: 'In Progress' },
    //     { projectName: 'Project 2', projectStatus: 'Completed' },
    //     { projectName: 'Project 3', projectStatus: 'Pending' }
    // ];

    const [projects, setProjects] = useState([]);
    const {token, user} = useContext(UserContext);

    const fetchAllProjects = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/developer/developerAuth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        setProjects(data);
    }

    useEffect(()=>{
        console.log(projects)
    },[projects])
    useEffect(()=>{
        console.log(details)
    },[details])



    useEffect(() => {
        fetchAllProjects();
    }, [])

    return (
        <>
        <h1 style={{ fontSize: '24px' }}>Assigned Projects</h1>

        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Project Name</th>
                        <th>Project Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td onClick={()=>handleProjectClick(index)}>{project.name}</td>
                            <td>{project.status}</td>
                        </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
        {showProjectDetails && <CurrProject details={details} />}
        </>
    );
};

export default AllProjects;
