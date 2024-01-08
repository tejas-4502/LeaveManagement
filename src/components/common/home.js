import React from 'react'
import Navbar from './navbar'

export function Homebase() {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="text-center mt-5">
                    <h1 className="text-primary">Welcome to Leave Management</h1>
                    <hr />
                </div>
                <div className="text-justify">
                    <p>
                        A comprehensive Leave Management System encompasses a range of essential features to streamline the leave management process effectively. Some of these key features include:
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>1. Online Leave Application</h4>
                            <p>
                                Employees can easily request leaves through a user-friendly online interface, specifying the type of leave, duration, and reason.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h4>2. Automated Workflows</h4>
                            <p>
                                The system allows for automated approval workflows, where leave requests are routed for quick and efficient decision-making.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h1 className='text-danger'>Effortless, efficient, effective</h1><h1>leave management</h1>
                </div>
            </div>
        </>
    );
}
export function Homeuser() {
    return (
        <>
            <Navbar user />
            <div className="container mt-5">
                <div className="text-center mt-5">
                    <h1 className="text-primary">Welcome to Leave Management</h1>
                    <hr />
                </div>
                <div className="text-justify">
                    <p>
                        A comprehensive Leave Management System encompasses a range of essential features to streamline the leave management process effectively. Some of these key features include:
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>1. Online Leave Application</h4>
                            <p>
                                Employees can easily request leaves through a user-friendly online interface, specifying the type of leave, duration, and reason.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h4>2. Automated Workflows</h4>
                            <p>
                                The system allows for automated approval workflows, where leave requests are routed for quick and efficient decision-making.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h1 className='text-danger'>Effortless, efficient, effective</h1><h1>leave management</h1>
                </div>
            </div>
        </>
    );
}
export function Homeadmin() {
    return (
        <>
            <Navbar admin />
            <div className="container mt-5">
                <div className="text-center mt-5">
                    <h1 className="text-primary">Welcome to Leave Management</h1>
                    <hr />
                </div>
                <div className="text-justify">
                    <p>
                        A comprehensive Leave Management System encompasses a range of essential features to streamline the leave management process effectively. Some of these key features include:
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>1. Online Leave Application</h4>
                            <p>
                                Employees can easily request leaves through a user-friendly online interface, specifying the type of leave, duration, and reason.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h4>2. Automated Workflows</h4>
                            <p>
                                The system allows for automated approval workflows, where leave requests are routed for quick and efficient decision-making.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h1 className='text-danger'>Effortless, efficient, effective</h1><h1>leave management</h1>
                </div>
            </div>
        </>
    );
}

export default function Home(props) {
    if (props.user) {
        return <Homeuser />;
    }
    if (props.admin) {
        return <Homeadmin />;
    }
    else {
        return <Homebase />;
    }
}
