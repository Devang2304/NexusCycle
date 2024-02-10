import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import AdminStakeholder from './AdminStakeholder'
import AdminUsers from './AdminUsers'
import Sidebar from '../../components/Admin/Sidebar'

export default function AdminMain() {
    return (<>
        <Sidebar>
            <Routes>
                <Route path='/' element={<AdminDashboard />} />
                <Route path='/allusers' element={<AdminUsers />} />
                {/* <Route path='/allstakeholder' element={<AdminStakeholder />} /> */}
            </Routes>
        </Sidebar>
    </>
    )
}
