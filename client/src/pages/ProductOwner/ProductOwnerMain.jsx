import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ProductOwner/Sidebar'
import ProductOwnerDashboard from './ProductOwnerDashboard'
import ProjectDetails from '../../components/ProductOwner/ProjectDetails'
import VideoCall from './VideoCall'
import DailyScrum from '../../components/ProductOwner/DailyScrum'

export default function ProductOwnerMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ProductOwnerDashboard />} />
                    <Route path='/project' element={<ProjectDetails />} />
                <Route path='/video-call/' element={<DailyScrum/>}/>
                <Route path='/video-call/:roomID' element={<VideoCall />} />
                </Routes>
            </Sidebar>
        </>
    )
}
