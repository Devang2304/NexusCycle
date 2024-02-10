import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../../components/Developer/Sidebar'
import DeveloperDashboard from './DeveloperDashboard'

export default function DeveloperMain() {
  return (
    <>
        <Sidebar>
            <Routes>
                <Route path='/' element={<DeveloperDashboard />} />
            </Routes>
        </Sidebar>
    </>
  )
}
