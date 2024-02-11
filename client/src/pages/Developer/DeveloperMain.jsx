import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../../components/Developer/Sidebar'
import DeveloperDashboard from './DeveloperDashboard'
import AllProjects from './AllProjects'
import CurrProject from './CurrProject'
import VideoCall from './VideoCall'
import DailyScrum from '../../components/Developer/DailyScrum'

export default function DeveloperMain() {
  return (
    <>
        <Sidebar>
            <Routes>
                <Route path='/' element={<AllProjects />} />
                <Route path='/allprojects' element={<AllProjects />} />
                <Route path='/currproject' element={<CurrProject />} />
                <Route path='/video-call/' element={<DailyScrum/>}/>
                <Route path='/video-call/:roomID' element={<VideoCall />} />
            </Routes>
        </Sidebar>
    </>
  )
}
