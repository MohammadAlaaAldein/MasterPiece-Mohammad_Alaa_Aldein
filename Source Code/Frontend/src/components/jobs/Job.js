import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

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
        // console.log(this.state.user)
        if (this.state.user !== null) {
            return (
                this.state.job.applied.map(applier => {
                    // console.log(applier)
                    if (applier === localStorage.getItem("user_id")) {
                        this.setState({ apply: "disabled" })
                        // console.log(applier)
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
        const { job, user, apply } = this.state
        // console.log(this.state.apply)
        return (
            <div>
                {
                    job !== null ?
                        <div>
                            {
                                user !== null ?
                                    <Link to="profile"
                                        onClick={() => localStorage.setItem("profile", user._id)}
                                    > {user.name} </Link>
                                    : null
                            }
                            <h4> {job.name} </h4>
                            <h4> {job.field} </h4>
                            <h4> {job.experience} </h4>
                            <h4> {job.address} </h4>
                            <h4> {job.info} </h4>
                            <h4> {job.type} </h4>
                            <h4> {job.company} </h4>
                            <h4> {job.salary} </h4>
                            {
                                apply === null ?
                                    localStorage.getItem("user_id") !== job.user_id ?
                                        <button
                                            onClick={this.applyJob}
                                        > Apply Now </button>
                                        :
                                        <>
                                            <br />
                                            <h4> You are job owner, check your dashboard to show applier</h4>
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
