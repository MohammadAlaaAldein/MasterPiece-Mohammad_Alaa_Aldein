import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class Companies extends Component {

    state = {
        companies: null,
    }

    UNSAFE_componentWillMount() {
        this.getCompanies()
    }

    getCompanies = () => {
        axios.get("http://localhost:9000/getCompanies")
            .then(res => {
                let companies = res.data
                this.setState({ companies })
            })
    }


    deleteCompany = _id => {
        axios.post("http://localhost:9000/deleteCompany", { _id })
            .then(res => {
                console.log(res.data)
                window.location.reload()
            })
    }


    searchCompany = async event => {
        event.preventDefault()
        let field = event.target["field"].value.toLowerCase()
        console.log(field)
        axios.post("http://localhost:9000/searchCompany", { field })
            .then(res => {
                let companies = res.data
                this.setState({ companies })
            })
    }

    render() {
        const { companies } = this.state

        return (
            <div>
                <div className="row">

                    <div className="col">
                        <button className="ml-5">
                            <Link to="/AddCompany">Add Company</Link>
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div className="col">
                        <form onSubmit={this.searchCompany}>
                            <select defaultValue="Defult" name="field">
                                <option disabled>Job Field</option>
                                <option value="IT">IT</option>
                                <option value="Development">Development</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Accounting">Accounting</option>
                            </select>
                            <input type="submit" value="Search" />
                        </form>
                    </div>

                </div>


                <div className="d-flex flex-warp">
                    {
                        companies !== null ?
                            companies.map((company, key) => {
                                return (
                                    <div key={key} className="card ml-5 mt-5" style={{ width: "18rem" }}>
                                        {/* <img src="..." className="card-img-top" alt="..."> */}
                                        <div className="card-body">
                                            <h5 className="card-title">{company.name}</h5>
                                        </div>
                                        {/* <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> {} </li>
                                        <li className="list-group-item"> {} </li>
                                        <li className="list-group-item"> {} </li>
                                    </ul> */}
                                        <div className="card-body">
                                            <Link className="card-link" to="Company"
                                                onClick={() => localStorage.setItem("company", company._id)}
                                            >
                                                More Info
                                        </Link>
                                        </div>
                                        <br />

                                        {
                                            localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === company.user_id ?
                                                <button onClick={() => this.deleteCompany(company._id)} > Delete </button>
                                                :
                                                null
                                        }
                                    </div>
                                )
                            })
                            : null
                    }
                </div>
            </div >
        )
    }
}
