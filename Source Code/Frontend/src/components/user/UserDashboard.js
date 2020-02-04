import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import "../../Design/userdashboard/userdashboard.css"

export default class UserDashboard extends Component {

    state = {
        user: null,
        userJobs: null,
        userJobsApplications: null,
        appliers: [],
        refresh: null,
        job_id: null,
        msg: null
    }

    UNSAFE_componentWillMount() {
        this.getLoggedInUser()
        this.getUserJobs()
        this.getUserJobsApplications()
    }

    getLoggedInUser = () => {
        let _id = localStorage.getItem("user_id")
        axios.post("http://localhost:9000/getLoggedInUser", { _id })
            .then(res => {
                this.setState({ user: res.data })
            })
    }

    getUserJobs = () => {
        let _id = localStorage.getItem("user_id")
        axios.post("http://localhost:9000/getUserJobs", { _id })
            .then(res => {
                this.setState({ userJobs: res.data })
            })
    }


    getUserJobsApplications = () => {
        let _id = localStorage.getItem("user_id")
        axios.post("http://localhost:9000/getUserJobsApplications", { _id })
            .then(res => {
                this.setState({ userJobsApplications: res.data })
            })
    }


    updateProfile = event => {
        event.preventDefault()
        let _id = localStorage.getItem("user_id")
        let name = event.target["name"].value
        let email = event.target["email"].value
        let phone = event.target["phone"].value
        let field = event.target["field"].value
        let address = event.target["address"].value
        let experience = event.target["experience"].value
        let info = event.target["info"].value
        axios.put("http://localhost:9000/updateProfile", { _id, name, email, phone, field, address, experience, info })
            .then(res => {
            })
        this.setState({ msg: `Information Updated` })
    }

    applicants = (applicants, job_id) => {
        this.setState({ job_id })
        this.setState({ appliers: [] })
        applicants.map(_id => {
            return (
                axios.post("http://localhost:9000/getLoggedInUser", { _id })
                    .then(res => {
                        let applier = res.data
                        this.state.appliers.push(applier)
                        this.setState({ refresh: null })
                    })
            )
        })
    }

    deleteJob = _id => {
        axios.post("http://localhost:9000/deleteJob", { _id })
            .then(res => {
                this.getUserJobs()
                this.getUserJobs()
                this.getUserJobs()
            })
    }

    deleteJobApplcation = _id => {
        axios.post("http://localhost:9000/deleteJobApplication", { _id })
            .then(res => {
                this.getUserJobsApplications()
                this.getUserJobsApplications()
                this.getUserJobsApplications()
            })
    }



    deleteJobApplier = _id => {
        let job_id = this.state.job_id
        let appliers = this.state.appliers
        let appliersAfterDelete = appliers.filter(applier => {
            return applier._id !== _id
        })
        axios.post("http://localhost:9000/deleteJobApplier", { appliersAfterDelete, job_id })
            .then(res => {
            })

    }

