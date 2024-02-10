import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductModal from '../../components/ProductOwner/ProductModal'
import { getAllProjectsByOwner } from '../../api/api';

export default function ProductOwnerDashboard() {
  // Sample projects data (replace this with your actual data)
  const [projectData, setProjectData] = useState([]);
  const [filter, setFilter] = useState('All'); // 'All', 'Completed', 'In Progress'

  useEffect(() => {

    const fetchData = async () => {
      try {
        const projectData = await getAllProjectsByOwner();
        setProjectData(projectData.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = filter === 'All' ? projectData : projectData.filter((project) => project.status === filter);

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateProject = (formData) => {
    // Handle project creation logic here
    console.log(formData);
    handleCloseModal();
  };

  
  return (
    <>
    
    <div className="p-8">
    <div className="mb-8">
    <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Create Project
      </Button>
      <ProductModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateProject}
      />
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
            { projectData && (
              <TableBody>
              {filteredProjects.map((projectData, index) => (
                <TableRow
                  key={projectData.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Alternating row colors
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{projectData.name}</TableCell>
                  <TableCell>{projectData.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            )
            }
          </Table>
        </TableContainer>
      </div>
    </div>
    </>
  );
};


