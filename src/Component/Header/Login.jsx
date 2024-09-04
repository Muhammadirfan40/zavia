import React, { useContext, useEffect, useState } from 'react';
import "./Login.css"

import { AuthContext, } from '../../ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); 

    const navigate = useNavigate()
 

    // const navigate = useNavigate();

    const ctx = useContext(AuthContext)

    const handleLogin = () => {

        setUser({
            email: email,
            password: password
        })
        ctx.loginUser(user)

    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("acces_token"));
        
        if (token) {
            navigate("/dashboard")
        }

    })
    

 
        return (
            <div className="mainlogin">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2" />
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-key">
                                <i className="fa fa-key" aria-hidden="true" />
                            </div>
                            <div className="col-lg-12 login-title">ADMIN PANEL</div>
                            <div className="col-lg-12 login-form">
                                <form onSubmit={(e) => { e.preventDefault() }}>
                                    <div className="form-group">
                                        <label className="form-control-label text-info fs-6">EMAIL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={email}
                                            required
                                            placeholder='Gmail'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label text-info fs-6">PASSWORD</label>
                                        <input
                                            type="password"
                                            required
                                            placeholder='Password'
                                            className="form-control "
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && <div className="error-message">{error}</div>}
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                            {/* Error Message */}
                                        </div>
                                        <div className="col-lg-12 login-btm login-button text-center">
                                            <button onClick={() => { handleLogin() }} type="submit" className="btn btn-outline-primary">
                                                LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3 col-md-2" />
                        </div>
                    </div>
                </div>
            </div>
        );

    
};

export default Login;
