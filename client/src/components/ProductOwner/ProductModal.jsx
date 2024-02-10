import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { createProject } from '../../api/api';


const ProductModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    admin_email: '',
    owner_email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async () => {
    // Add any additional validation logic here
    const data={
      name:formData.name,
      admin_email:formData.admin_email,
      owner_email:formData.owner_email,
    }
    await createProject(data);
    console.log("created project successfully")
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Project Details
        </Typography>
        <form>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Owner Email"
            name="owner_email"
            value={formData.owner_email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Admin Email"
            name="admin_email"
            value={formData.admin_email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductModal;
