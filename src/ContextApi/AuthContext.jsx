import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {


    const [isLogin, setIslogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate()

    // useEffect(() => {
    //     if (isLogin == true) {
    //         navigate("/dashboard")
    //     } else {
    //         navigate("/")
    //     }
    // }, [])


    const loginUser = async (credentials) => {
        setLoading(true)
        const res = await axios.post('http://localhost:4000/api/user/login', credentials)
        if (res.data.error == true) {
            setError(res.data.message)
        }
        else if (res.data.error == false) {
            navigate('/dashboard')
            localStorage.setItem("acces_token", JSON.stringify(res.data.acces_token))
            setIslogin(true)

        }
        setLoading(false);
        setIslogin(false);



    }

    const logout = () => {
        localStorage.removeItem("acces_token")
        navigate("/")
    }


    return <AuthContext.Provider value={{ loginUser, isLogin, setIslogin, error, setError, loading, logout, setLoading }}>
        {children}
    </AuthContext.Provider>

}