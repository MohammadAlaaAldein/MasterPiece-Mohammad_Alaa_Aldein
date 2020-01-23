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
    }

    UNSAFE_componentWillMount() {
        this.getJobs()
    }

    searchJob = async event => {
        event.preventDefault()
        let field = event.target["field"].value.toLowerCase()
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
                window.location.reload()
            })
    }

    render() {
        const { jobs } = this.state

        return (
            <div className="jobs-body">

                <div className="jobs">
                    <div className="">

                        <div className="cell float-left" data-title="Location">
                            <div className="button_cont float-left ml-4" align="center"><Link to="AddJob" className="add-job" rel="nofollow noopener">Add Job</Link></div>
                        </div>


                        <form className="float-right mr-5" onSubmit={this.searchJob}>
                            <select name="field" className="select-jobs">
                                <option className="dropdown-item">Job Field</option>
                                <option className="dropdown-item" value="IT">IT</option>
                                <option className="dropdown-item" value="Development">Development</option>
                                <option className="dropdown-item" value="Medicine">Health</option>
                                <option className="dropdown-item" value="Engineering">Engineering</option>
                                <option className="dropdown-item" value="Accounting">Education</option>
                                <option className="dropdown-item" value="Accounting">Trade</option>
                                <option className="dropdown-item" value="Accounting">Managment</option>
                                <option className="dropdown-item" value="Accounting">Business</option>
                                <option className="dropdown-item" value="Accounting">Others</option>
                            </select>
                            <div className="cell float-right" data-title="Location">
                                <div className="button_cont float-left ml-4" align="center">
                                    <button className="add-job" rel="nofollow noopener">Filter</button>
                                </div>
                            </div>
                        </form>
                    </div>


                    <div className="d-flex flex-wrap">
                        {/* <div className="row"> */}
                        {
                            jobs !== null ?
                                jobs.map((job, key) => {
                                    return (
                                        <div key={key} className="card ml-5 mb-5" style={{ width: "18rem" }}>
                                            {/* <img src={job.field} className="card-img-top" alt="..." /> */}
                                            <div className="card-body">
                                                <h4 className="card-title">{job.name}</h4>
                                                <h5 className="card-text">{job.company}</h5>
                                                <p className="card-text">{job.info}</p>
                                                <div className="button_cont float-left" align="center">
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
                                        // <div key={key} className="card ml-5 mt-5" style={{ width: "18rem" }}>
                                        //     {/* <div key={key} className="col" style={{ width: "18rem" }}> */}
                                        //     {/* <img src="..." className="card-img-top" alt="..."> */}
                                        //     <div className="card-body">
                                        //         <h5 className="card-title">{job.name}</h5>
                                        //         <p className="card-text">{job.company}</p>
                                        //     </div>
                                        //     {/* <ul className="list-group list-group-flush">
                                        //     <li className="list-group-item"> {} </li>
                                        //     <li className="list-group-item"> {} </li>
                                        //     <li className="list-group-item"> {} </li>
                                        // </ul> */}
                                        //     <div className="card-body">
                                        //         <Link className="card-link" to="Job"
                                        //             onClick={() => localStorage.setItem("job", job._id)}
                                        //         >
                                        //             More Info
                                        //     </Link>
                                        //     </div>
                                        //     <br />
                                        // 
                                        // {
                                        //     localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === job.user_id ?
                                        //         <button onClick={() => this.deleteJob(job._id)} > Delete </button>
                                        //         :
                                        //         null
                                        // }
                                        // </div>
                                    )
                                })
                                : null
                        }
                    </div >
                </div>
            </div>
        )
    }
}
