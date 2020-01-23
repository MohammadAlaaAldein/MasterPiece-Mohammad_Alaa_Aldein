import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class JobApplications extends Component {

    state = {
        jobsApplications: null,
    }

    UNSAFE_componentWillMount() {
        this.getJobsApplications()
    }

    getJobsApplications = () => {
        axios.get("http://localhost:9000/getJobsApplications")
            .then(res => {
                let jobsApplications = res.data
                // console.log(jobsApplications)
                this.setState({ jobsApplications })
            })
    }


    deleteJobApplication = _id => {
        axios.post("http://localhost:9000/deleteJobApplication", { _id })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
    }

    searchJobApplication = async event => {
        event.preventDefault()
        let field = event.target["field"].value.toLowerCase()
        axios.post("http://localhost:9000/searchJobApplication", {field})
            .then(res => {
                let jobsApplications = res.data
                this.setState({ jobsApplications })
                console.log(jobsApplications)
            })
    }


    render() {
        const { jobsApplications } = this.state
        return (
            <div>
                <div className="row">

                    <div className="col">
                        <button className="ml-5">
                            <Link to="/AddJobApplication">Add Job Applicarion</Link>
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div className="col">
                        <form onSubmit={this.searchJobApplication}>
                            <select defaultValue="Defult" name="field">
                                <option disabled>Job Field</option>
                                <option value="IT">IT</option>
                                <option value="Development">Development</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Accounting">Accounting</option>
                            </select>
                            <input type="submit" value="Search" />
                        </form>
                    </div>

                </div>

                <div className="d-flex flex-wrap">
                    {
                        jobsApplications !== null ?
                            jobsApplications.map((jobsApplication, key) => {
                                return (
                                    <div key={key} className="card ml-5 mt-5" style={{ width: "18rem" }}>
                                        {/* <img src="..." className="card-img-top" alt="..."> */}
                                        <div className="card-body">
                                            <h5 className="card-title">{jobsApplication.name}</h5>
                                        </div>
                                        {/* <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> {} </li>
                                        <li className="list-group-item"> {} </li>
                                        <li className="list-group-item"> {} </li>
                                    </ul> */}
                                        <div className="card-body">
                                            <Link className="card-link" to="JobApplication"
                                                onClick={() => localStorage.setItem("jobApplication", jobsApplication._id)}
                                            >
                                                More Info
                                        </Link>
                                        </div>
                                        <br />
                                        {
                                            localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === jobsApplication.user_id ?
                                                <button onClick={() => this.deleteJobApplication(jobsApplication._id)} > Delete </button>
                                                :
                                                null
                                        }
                                    </div>
                                )
                            })
                            : null
                    }

                </div>
            </div>
        )
    }
}
