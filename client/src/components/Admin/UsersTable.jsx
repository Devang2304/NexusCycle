import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';

export default function UsersTable() {
    const { token, user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const fetchAllUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getAllAccount`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: user.email, company: user.company }),
        });
        const data = await response.json();
        console.log(data);
        const combinedRows = data.developers.concat(data.scrumMasters);
        setRows(combinedRows);
        setLoading(false);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

  return (
    <>
        <div style={{ height: 400, width: '100%',marginTop:'10px' }}>
            <DataGrid
            getRowId={(row) => row._id}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            loading={loading}
            />
        </div>
    </>
  )
}
