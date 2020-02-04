import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class JobApplications extends Component {

    state = {
        jobsApplications: null,
        msg: null
    }

    UNSAFE_componentWillMount() {
        this.getJobsApplications()
    }

    getJobsApplications = () => {
        axios.get("http://localhost:9000/getJobsApplications")
            .then(res => {
                let jobsApplications = res.data
                this.setState({ jobsApplications })
            })
    }


    deleteJobApplication = _id => {
        axios.post("http://localhost:9000/deleteJobApplication", { _id })
            .then(res => {
            })
        this.setState({ msg: "Seek Deleted" })
        this.getJobsApplications()
        this.getJobsApplications()
        this.getJobsApplications()
        setInterval(() => {
            this.setState({ msg: null })
        }, 4000);

    }

    searchJobApplication = async event => {
        event.preventDefault()
        let field = event.target["field"].value
        axios.post("http://localhost:9000/searchJobApplication", { field })
            .then(res => {
                let jobsApplications = res.data
                this.setState({ jobsApplications })
            })
    }


    render() {
        const { jobsApplications, msg } = this.state
        return (
            <div className="jobs">
                <div className="float-right mr-4 "  >

                    <div className="cell mt-5" data-title="Location">
                        <div className="button_cont" align="center"><Link to="AddJobApplication" className="add-job" rel="nofollow noopener">Add Job Seek</Link></div>
                    </div>

                    <form className="mt-5" onSubmit={this.searchJobApplication}>
                        <select name="field" className="select-jobs">
                            <option className="dropdown-item">Job Field</option>
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
                        <div className="cell" data-title="Field">
                            <div className="button_cont mt-3" align="center">
                                <button type="submit" className="add-job" rel="nofollow noopener">Filter</button>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="ml-5">
                    {
                        jobsApplications !== null ?
                            jobsApplications.map((jobApplication, key) => {
                                return (
                                    <div key={key} className="card mb-5" style={{ width: "80%" }}>
                                        <div className="card-body">
                                            <h4 className="card-title">{jobApplication.name}</h4>
                                            <h5 className="card-title">{jobApplication.field}</h5>
                                            <h5 className="card-title">Experience Have : {jobApplication.experience} Years</h5>
                                            <div className="button_cont float-left mt-3" align="center">
                                                <Link to="JobApplication" onClick={() => localStorage.setItem("jobApplication", jobApplication._id)} className="add-job" rel="nofollow noopener">More Info</Link>
                                            </div>
                                            {
                                                localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === jobApplication.user_id ?
                                                    <div className="button_cont float-right" align="center">
                                                        <button className="read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteJobApplication(jobApplication._id)}></button>
                                                    </div>

                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
                <p className="delete"> {msg} </p>

            </div>
        )
    }
}
