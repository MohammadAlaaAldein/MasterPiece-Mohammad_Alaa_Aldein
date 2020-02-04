import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class Companies extends Component {

    state = {
        companies: null,
        msg: null
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
            })
        this.setState({ msg: "Company Deleted" })
        this.getCompanies()
        this.getCompanies()
        this.getCompanies()
        setInterval(() => {
            this.setState({ msg: null })
        }, 4000);
    }


    searchCompany = async event => {
        event.preventDefault()
        let field = event.target["field"].value
        axios.post("http://localhost:9000/searchCompany", { field })
            .then(res => {
                let companies = res.data
                this.setState({ companies })
            })
    }

    render() {
        const { companies, msg } = this.state

        return (

            <div className="jobs">
                <div className="float-right mr-4 "  >

                    <div className="cell mt-5" data-title="Location">
                        <div className="button_cont" align="center"><Link to="AddCompany" className="add-job" rel="nofollow noopener">Add Company</Link></div>
                    </div>

                    <form className="mt-5" onSubmit={this.searchCompany}>
                        <select name="field" className="select-jobs">
                            <option className="dropdown-item">Company Field</option>
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
                        companies !== null ?
                            companies.map((company, key) => {
                                return (
                                    <div key={key} className="card mb-5" style={{ width: "80%" }}>
                                        <div className="card-body">
                                            <h4 className="card-title">{company.name}</h4>
                                            <h5 className="card-title">{company.field}</h5>
                                            <h5 className="card-title">{company.experience}</h5>
                                            <div className="button_cont float-left mt-3" align="center">
                                                <Link to="Company" onClick={() => localStorage.setItem("company", company._id)} className="add-job" rel="nofollow noopener">More Info</Link>
                                            </div>
                                            {
                                                localStorage.getItem("role") === "admin" || localStorage.getItem("user_id") === company.user_id ?
                                                    <div className="button_cont float-right" align="center">
                                                        <button className="read x fa fa-trash" rel="nofollow noopener" onClick={() => this.deleteCompany(company._id)}></button>
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
