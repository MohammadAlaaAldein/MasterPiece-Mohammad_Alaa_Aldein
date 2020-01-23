import React, { Component } from 'react'
import axios from "axios"
// import { Link } from "react-router-dom"

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
                // console.log(res.data)
                this.setState({ company: res.data })
            })
    }


    render() {
        const { company } = this.state
        return (
            <div>
                {
                    company !== null ?
                        <div>
                            <h4> {company.name} </h4>
                            <h4> {company.field} </h4>
                            <h4> {company.products} </h4>
                            <h4> {company.address} </h4>
                            <h4> {company.time} </h4>
                            <h4> {company.info} </h4>
                        </div>
                        : null
                }
            </div>
        )
    }
}
