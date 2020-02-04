import React, { Component } from 'react'
import axios from 'axios'
import "../../Design/job/job.css"

export default class Job extends Component {

    state = {
        job: null,
        user: null,
        apply: null,
    }


    UNSAFE_componentWillMount() {
        let job_id = localStorage.getItem("job")
        axios.post("http://localhost:9000/getJob", { job_id })
            .then(res => {
                let job = res.data
                this.setState({ job })
                let _id = job.user_id
                axios.post("http://localhost:9000/getLoggedInUser", { _id })
                    .then(res => {
                        this.setState({ user: res.data })
                        this.checkApply()
                    })
            })
    }



    checkApply = () => {
        if (this.state.user !== null) {
            return (
                this.state.job.applied.map(applier => {
                    if (applier === localStorage.getItem("user_id")) {
                        this.setState({ apply: "disabled" })
                    }
                })
            )
        }
    }

    // Apply to Job Function

    applyJob = () => {
        if (localStorage.getItem("user_id") !== "null") {
            let _id = localStorage.getItem("job")
            this.state.job.applied.push(localStorage.getItem("user_id"))
            let applied = this.state.job.applied
            this.setState({ applied })
            axios.post("http://localhost:9000/applyJob", { _id, applied })
                .then(res => {
                    window.location.reload()
                })
        }
        else {
            this.props.history.push("Login")
        }
    }

    render() {
        const { job, apply } = this.state
        return (
            <div className="job">
                {
                    job !== null ?
                        <div className="job-content">
                            <table className="job-table">
                                <tbody>

                                    <tr>
                                        <td><h3 className="mr-2 mt-5 mb-2  float-right"> Job  </h3></td>
                                        <td><h3 className="mt-5 mb-2 "> : </h3></td>
                                        <td><h3 className="ml-2 mt-5 mb-2  float-left"> <b>{job.name}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Job Field</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{job.field}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Experience Needed</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{job.experience} Years</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Location</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{job.address}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Job Time</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{job.time}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Company</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{job.company}</b> </h4></td>
                                    </tr>
                                    {
                                        job.salary === null ?
                                            <tr>
                                                <td><h4 className="mr-2 mb-2 float-right">Salary</h4></td>
                                                <td><h4 className="mb-2 "> : </h4></td>
                                                <td><h4 className="ml-2 mb-2 float-left"><b>Determine When Agree</b> </h4></td>
                                            </tr>
                                            :
                                            <tr>
                                                <td><h4 className="mr-2 mb-2 float-right">Salary</h4></td>
                                                <td><h4 className="mb-2 "> : </h4></td>
                                                <td><h4 className="ml-2 mb-2 float-left"><b>{job.salary}</b> </h4></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                            <h5 className="mt-3 mb-5"> {job.info} </h5>
                            {
                                apply === null ?
                                    localStorage.getItem("user_id") !== job.user_id ?
                                        <div className="cell" data-title="Field">
                                            <div className="button_cont mt-3" align="center">
                                                <button onClick={this.applyJob} type="submit" className="add-job apply-job" rel="nofollow noopener">Apply Job</button>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            <br />
                                            <h4> You are job owner, check your dashboard to show applicants</h4>
                                        </>
                                    :
                                    <>
                                        <br />
                                        <h4> Thank You for apply to this job before Good Luck ^_^ </h4>
                                    </>
                            }
                        </div>
                        : null
                }
            </div>
        )
    }
}
