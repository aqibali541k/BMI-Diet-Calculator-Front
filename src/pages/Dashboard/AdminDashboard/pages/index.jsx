import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './index'
import AllUsers from '../AllUsers'
import Blogs from './Blogs'
import Diet from './Diet'

const Admin = () => {
    return (
        <>
            <Routes>
                <Route path="/blogs-new" element={<Blogs />} />
                <Route path="/diet-new" element={<Diet />} />
            </Routes>
        </>
    )
}

export default Admin