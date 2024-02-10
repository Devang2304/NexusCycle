import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function NewProjects() {
    const { token ,user} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    // const [rows, setRows] = useState([{
    //     _id: "1",
    //     name: "Project 1",
    //     description: "This is project 1",
    //     features: ["Feature 1", "Feature 2"],
    //     scrumMaster: "Scrum Master 1",
    //     developers: ["Developer 1", "Developer 2"],
    //     admin_email: "s@s.s",
    //     owner_email: "x@x.x",
    //     status: "Approved"
    // },
    // {
    //     _id: "2",
    //     name: "Project 2",
    //     description: "This is project 2",
    //     features: ["Feature 1", "Feature 2"],
    //     scrumMaster: "Scrum Master 2",
    //     developers: ["Developer 1", "Developer 2"],
    //     admin_email: "x@x.x", 
    //     owner_email: "x@x.x",
    //     status: "Approved"
    // }]);

    const [rows, setRows] = useState([]);

    const fetchNewProjects = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/newProjects`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user.email)
        })
        const data = await response.json();
        setRows(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchNewProjects();
    },[])

    const [open, setOpen] = React.useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const handleClickOpen = (id) => {
        setActiveProject(id);
        setOpen(true);
        console.log("id=",id);
        //write a function to assign the project to the scrum master and change status
    };
    const handleClose = () => {
        setOpen(false);
        setActiveProject(null);
    };

    const [selectedProject, setSelectedProject] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleRejectProject = (id) => {
        // Handle rejection logic here, you can update the state or perform any other action
        console.log("Project rejected:", id);
    };

    const handleProjectClick = (id) => {
        const project = rows.find(row => row._id === id);
        setSelectedProject(project);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const assignScrumMaster = (projectId, email) => {
        console.log("Assigning scrum master to project:", projectId, "with email:", email);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 150, renderCell: (params) => <button onClick={() => handleProjectClick(params.row._id)}>{params.value}</button> },
        { field: 'owner_email', headerName: 'Owner Email', width: 150 },
        {
            field: 'reject',
            headerName: 'Reject',
            width: 120,
            renderCell: (params) => (
                <button onClick={() => handleRejectProject(params.row._id)}>Reject</button>
            ),
        },
        {
            field: 'assign',
            headerName: 'Assign',
            width: 120,
            renderCell: (params) => (
                <button onClick={()=>handleClickOpen(params.row._id)}>Assign</button>
            ),
        }
    ];

    return (
        <>
            <h1 className='text-5xl mt-10 mb-3'>New Projects</h1>
            {!loading&&<div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{ maxWidth: '100%' }}
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={5}
                />
            </div>}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Project Details
                    </Typography>
                    {selectedProject && (
                        <div>
                            <p>Name: {selectedProject.name}</p>
                            <p>Owner Email: {selectedProject.owner_email}</p>
                            <p>Description: {selectedProject.description}</p>
                            <p>Features: {selectedProject.features.join(", ")}</p>
                        </div>
                    )}
                </Box>
            </Modal>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        assignScrumMaster(activeProject, email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Assign Scrum Master</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the email of the scrum master you want to assign to this project.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Assign</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
