import React, { useState } from 'react';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { createProject } from '../../api/api';
import { toast } from "react-toastify";
import Analytics from '../Analytics';

const ProductModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    admin_email: '',
    owner_email: '',
    features: [], 
  });

  const handleChange = (e) => {
    if (e.target.name === 'features') {
      setFormData({ ...formData, [e.target.name]: e.target.value.split(',') });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const data = {
      name: formData.name,
      admin_email: formData.admin_email,
      owner_email: formData.owner_email,
      features: formData.features,
    };
    try {
      const res=await createProject(data);
      toast.success("created project successfully");

      if(res.status===404){
        toast.error("Error in creating project");
      }
    } catch (error) {
      console.log("Error while creating project", error);
    }
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
        <Analytics />
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
          <TextField
            label="Features (comma-separated)"
            name="features"
            value={formData.features.join(',')}
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
