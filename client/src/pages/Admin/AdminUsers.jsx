import React, { useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import UsersTable from '../../components/Admin/UsersTable';

export default function AdminUsers() {
  const { token, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'developer' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/addAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, admin_email: user.email, company: user.company }),
      });
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully');
        handleClose();
      } else {
        // Handle error
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Account
      </Button>
      <UsersTable />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add details to create a new account
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="standard"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <RadioGroup
              aria-label="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <FormControlLabel value="developer" control={<Radio />} label="Developer" />
              <FormControlLabel value="scrummaster" control={<Radio />} label="Scrum Master" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
