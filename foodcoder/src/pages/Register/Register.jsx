import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { assets } from '../../assets/assets';
import { registerUser } from '../../service/authService';
import { toast } from 'react-toastify';

const Register = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value =
            e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

   const requestData = {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password
};

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        setError('');

        try {
            const response = await registerUser(requestData);

            if (response.status === 201) {
                toast.success('Registration successful! Please log in.');
                navigate('/login');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error(
                'An error occurred during registration. Please try again.'
            );
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

                <h2 className="auth-title">Create your account</h2>
                <p className="auth-subtitle">Sign up to start ordering</p>

                <form onSubmit={onSubmitHandler} className="mt-4">

                    <div className="row g-3 mb-3">
                        <div className="col-sm-6">
                            <label
                                htmlFor="firstName"
                                className="form-label auth-label"
                            >
                                First name
                            </label>

                            <input
                                type="text"
                                className="form-control auth-input"
                                id="firstName"
                                name="firstName"
                                required
                                value={data.firstName}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="col-sm-6">
                            <label
                                htmlFor="lastName"
                                className="form-label auth-label"
                            >
                                Last name
                            </label>

                            <input
                                type="text"
                                className="form-control auth-input"
                                id="lastName"
                                name="lastName"
                                required
                                value={data.lastName}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="registerEmail"
                            className="form-label auth-label"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control auth-input"
                            id="registerEmail"
                            name="email"
                            placeholder="you@example.com"
                            required
                            value={data.email}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="row g-3 mb-1">
                        <div className="col-sm-6">
                            <label
                                htmlFor="registerPassword"
                                className="form-label auth-label"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control auth-input"
                                id="registerPassword"
                                name="password"
                                required
                                value={data.password}
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="col-sm-6">
                            <label
                                htmlFor="confirmPassword"
                                className="form-label auth-label"
                            >
                                Confirm password
                            </label>

                            <input
                                type="password"
                                className="form-control auth-input"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                value={data.confirmPassword}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="auth-error mb-3">
                            {error}
                        </p>
                    )}

                    <div className="form-check mb-4 mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input auth-checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            required
                            checked={data.agreeTerms}
                            onChange={onChangeHandler}
                        />

                        <label
                            className="form-check-label auth-checkbox-label"
                            htmlFor="agreeTerms"
                        >
                            I agree to the Terms and Privacy Policy
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn auth-submit-btn w-100"
                    >
                        Create account
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="auth-link auth-link-strong"
                    >
                        Log in
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;