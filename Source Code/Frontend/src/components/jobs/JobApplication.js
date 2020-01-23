import React, { Component } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

export default class JobApplication extends Component {

    state = {
        jobApplication: null,
        user: null
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
                        // console.log(res.data)
                        this.setState({ user: res.data })
                    })

            })
    }

    render() {
        const { jobApplication, user } = this.state
        return (
            <div>
                {
                    jobApplication !== null ?
                        <div>
                            {
                                user !== null ?
                                    <Link to="profile"
                                        onClick={() => localStorage.setItem("profile", user._id)}
                                    > <h4>{user.name}</h4> </Link>
                                    : null
                            }
                            <h4> {jobApplication.name} </h4>
                            <h4> {jobApplication.field} </h4>
                            <h4> {jobApplication.experience} </h4>
                            <h4> {jobApplication.address} </h4>
                            <h4> {jobApplication.type} </h4>

                        </div>
                        : null
                }
            </div>
        )
    }
}
