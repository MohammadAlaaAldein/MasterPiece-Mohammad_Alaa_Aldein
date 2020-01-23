import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default class UserDashboard extends Component {

    state = {
        user: null,
        userJobs: null,
        userJobsApplications: null,
        appliers: [],
        refresh: null,
        job_id: null,
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
                // console.log(res.data)
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
        let born = event.target["born"].value
        axios.put("http://localhost:9000/updateProfile", { _id, name, email, phone, field, address, experience, info, born })
            .then(res => {
                console.log(res.data)
            })
    }

    applied = (applied, job_id) => {
        this.setState({ job_id })
        this.setState({ appliers: [] })
        applied.map(_id => {
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
                console.log(res.data)
                window.location.reload()
            })
    }

    deleteJobApplcation = _id => {
        axios.post("http://localhost:9000/deleteJobApplication", { _id })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
    }



    deleteJobApplier = _id => {
        let job_id = this.state.job_id
        let appliers = this.state.appliers
        let appliersAfterDelete = appliers.filter(applier => {
            return applier._id !== _id
        })
        console.log(job_id, appliersAfterDelete)
        axios.post("http://localhost:9000/deleteJobApplier", { appliersAfterDelete, job_id })
            .then(res => {
                console.log(res.data)
            })
        window.location.reload()
    }

    render() {
        const { user, userJobs, userJobsApplications, appliers } = this.state
        return (
            <div className="">
                <div className="row">
                    <div className="col">
                        {
                            user !== null ?
                                <form onSubmit={this.updateProfile}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td><input name="name" type="text" defaultValue={user.name} placeholder="Name" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td><input name="email" type="text" defaultValue={user.email} placeholder="Name" /></td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td><input name="phone" type="number" defaultValue={user.phone} placeholder="Phone" /></td>
                                            </tr>
                                            <tr>
                                                <td>Field</td>
                                                <td><input name="field" type="text" defaultValue={user.field} placeholder="Field" /> </td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td><input name="address" type="text" defaultValue={user.address} placeholder="Address" /> </td>
                                            </tr>
                                            <tr>
                                                <td>Experience</td>
                                                <td><input name="experience" type="number" defaultValue={user.experience} placeholder="Experience" /></td>
                                            </tr>
                                            <tr>
                                                <td>More Info</td>
                                                <td><textarea name="info" defaultValue={user.info} placeholder="Info" /></td>
                                            </tr>
                                            <tr>
                                                <td>Born Date</td>
                                                <td><input name="born" type="date" defaultValue={user.born} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button> Update </button>
                                </form>
                                : null
                        }
                    </div>

                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Job Name</td>
                                    <td>Applied</td>
                                    <td>Delete Job</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user !== null && userJobs !== null ?
                                        userJobs.map((job, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <Link to="Job"
                                                            onClick={() => localStorage.setItem("job", job._id)}
                                                        >{job.name}
                                                        </Link>
                                                    </td>
                                                    <td onClick={() => this.applied(job.applied, job._id)}><button> Persons Who Applied </button></td>
                                                    <td><button onClick={() => this.deleteJob(job._id)}> Delete </button></td>
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
                            <thead>
                                <tr>
                                    <td>Job Application Name</td>
                                    <td>Delete Job</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user !== null && userJobsApplications !== null ?
                                        userJobsApplications.map((jobApplication, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <Link to="JobApplication"
                                                            onClick={() => localStorage.setItem("jobApplication", jobApplication._id)}
                                                        >{jobApplication.name}
                                                        </Link>
                                                    </td>
                                                    <td><button onClick={() => this.deleteJobApplcation(jobApplication._id)}> Delete </button></td>
                                                </tr>
                                            )
                                        })
                                        : null
                                }
                            </tbody>
                        </table>
                    </div>




                </div>


                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Profile</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    appliers.length !== 0 ?
                                        appliers.map((applier, key) => {
                                            return (
                                                <tr key={key} >
                                                    <td> {applier.name} </td>
                                                    <td>
                                                        <Link to="Profile"
                                                            onClick={() => localStorage.setItem("profile", applier._id)}
                                                        >
                                                            View Profile
                                                    </Link> </td>
                                                    <td>
                                                        <button onClick={() => this.deleteJobApplier(applier._id)} > Delete </button>
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
            </div >
        )
    }
}
