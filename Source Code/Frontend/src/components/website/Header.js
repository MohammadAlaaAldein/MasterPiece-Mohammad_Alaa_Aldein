import React, { Component } from 'react'
import { Link } from "react-router-dom"
import logo from "../../images/logo.jpg"
// import Search from "./Search"
// import "../../Design/header/header.css"
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
                                <Link className="nav-link" to="Jobs">Jobs <span className="sr-only">(current)</span></Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="JobApplications">Jobs Applications</Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Companies">Companies</Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link className="nav-link" to="Contactus">Contactus</Link>
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
                                <ul className="navbar-nav mr-5">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {
                                                this.state.user !== null ?
                                                    this.state.user.name
                                                    :
                                                    null
                                            }
                                        </a>

                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {
                                                localStorage.getItem("role") === "admin" ?
                                                    <Link className="dropdown-item" to="AdminDashboard">Admin Dashboard</Link>
                                                    :
                                                    <Link className="dropdown-item" to="UserDashboard">User Dashboard</Link>
                                            }
                                            <Link className="dropdown-item" to="Logout">Logout</Link>
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
