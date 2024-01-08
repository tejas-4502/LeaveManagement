import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../common/navbar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Leaverequest = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleAccept = (id) => {
        setSelectedItemId(id);
        setShowAcceptModal(true);
    };

    const handleDecline = (id) => {
        setSelectedItemId(id);
        setShowDeclineModal(true);
    };

    const confirmAccept = () => {
        axios
            .put(`https://localhost:44372/api/LeaveApply/${selectedItemId}/Accept`)
            .then(() => {
                toast.success("Leave request accepted");
                getData();
                setShowAcceptModal(false);
            })
            .catch((error) => {
                toast.error("Error accepting leave request");
                console.log(error);
            });
    };

    const confirmDecline = () => {
        axios
            .put(`https://localhost:44372/api/LeaveApply/${selectedItemId}/Decline`)
            .then(() => {
                toast.success("Leave request declined");
                getData();
                setShowDeclineModal(false);
            })
            .catch((error) => {
                toast.error("Error declining leave request");
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("https://localhost:44372/api/LeaveApply")
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const filteredData = data.filter((item) =>
        item.leave.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <Navbar admin />
            <ToastContainer />
            <br />
            <div className="container">
                <ToastContainer />
                <h1 className="text-primary">Admin Leave Request Log</h1>
                <hr />
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by leave type"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Table striped hover className="table-light">
                    <thead>
                        <tr>
                            <th>Employee Username</th>
                            <th>Leave Type</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Comments</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item, index) => (
                            <tr key={index}>
                                <td>{item.userName}</td>
                                <td>{item.leave}</td>
                                <td>{item.startdate}</td>
                                <td>{item.enddate}</td>
                                <td>{item.comments}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        disabled={item.status === 'Accepted' || item.status === 'Declined'}
                                        onClick={() => handleAccept(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </button>
                                    <button
                                        className="btn btn-danger ms-2"
                                        disabled={item.status === 'Accepted' || item.status === 'Declined'}
                                        onClick={() => handleDecline(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    </button>
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
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {Array.from(
                                { length: Math.ceil(filteredData.length / rowsPerPage) },
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
                    </nav>
                </div>
            </div>
            <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Confirm Accept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to accept this leave request?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAcceptModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmAccept}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Confirm Decline</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to decline this leave request?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeclineModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDecline}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default Leaverequest;
