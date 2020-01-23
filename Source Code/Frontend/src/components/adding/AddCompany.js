import React, { Component } from 'react'
import axios from "axios"

export default class AddCompany extends Component {

    addCompany = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let products = event.target["products"].value.split(",")
        let address = event.target["address"].value
        let time = event.target["time"].value
        let info = event.target["info"].value

        let company = { name, user_id, field, products, address, time, info }
        console.log(company)
        axios.post("http://localhost:9000/addCompany", company)
            .then(res => {
                console.log("RES DATA : ", res.data)
            })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.addCompany} >
                    <input type="text" name="name" placeholder="Company Name" /><br />
                    <select defaultValue="Defult" name="field">
                        <option disabled>Job Field</option>
                        <option value="IT">IT</option>
                        <option value="Development">Development</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Accounting">Accounting</option>
                    </select><br />
                    <textarea type="text" name="products" placeholder="Company Products" ></textarea><br />
                    <input type="text" name="address" placeholder="Company Address" /><br />
                    <input type="text" name="time" placeholder="Company Work Time" /><br />
                    <textarea name="info" placeholder="More info about Company" ></textarea><br />
                    <input type="submit" value="Add Job Application" />
                </form>
            </div>
        )
    }
}
