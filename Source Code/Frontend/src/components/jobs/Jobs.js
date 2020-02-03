import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import "../../Design/jobs/jobs.css"
// import IT from "../../images/IT.jpg"
// import Development from "../../images/Development.jpg"
// import Health from "../../images/Health.jpg"
// import Trade from "../../images/Trade.jpg"
// import Education from "../../images/Education.jpg"
// import Engineering from "../../images/Engineering.jpg"
// import Business from "../../images/Business.jpg"
// import Managment from "../../images/Managment.jpg"
// import Others from "../../images/Others.jpg"

export default class Jobs extends Component {

    state = {
        jobs: null,
        msg: null
    }

    UNSAFE_componentWillMount() {
        this.getJobs()
    }

    searchJob = async event => {
        event.preventDefault()
        let field = event.target["field"].value
        axios.post("http://localhost:9000/searchJob", { field })
            .then(res => {
                let jobs = res.data
                this.setState({ jobs })
            })
    }

    getJobs = () => {
        axios.get("http://localhost:9000/getJobs")
            .then(res => {
                let jobs = res.data
                this.setState({ jobs })
            })
    }

    deleteJob = _id => {
        axios.post("http://localhost:9000/deleteJob", { _id })
            .then(res => {
                // console.log(res.data)
                // window.location.reload()
            })
        this.setState({ msg: "Job Deleted" })
        this.getJobs()
        this.getJobs()
        this.getJobs()
        setInterval(() => {
            this.setState({ msg: null })
        }, 4000);
    }

    render() {
        const { jobs, msg } = this.state

        return (
            <div className="jobs-body">
                <div className="jobs float-right mr-4 "  >

                    <div className="cell mt-5" data-title="Location">
                        <div className="button_cont" align="center"><Link to="AddJob" className="add-job" rel="nofollow noopener">Add Job</Link></div>
                    </div>

                    <form className="mt-5" onSubmit={this.searchJob}>
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
                        jobs !== null ?
                            jobs.map((job, key) => {
                                return (
                                    <div key={key} className="card mb-5" style={{ width: "80%" }}>
                                        {/* <img src={job.field} className="card-img-top" alt="..." /> */}
                                        <div className="card-body">
                                            <h4 className="card-title">{job.name}</h4>
                                            <h5 className="card-text">{job.company}</h5>
                                            <h6 className="card-text">{job.address}</h6>
                                            {/* <p className="card-text">{job.info}</p> */}
                                            <div className="button_cont float-left mt-3" align="center">
                                                <Link to="Job" onClick={() => localStorage.setItem("job", job._id)} className="add-job" rel="nofollow noopener">More Info</Link>
                                            </div>
                                            {
                                                localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === job.user_id ?
                                                    // <div className="button_cont float-left" align="center">
                                                    //     <Link to="Job" onClick={() => localStorage.setItem("job", job._id)} className="add-job" rel="nofollow noopener">More Info</Link>
                                                    // </div>
                                                    <div className="button_cont float-right" align="center">
                                                        <button className="read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteJob(job._id)}></button>
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
