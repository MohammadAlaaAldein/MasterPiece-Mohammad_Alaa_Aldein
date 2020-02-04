import React, { Component } from 'react'
import axios from "axios"

export default class Company extends Component {

    state = {
        company: null,
    }

    UNSAFE_componentWillMount() {
        this.getCompany()
    }

    getCompany = () => {
        let _id = localStorage.getItem("company")
        axios.post("http://localhost:9000/getCompany", { _id })
            .then(res => {
                let company = res.data
                this.setState({ company })
            })
    }


    render() {
        const { company} = this.state
        return (
            <div className="job">
                {
                    company !== null ?
                        <div className="job-content">
                            <table className="job-table">
                                <tbody>

                                    <tr>
                                        <td><h3 className="mr-2 mt-5 mb-2  float-right"> Company  </h3></td>
                                        <td><h3 className="mt-5 mb-2 "> : </h3></td>
                                        <td><h3 className="ml-2 mt-5 mb-2  float-left"> <b>{company.name}</b> </h3></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Company Field</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.field}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right"> Products</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.products}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Location</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.address}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Working Hours</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.time}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Website</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.website}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Email</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.email}</b> </h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4 className="mr-2 mb-2 float-right">Phone</h4></td>
                                        <td><h4 className="mb-2 "> : </h4></td>
                                        <td><h4 className="ml-2 mb-2 float-left"><b>{company.phone}</b> </h4></td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="mt-4 mb- 2"> <b>More About Company</b> </h3>
                            <h5 className="mb-2"> {company.info} </h5>

                        </div>
                        : null
                }
            </div>
        )
    }
}
