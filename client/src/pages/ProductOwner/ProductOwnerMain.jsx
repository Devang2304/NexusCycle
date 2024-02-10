import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/ProductOwner/Sidebar'
import ProductOwnerDashboard from './ProductOwnerDashboard'

export default function ProductOwnerMain() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<ProductOwnerDashboard />} />
                </Routes>
            </Sidebar>
        </>
    )
}
