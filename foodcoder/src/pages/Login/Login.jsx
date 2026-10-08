import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/authService';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {setToken,loadCartData} = useContext(StoreContext);

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            const response = await loginUser({email, password});
            if(response.status === 200){
                const token = response.data.token;
                console.log(response.data);
                setToken(token);
                localStorage.setItem("token", token);
                loadCartData(token);
                toast.success('Login successful!');
                navigate('/');
            }
            else{
                toast.error('Login failed. Please check your credentials.');
            }
        }
        catch(error){
            console.error('Error during login:', error);
            toast.error('An error occurred during login. Please try again.');
        }
        
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <Link to="/" className="d-block text-center mb-3">
                    <img
                        src={assets.logo}
                        alt="Logo"
                        className="auth-logo"
                        width={64}
                        height={64}
                    />
                </Link>

                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">Log in to continue your order</p>

                <form onSubmit={onSubmitHandler} className="mt-4">

                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label auth-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control auth-input"
                            id="loginEmail"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label auth-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control auth-input"
                            id="loginPassword"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4 auth-row">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input auth-checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label auth-checkbox-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>

                        <Link to="/forgot-password" className="auth-link">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="btn auth-submit-btn w-100">
                        Log in
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link auth-link-strong">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;