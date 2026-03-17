import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './index'
import AllUsers from '../AllUsers'
import Blogs from './Blogs'
import DietPlans from '../../../Frontend/Diet'

const Admin = () => {
    return (
        <>
            <Routes>
                <Route path="/blogs-new" element={<Blogs />} />
                <Route path="/blogs-new/:id" element={<Blogs />} />

                <Route path="/diet-new" element={<DietPlans />} />
            </Routes>
        </>
    )
}

export default Admin