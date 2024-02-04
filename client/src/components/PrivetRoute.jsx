import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/Login'


const PrivetRoute = () => {
    const { userData } = useSelector((state) => state.user)
    return userData ? (
        <Outlet />
    ) :
        (
            <Navigate to={<Login />} />
        )
}

export default PrivetRoute