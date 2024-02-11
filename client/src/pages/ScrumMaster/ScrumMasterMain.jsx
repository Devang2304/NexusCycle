import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ScrumMaster/Sidebar'
import ScrumMasterDashboard from './ScrumMasterDashboard'
import ProjectList from '../../components/ScrumMaster/ProjectList'
import DailyScrum from '../../components/ScrumMaster/DailyScrum'
import VideoCall from './VideoCall'

export default function ScrumMasterMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ScrumMasterDashboard />} />
                    {/* param route with project id to give details of the project              <<<<-------------EDIT HERE*/}
                    <Route path='/xyz' element={<ProjectList />} />
                    
                <Route path='/video-call/' element={<DailyScrum/>}/>
                <Route path='/video-call/:roomID' element={<VideoCall />} />
                </Routes>
            </Sidebar>
        </>
    )
}
