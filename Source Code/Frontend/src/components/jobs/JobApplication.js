import React, { Component } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

export default class JobApplication extends Component {

    state = {
        jobApplication: null,
        user: null,
        mail: null
    }

    UNSAFE_componentWillMount() {
        this.getJobApplication()
    }

    getJobApplication = () => {
        let _id = localStorage.getItem("jobApplication")
        axios.post("http://localhost:9000/getJobApplication", { _id })
            .then(res => {
                let jobApplication = res.data
                this.setState({ jobApplication })
                let _id = jobApplication.user_id
                axios.post("http://localhost:9000/getLoggedInUser", { _id })
                    .then(res => {
                        let user = res.data
                        this.setState({ user })
                        this.setState({ mail: `mailto:${user.email}` })
                    })

            })
    }

    render() {
        const { jobApplication, user, mail } = this.state
        return (
            <div className="job">
                {
                    jobApplication !== null ?
                        <div className="job-content">
                            {
                                user !== null ?
                                    <Link to="profile"
                                        onClick={() => localStorage.setItem("profile", user._id)}
                                    > <h2 className="mt-5" >{user.name}</h2> </Link>
                                    : null
                            }
                            <table className="job-table">
                                <tbody>

                                    <tr>
                                        <td><h3 className="mr-2 mt-3 mb-2  float-right"> Job  </h3></td>
                                        <td><h3 className="mt-3 mb-2 "> : </h3></td>
                                        <td><h3 className="ml-2 mt-3 mb-2  float-left"> <b>{jobApplication.name}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Job Field</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{jobApplication.field}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Experience Have</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{jobApplication.experience} Years</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Location Prefer</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{jobApplication.address}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Job Time Prefer</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{jobApplication.time}</b> </h4></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <h5 className="mt-5 mb-4"> {jobApplication.info} </h5>

                            <center>
                                <div className="cell" data-title="Field">
                                    <div className="button_cont mt-3" align="center">
                                        <a href={mail} type="submit" className="add-job" rel="nofollow noopener">Contact by Email</a>
                                    </div>
                                </div>
                            </center>
                        </div>
                        : null
                }
            </div>
        )
    }
}
