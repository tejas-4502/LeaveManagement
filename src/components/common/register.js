import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [joindate, setJoindate] = useState('');
    const [name, setName] = useState('');

    // validation
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }

        if (!birthday) {
            errors.birthday = 'Birth Date is required';
        }

        if (!joindate) {
            errors.joindate = 'Join Date is required';
        }

        if (!username) {
            errors.username = 'Email / Username is required';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            errors.username = 'invalid email';
        }

        if (!joindate) {
            errors.password = 'Password is required';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        else if (password.length < 8) {
            errors.password = 'Password should be at least 8 characters long';
        }
        else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            errors.password = 'Password should contain at least one uppercase and one lowercase letter';
        }


        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            try {
                // Send registration data to the backend
                const response = await axios.post('https://localhost:44372/api/User/register', {
                    username,
                    password,
                    birthday,
                    joindate,
                    name
                });

                if (response.status === 200) {
                    toast.success('Registration successful');
                    console.log(response.data);
                    setValidationErrors({});
                }
            } catch (error) {
                console.error('Registration failed:', error);
                toast.error('Username is already in use');
            }
        } else {
            setValidationErrors(errors);
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-4 shadow-lg registration-card">
                            <h1 className="text-center mb-4 text-success">Register</h1> <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        className='form-control'
                                        placeholder="Enter your name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="">Birth date:</label>
                                        <input
                                            type="date"
                                            value={birthday}
                                            className='form-control'
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                        {validationErrors.birthday && <span className="text-danger">{validationErrors.birthday}</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Joined date:</label>
                                        <input
                                            type="date"
                                            value={joindate}
                                            className='form-control'
                                            onChange={(e) => setJoindate(e.target.value)}
                                        />
                                        {validationErrors.joindate && <span className="text-danger">{validationErrors.joindate}</span>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={username}
                                        className='form-control'
                                        placeholder="Enter your email"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {validationErrors.username && <span className="text-danger">{validationErrors.username}</span>}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        className='form-control'
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {validationErrors.password && <span className="text-danger">{validationErrors.password}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
