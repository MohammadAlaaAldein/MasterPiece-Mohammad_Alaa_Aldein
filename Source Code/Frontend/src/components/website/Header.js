import React, { Component } from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/logo.jpg"
import axios from 'axios'

export default class Header extends Component {

    state = {
        user: null
    }

    UNSAFE_componentWillMount() {
        let _id = localStorage.getItem("user_id")
        if (_id !== "null") {
            axios.post("http://localhost:9000/getLoggedInUser", { _id })
                .then(res => {
                    this.setState({ user: res.data })
                })
        }
    }

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                    <Link className="navbar-brand" to=""> <img src={logo} height="30px" width="65px" alt="Logo" /> </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div style={{ fontSize: "20px" }} className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Jobs">Jobs Opportunities<span className="sr-only">(current)</span></Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="JobApplications">Jobs Seekers</Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Companies">Companies</Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Contactus">Contactus</Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Aboutus">About Us</Link>
                            </li>
                        </ul>

                        {
                            localStorage.getItem("user_id") === "null" ?
                                <ul className="navbar-nav">

                                    <li className="nav-item ml-3">
                                        <Link className="nav-link" to="Register">Register</Link>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <Link className="nav-link" to="Login">Login</Link>
                                    </li>

                                </ul>
                                :
                                <ul className="navbar-nav" style={{ marginRight: "80px" }}>
                                    <li className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {
                                                this.state.user !== null ?
                                                    this.state.user.name
                                                    :
                                                    null
                                            }
                                        </a>

                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ fontFamily: "serif" }}>
                                            <Link className="dropdown-item" to="UserDashboard"><h5>Dashboard</h5></Link>
                                            {
                                                localStorage.getItem("role") === "admin" ?
                                                    <Link className="dropdown-item" to="AdminDashboard"><h5>Messages</h5></Link>
                                                    :
                                                    null
                                            }
                                            <Link className="dropdown-item" to="Logout"><h5>Logout</h5></Link>
                                        </div>
                                    </li>
                                </ul>
                        }

                    </div>
                </nav>
            </div >
        )
    }
}
