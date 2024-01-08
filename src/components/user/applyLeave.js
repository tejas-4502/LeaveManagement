import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../common/navbar";

const ApplyLeave = () => {
    const [leave, setLeave] = useState('')
    const [startdate, setStartdate] = useState('')
    const [enddate, setEnddate] = useState('')
    const [comments, setComments] = useState('')
    const [, setData] = useState([]);
    const [additionalData, setAdditionalData] = useState([]);
    const [errors, setErrors] = useState({});

    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const username = loggedInUser ? JSON.parse(loggedInUser).username : '';

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        axios.get('https://localhost:44372/api/Leavetype')
            .then((result) => {
                setAdditionalData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const getData = () => {
        axios.get('https://localhost:44372/api/Leaveapply')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSave = () => {
        const validationErrors = {};
        let isValid = true;

        if (!leave) {
            validationErrors.leave = 'Please select a leave type.';
            isValid = false;
        }

        if (!startdate) {
            validationErrors.startdate = 'Please select a start date.';
            isValid = false;
        }

        if (!enddate) {
            validationErrors.enddate = 'Please select an end date.';
            isValid = false;
        }

        if (!comments) {
            validationErrors.comments = 'Please provide comments.';
            isValid = false;
        }

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        const url = 'https://localhost:44372/api/Leaveapply';
        const data = {
            "leave": leave,
            "startdate": startdate,
            "enddate": enddate,
            "comments": comments,
            "username": username,
            "status": "pending"
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Leave request has been created');
                setErrors({});
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    const clear = () => {
        setLeave('');
        setStartdate('');
        setEnddate('');
        setComments('');
    }

    return (
        <Fragment>
            <Navbar user />
            <ToastContainer /> <br />
            <Container>
                <div className="p-5 shadow-lg rounded bg-light">
                    <h1 className="mb-4 text-primary">Apply For Leave</h1> <hr />
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}>
                        <div className="mb-3">
                            <label className="form-label">Leave Type</label>
                            {additionalData.length > 0 ? (
                                <select
                                    className="form-select"
                                    value={leave}
                                    onChange={(e) => setLeave(e.target.value)}
                                >
                                    <option value="">--Select Leave Type--</option>
                                    {additionalData.map((item) => (
                                        <option key={item.id} value={item.leave}>
                                            {item.leave}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Leave Type"
                                    value={leave}
                                    onChange={(e) => setLeave(e.target.value)}
                                />
                            )}
                            {errors.leave && <div className="text-danger">{errors.leave}</div>}
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Start date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Start date"
                                    value={startdate}
                                    onChange={(e) => setStartdate(e.target.value)}
                                />
                                {errors.startdate && <div className="text-danger">{errors.startdate}</div>}
                            </div>
                            <div className="col">
                                <label className="form-label">End date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="End date"
                                    value={enddate}
                                    onChange={(e) => setEnddate(e.target.value)}
                                />
                                {errors.enddate && <div className="text-danger">{errors.enddate}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Request Comments</label>
                            <textarea
                                className="form-control"
                                placeholder="Comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                rows={2}
                            />
                            {errors.comments && <div className="text-danger">{errors.comments}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

export default ApplyLeave;
