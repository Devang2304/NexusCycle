import React, { useEffect, useState,useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../context/UserContext';

export default function AllProjects() {
    const {token,user} = useContext(UserContext);
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
    //     admin_email: "x@x.x", owner_email: "x@x.x",
    //     status: "Approved"
    // }]);

    const [rows, setRows] = useState([]);

    const fetchAllProjects = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/projects`, {
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

    useEffect(() => {
        fetchAllProjects();
    }, [])

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'features', headerName: 'Features', width: 150 },
        { field: 'scrumMaster', headerName: 'Scrum Master', width: 150 },
        { field: 'developers', headerName: 'Developers', width: 150 },
        { field: 'admin_email', headerName: 'Admin Email', width: 150 },
        { field: 'owner_email', headerName: 'Owner Email', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    return (<>
        <h1 className='text-3xl mt-10 mb-3'>All Projects</h1>
        {!loading&&<div style={{ height: 400, width: '100%' }}>
            <DataGrid
                sx={{ maxWidth: '100%' }}
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>}
    </>
    )
}
