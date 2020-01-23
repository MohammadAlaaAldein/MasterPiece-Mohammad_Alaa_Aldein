import React, { Component } from 'react'
import axios from "axios"

export default class Profile extends Component {

    state = {
        user: null,
    }


    UNSAFE_componentWillMount() {
        this.getLoggedInUser()
    }

    getLoggedInUser = () => {
        let _id = localStorage.getItem("profile")
        axios.post("http://localhost:9000/getLoggedInUser", { _id })
            .then(res => {
                let user = res.data
                this.setState({ user })
            })
    }

    render() {
        const { user } = this.state
        return (
            <div>
                {
                    user !== null ?
                        <div>
                            <h4> {user.name} </h4>
                            <h4> {user.email} </h4>
                            <h4> {user.phone} </h4>
                            <h4> {user.field} </h4>
                            <h4> {user.phone} </h4>
                            <h4> {user.cv} </h4>
                            <h4> {user.address} </h4>
                            <h4> {user.experience} </h4>
                            <h4> {user.born} </h4>
                            <h4> {user.info} </h4>

                        </div>



                        : null
                }
            </div>
        )
    }
}
