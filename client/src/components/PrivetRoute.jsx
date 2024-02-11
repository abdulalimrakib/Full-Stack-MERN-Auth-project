import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'


const PrivetRoute = () => {
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)
    return userData ? (
        <Outlet />
    ) :
        (
            navigate("/Login")
        )
}

export default PrivetRoute