import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ProductOwnerDashboard() {
  // Sample projects data (replace this with your actual data)
  
  const [filter, setFilter] = useState('All'); // 'All', 'Completed', 'In Progress'
  const projects = [
    { id: 1, name: 'Project 1', status: 'In Progress' },
    { id: 2, name: 'Project 2', status: 'Completed' },
    { id: 3, name: 'Project 3', status: 'In Progress' },
    // Add more projects as needed
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.status === filter);


  return (
    <>
    
    <div className="p-8">
    <div className="mb-8">
        <Button variant="contained" color="primary" onClick={() => console.log('Create New Project')}>
          Create New Project
        </Button>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Previous Projects</h2>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">Filter Projects:</label>
          <select
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project, index) => (
                <TableRow
                  key={project.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Alternating row colors
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </>
  );
};


