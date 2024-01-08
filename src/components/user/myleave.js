import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../common/navbar";

const MyLeave = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    // delete
    const [deleteItemId, setDeleteItemId] = useState(null);
    const handleDeleteConfirmation = (id) => {
        setDeleteItemId(id);
        handleShow1();
    };

    // Add
    const [, setLeave] = useState('');
    const [, setStartdate] = useState('');
    const [, setEnddate] = useState('');
    const [, setComments] = useState('');

    //Edit
    const [editID, setEditId] = useState('')
    const [editLeave, setEditLeave] = useState('')
    const [editStartdate, setEditStartdate] = useState('')
    const [editEnddate, setEditEnddate] = useState('')
    const [editComments, setEditComments] = useState('')

    const [data, setData] = useState([]);

    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const username = loggedInUser ? JSON.parse(loggedInUser).username : '';

    useEffect(() => {
        getData();
    },);

    // get data by username
    const getData = () => {
        axios.get(`https://localhost:44372/api/LeaveApply/ByUserName?userName=${username}`)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:44372/api/LeaveApply/${id}`)
            .then((result) => {
                const { leave, startdate, enddate, comments } = result.data;
                setEditLeave(leave);
                setEditStartdate(new Date(startdate).toISOString().substr(0, 10));
                setEditEnddate(new Date(enddate).toISOString().substr(0, 10));
                setEditComments(comments);
                setEditId(id);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const confirmDelete = () => {
        if (deleteItemId) {
            axios.delete(`https://localhost:44372/api/Leaveapply/${deleteItemId}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Leave request has been deleted");
                        getData();
                        handleClose1();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const clear = () => {
        setLeave('');
        setStartdate('');
        setEnddate('');
        setComments('');

        setEditLeave('');
        setEditStartdate('');
        setEditEnddate('');
        setEditComments('');
        setEditId('');
    }

    const handleUpdate = () => {
        const url = `https://localhost:44372/api/Leaveapply/${editID}`;
        const data = {
            "id": editID,
            "leave": editLeave,
            "startdate": editStartdate,
            "enddate": editEnddate,
            "comments": editComments,
            "username": username,
            "status": "pending"
        }
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                clear();
                toast.success('Leave request has been updated');
            })
            .catch((error) => {
                toast.error('Leave request updating failed');
                toast.error(error);
            })
    }

    const [additionalData, setAdditionalData] = useState([]);

    // API from different file endpoint
    useEffect(() => {
        axios.get('https://localhost:44372/api/Leavetype')
            .then((result) => {
                setAdditionalData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    // card of leave available
    const [data1, setData1] = useState([]);

    useEffect(() => {
        getData1();
    }, [])

    const getData1 = () => {
        axios.get('https://localhost:44372/api/Leavetype')
            .then((result) => {
                setData1(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <Fragment>
            <Navbar user />
            <ToastContainer /> <br />
            <Container>
                <div className="row">
                    <h2 className="mb-4 text-primary">Allocated Leaves</h2> <hr />
                    {data1.map((item, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title text-info">{item.leave}</h4> <hr />
                                    <p className="card-text">No. of Days: {item.days}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <h2 className="text-primary">My leave Requests</h2> <hr />
                <Table striped hover className="table-light">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Comments</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead> <br />
                    <tbody>
                        {currentRows.map((item, index) => (
                            <tr key={index}>
                                <td>{item.leave}</td>
                                <td>{item.startdate}</td>
                                <td>{item.enddate}</td>
                                <td>{item.comments}</td>
                                <td>
                                    <button className="btn btn-primary" disabled={item.status === 'Accepted' || item.status === 'Declined'} onClick={() => handleEdit(item.id)}> <FontAwesomeIcon icon={faPencil} /> </button> &nbsp;
                                    <button className="btn btn-danger" disabled={item.status === 'Accepted' || item.status === 'Declined'} onClick={() => handleDeleteConfirmation(item.id)}> <FontAwesomeIcon icon={faTrash} /> </button>
                                </td>
                                <td>
                                    <div className={`badge text-wrap ${item.status === 'pending' ? 'bg-warning' : item.status === 'Accepted' ? 'bg-success' : item.status === 'Declined' ? 'bg-danger' : ''}`}>
                                        {item.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <ul className="pagination">
                        {Array.from(
                            { length: Math.ceil(data.length / rowsPerPage) },
                            (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Update Leave Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <label htmlFor="">Leave Type</label>
                        {additionalData.length > 0 ? (
                            <select
                                className="form-control"
                                value={editLeave}
                                onChange={(e) => setEditLeave(e.target.value)}
                                required
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
                                value={editLeave}
                                onChange={(e) => setEditLeave(e.target.value)}
                                required
                            />
                        )}

                    </Col><br />
                    <Row>
                        <Col>
                            <label htmlFor="">Start date</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Start date"
                                value={editStartdate}
                                onChange={(e) => setEditStartdate(e.target.value)}
                                required
                            />
                        </Col>
                        <Col>
                            <label htmlFor="">End date</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="End date"
                                value={editEnddate}
                                onChange={(e) => setEditEnddate(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>
                    <br />
                    <Col>
                        <label htmlFor="">Comments</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Comments"
                            value={editComments}
                            onChange={(e) => setEditComments(e.target.value)}
                            required
                        />
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Leave request?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default MyLeave;
