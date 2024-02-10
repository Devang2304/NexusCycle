import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ScrumMasterMain from './ScrumMasterMain';
import { Link } from 'react-router-dom';

export default function ScrumMasterDashboard(){
  // Sample projects data (replace this with your actual data)
  const projects = [
    { id: 1, name: 'Project 1', status: 'Pending' },
    { id: 2, name: 'Project 2', status: 'Confirmed' },
    { id: 3, name: 'Project 4', status: 'Pending' },
    { id: 4, name: 'Project 3', status: 'Confirmed' },
    { id: 5, name: 'Project 5', status: 'Pending' },
    { id: 6, name: 'Project 6', status: 'Confirmed' },
    // Add more projects as needed
  ];

  const pendingProjects = projects.filter((project) => project.status === 'Pending');
  const confirmedProjects = projects.filter((project) => project.status === 'Confirmed');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Pending Confirmation Projects</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-sky-600 ">
                <TableCell className="text-white">Sr No.</TableCell>
                <TableCell className="text-white">Project Name</TableCell>
                <TableCell className="text-white">Project Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingProjects.map((project, index) => (
                <TableRow key={project.id} className={index % 2 === 0 ? 'bg-gray-100 hover:bg-sky-100' : 'bg-gray-200 hover:bg-sky-100'}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {/* Use Link to create a hyperlink to the project page */}
                    <Link to={`/project/${project.id}`} className="hover:text-400">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Confirmed Projects</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-sky-600 ">
              <TableCell className="text-white ">Sr No.</TableCell>
                <TableCell className="text-white ">Project Name</TableCell>
                <TableCell className="text-white ">Project Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {confirmedProjects.map((project, index) => (
                <TableRow key={project.id} className={index % 2 === 0 ? 'bg-gray-100 hover:bg-sky-100' : 'bg-gray-200 hover:bg-sky-100'}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {/* Use Link to create a hyperlink to the project page */}
                    <Link to={`/project/${project.id}`} className="hover:text-400">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};



