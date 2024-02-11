import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ScrumMaster/Sidebar'
import ScrumMasterDashboard from './ScrumMasterDashboard'
import ProjectList from '../../components/ScrumMaster/ProjectList'

export default function ScrumMasterMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ScrumMasterDashboard />} />
                    {/* param route with project id to give details of the project              <<<<-------------EDIT HERE*/}
                    <Route path='/xyz' element={<ProjectList />} />
                </Routes>
            </Sidebar>
        </>
    )
}
