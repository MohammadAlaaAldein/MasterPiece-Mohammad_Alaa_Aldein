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
                // console.log(jobsApplications)
                this.setState({ jobsApplications })
            })
    }


    deleteJobApplication = _id => {
        axios.post("http://localhost:9000/deleteJobApplication", { _id })
            .then(res => {
                console.log(res.data)
                // window.location.reload()
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
                console.log(jobsApplications)
            })
    }


    render() {
        const { jobsApplications, msg } = this.state
        return (
            // <div>
            //     <div className="row">

            //         <div className="col">
            //             <button className="ml-5">
            //                 <Link to="/AddJobApplication">Add Job Seek</Link>
            //             </button>
            //         </div>

            //         {/* SEARCH */}
            //         <div className="col">
            //             <form onSubmit={this.searchJobApplication}>
            //                 <select defaultValue="Defult" name="field">
            //                     <option disabled>Job Field</option>
            //                     <option value="IT">IT</option>
            //                     <option value="Development">Development</option>
            //                     <option value="Medicine">Medicine</option>
            //                     <option value="Engineering">Engineering</option>
            //                     <option value="Accounting">Accounting</option>
            //                 </select>
            //                 <input type="submit" value="Search" />
            //             </form>
            //         </div>

            //     </div>

            //     <div className="d-flex flex-wrap">
            //         {
            //             jobsApplications !== null ?
            //                 jobsApplications.map((jobsApplication, key) => {
            //                     return (
            //                         <div key={key} className="card ml-5 mt-5" style={{ width: "18rem" }}>
            //                             {/* <img src="..." className="card-img-top" alt="..."> */}
            //                             <div className="card-body">
            //                                 <h5 className="card-title">{jobsApplication.name}</h5>
            //                             </div>
            //                             {/* <ul className="list-group list-group-flush">
            //                             <li className="list-group-item"> {} </li>
            //                             <li className="list-group-item"> {} </li>
            //                             <li className="list-group-item"> {} </li>
            //                         </ul> */}
            //                             <div className="card-body">
            //                                 <Link className="card-link" to="JobApplication"
            //                                     onClick={() => localStorage.setItem("jobApplication", jobsApplication._id)}
            //                                 >
            //                                     More Info
            //                             </Link>
            //                             </div>
            //                             <br />
            //                             {
            //                                 localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === jobsApplication.user_id ?
            //                                     <button onClick={() => this.deleteJobApplication(jobsApplication._id)} > Delete </button>
            //                                     :
            //                                     null
            //                             }
            //                         </div>
            //                     )
            //                 })
            //                 : null
            //         }

            //     </div>
            // </div>

            <div className="jobs-body">
                <div className="jobs float-right mr-4 "  >

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
                                        {/* <img src={jobApplication.field} className="card-img-top" alt="..." /> */}
                                        <div className="card-body">
                                            <h4 className="card-title">{jobApplication.name}</h4>
                                            <h5 className="card-title">{jobApplication.field}</h5>
                                            <h5 className="card-title">Experience Have : {jobApplication.experience} Years</h5>
                                            {/* <h6 className="card-text">{jobApplication.address}</h6> */}
                                            {/* <p className="card-text">{jobApplication.info}</p> */}
                                            <div className="button_cont float-left mt-3" align="center">
                                                <Link to="JobApplication" onClick={() => localStorage.setItem("jobApplication", jobApplication._id)} className="add-job" rel="nofollow noopener">More Info</Link>
                                            </div>
                                            {
                                                localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === jobApplication.user_id ?
                                                    // <div className="button_cont float-left" align="center">
                                                    //     <Link to="Job" onClick={() => localStorage.setItem("jobApplication", jobApplication._id)} className="add-jobApplication" rel="nofollow noopener">More Info</Link>
                                                    // </div>
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
