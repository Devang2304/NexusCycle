import React from 'react';
import '../../css_files/allprojectstyles.css';
import Divider from '@mui/material/Divider';

const AllProjects = () => {
    const projects = [
        { projectName: 'Project 1', projectStatus: 'In Progress' },
        { projectName: 'Project 2', projectStatus: 'Completed' },
        { projectName: 'Project 3', projectStatus: 'Pending' }
    ];

    return (
        <>
        <h1 style={{ fontSize: '24px' }}>New Projects</h1>

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
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{project.projectName}</td>
                            <td>{project.projectStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Divider style={{marginTop: "30px", marginBottom: "30px"}}/>

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
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{project.projectName}</td>
                            <td>{project.projectStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default AllProjects;
