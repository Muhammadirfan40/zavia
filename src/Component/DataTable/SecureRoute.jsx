import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SecureRoute = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("acces_token"));
        
        if (!token) {
            navigate("/")
        }

    })


    return (
        <>
            {children}
        </>
    )
}

export default SecureRoute