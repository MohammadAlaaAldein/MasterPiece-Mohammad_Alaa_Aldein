import React, { Component } from 'react'
import axios from "axios"

export default class Profile extends Component {

    state = {
        user: null,
        mail: null
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
                this.setState({ mail: `mailto:${user.email}` })
            })
    }

    render() {
        const { user, mail } = this.state
        return (
            <div className="job">
                {
                    user !== null ?
                        <div className="job-content">
                            <table className="job-table mt-5">
                                <tbody>

                                    <tr>
                                        <td><h3 className="mr-3 mt-3 mb-2  float-right"> Name  </h3></td>
                                        <td><h3 className="mt-3 mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mt-3 mb-2  float-left"> <b>{user.name}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h3 className="mr-3 mb-2 float-right"> Email</h3></td>
                                        <td><h3 className="mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mb-2 float-left"><b>{user.email}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h3 className="mr-3 mb-2 float-right"> Mobile Phone</h3></td>
                                        <td><h3 className="mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mb-2 float-left"><b>{user.phone}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h3 className="mr-3 mb-2 float-right">Job Field</h3></td>
                                        <td><h3 className="mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mb-2 float-left"><b>{user.field}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h3 className="mr-3 mb-2 float-right">Address</h3></td>
                                        <td><h3 className="mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mb-2 float-left"><b>{user.address}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h3 className="mr-3 mb-2 float-right">Experience Have</h3></td>
                                        <td><h3 className="mb-2 "> : </h3></td>
                                        <td><h3 className="ml-3 mb-2 float-left"><b>{user.experience} Years</b> </h3></td>
                                    </tr>

                                </tbody>
                            </table>


                            <h3 className="mt-4 mb-2"> <b>Bio</b> </h3>
                            <h5 className="mb-2"> {user.info} </h5>

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
