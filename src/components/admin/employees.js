import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../common/navbar'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Employees = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:44372/api/User')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDetails = (employee) => {
        setSelectedEmployee(employee);
        handleShowModal();
    }

    // Delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (id) => {
        setDeleteEmployeeId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteEmployeeId) {
            axios.delete(`https://localhost:44372/api/User/${deleteEmployeeId}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success("Employee has been deleted");
                        getData();
                        handleCloseDeleteModal();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    };

    return (
        <Fragment>
            <Navbar admin />
            <Container className="my-5">
                <ToastContainer />
                <h1 className="text-primary">Employees</h1> <hr />
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Birth date</th>
                            <th>Joined date</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.birthday}</td>
                                <td>{item.joindate}</td>
                                <td>{item.username}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleShowDeleteModal(item.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button className="btn btn-primary ms-2" onClick={() => handleDetails(item)}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Employee Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedEmployee && (
                            <div>
                                <h5>{selectedEmployee.name}</h5>
                                <p>ID: {selectedEmployee.id}</p>
                                <p>Birth date: {selectedEmployee.birthday}</p>
                                <p>Joined date: {selectedEmployee.joindate}</p>
                                <p>Username: {selectedEmployee.username}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this Employee?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Fragment>
    )
}

export default Employees;
