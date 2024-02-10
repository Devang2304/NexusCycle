import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ScrumMaster/Sidebar'
import ScrumMasterDashboard from './ScrumMasterDashboard'

export default function ScrumMasterMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ScrumMasterDashboard />} />
                </Routes>
            </Sidebar>
        </>
    )
}
