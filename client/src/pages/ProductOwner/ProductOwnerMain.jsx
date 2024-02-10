import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ProductOwner/Sidebar'
import ProductOwnerDashboard from './ProductOwnerDashboard'
import ProjectDetails from '../../components/ProductOwner/ProjectDetails'

export default function ProductOwnerMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ProductOwnerDashboard />} />
                    <Route path='/project' element={<ProjectDetails />} />
                    
                </Routes>
            </Sidebar>
        </>
    )
}