    render() {
        const { user, userJobs, userJobsApplications, appliers, msg } = this.state
        return (

            <div className="dash row">
                {
                    user !== null && user.role !== "admin" ?

                        <div className="col dashcontainer-contact100" >

                            <div className="dashwrap-contact100">
                                <div className="dashcontact100-form-title actbg">
                                    <span className="dashcontact100-form-title-1">
                                        Your Information
                                    </span>
                                </div>

                                <form className="dashcontact100-form validate-form" onSubmit={this.updateProfile} style={{ marginTop: "-10px" }}>

                                    <div className="dashwrap-input100 dashvalidate-input">
                                        <input className="dashinput dashinput100" type="text" name="name" defaultValue={user.name} placeholder="Name" style={{ marginTop: "-20px" }} />
                                    </div>

                                    <div className="dashwrap-input100 dashvalidate-input" >
                                        <input className="dashinput dashinput100" type="email" name="email" defaultValue={user.email} placeholder="Email" />
                                    </div>



                                    <div className="row">
                                        <div className="col dashwrap-input100 dashvalidate-input" >
                                            <input className="dashinput dashinput100" type="number" name="phone" defaultValue={user.phone} placeholder="Phone" />
                                        </div>

                                        <div className="col ml-3 dashwrap-input100 dashvalidate-input" >
                                            <input className="dashinput dashinput100" type="text" name="address" defaultValue={user.address} placeholder="Address" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col time dashwrap-input100 dashvalidate-input" >
                                            <select defaultValue={user.field} name="field" className="dashinput dashinput100">
                                                <option className="dropdown-item">Working Field</option>
                                                <option className="dropdown-item" value="IT">IT</option>
                                                <option className="dropdown-item" value="Development">Development</option>
                                                <option className="dropdown-item" value="Health">Health</option>
                                                <option className="dropdown-item" value="Engineering">Engineering</option>
                                                <option className="dropdown-item" value="Education">Education</option>
                                                <option className="dropdown-item" value="Trade">Trade</option>
                                                <option className="dropdown-item" value="Managment">Managment</option>
                                                <option className="dropdown-item" value="Business">Business</option>
                                                <option className="dropdown-item" value="Others">Others</option>
                                            </select>
                                        </div>

                                        <div className="col ml-3 dashwrap-input100 dashvalidate-input">
                                            <input className="dashinput dashinput100" type="number" name="experience" defaultValue={user.experience} placeholder="Experience Years" />
                                        </div>
                                    </div>

                                    <div className="dashwrap-input100 dashvalidate-input">
                                        <textarea className="dashtextarea dashinput100" name="info" defaultValue={user.info} placeholder="More Info About You ..."></textarea>
                                    </div>

                                    <div style={{ marginBottom: "-20px" }} className="dashcontainer-contact100-form-btn">
                                        <button type="submit" className="dashbutton dashcontact100-form-btn">
                                            <span>
                                                Update Profile
                                            </span>
                                        </button>
                                        {
                                            msg === null ?
                                                <p className="dash-msg" style={{ color: "white" }} >.</p>
                                                :
                                                <p className="dash-msg">{msg} </p>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                        :
                        null
                }

                <div className="col-5">

                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" colspan="3" style={{ fontSize: "30px", fontFamily: "serif" }}> <center>Jobs</center> </th >
                            </tr>
                        </thead>
                        <tbody>

                            {
                                user !== null && userJobs !== null ?
                                    userJobs.map((job, key) => {
                                        return (
                                            <tr key={key}>
                                                <td> {key + 1} </td>
                                                <td>
                                                    <Link to="Job"
                                                        onClick={() => localStorage.setItem("job", job._id)}
                                                    >
                                                        <h6>
                                                            {job.name}
                                                        </h6>
                                                    </Link>
                                                </td>
                                                <td className="row">
                                                    <div className="col dashcontainer-contact100-form-btn">
                                                        <button onClick={() => this.applicants(job.applied, job._id)} type="submit" className="btn btn-primary ">
                                                            Applicants
                                                        </button>
                                                    </div>
                                                    <br />
                                                    <div className="button_cont" align="center">
                                                        <button className="dash-read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteJob(job._id)}></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>


                <div className="col">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th colspan="3" scope="col" style={{ fontSize: "30px", fontFamily: "serif" }}> <center>Job Seeks</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user !== null && userJobsApplications !== null ?
                                    userJobsApplications.map((jobApplication, key) => {
                                        return (
                                            <tr key={key}>
                                                <td> {key + 1} </td>
                                                <td>
                                                    <Link to="JobApplication"
                                                        onClick={() => localStorage.setItem("jobApplication", jobApplication._id)}
                                                    >
                                                        <h6>
                                                            {jobApplication.name}
                                                        </h6>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div className="button_cont" align="center">
                                                        <button className="dash-read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteJob(jobApplication._id)}></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : null
                            }
                        </tbody>
                    </table>






                    <div className="col mt-5">
                        <table className="table">
                            <thead className="thead-light">
                                <th scope="col" colspan="3" style={{ fontSize: "30px", fontFamily: "serif" }}> <center>Applicants</center> </th >
                            </thead>

                            <tbody>
                                {
                                    appliers.length !== 0 ?
                                        appliers.map((applier, key) => {
                                            return (
                                                <tr key={key} >
                                                    <td> {key + 1} </td>
                                                    <td>
                                                        <Link to="Profile"
                                                            onClick={() => localStorage.setItem("profile", applier._id)}
                                                        >
                                                            <h5>
                                                                {applier.name}
                                                            </h5>
                                                        </Link> </td>
                                                    <td>
                                                        <div className="button_cont" align="center">
                                                            <button className="dash-read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteJobApplier(applier._id)} ></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : null
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
