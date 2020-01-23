import React, { Component } from 'react'
import axios from "axios"

export default class AddJob extends Component {

    addJob = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let experience = event.target["experience"].value
        let salary = event.target["salary"].value
        let address = event.target["address"].value
        let time = event.target["time"].value
        let company = event.target["company"].value
        let info = event.target["info"].value
        let job = { name, user_id, field, experience, salary, address, time, company, info }

        axios.post("http://localhost:9000/addJob", job)
            .then(res => {
                console.log(res.data)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addJob} >
                    <input type="text" name="name" placeholder="Job Name" />
                    <br /><br />
                    <select defaultValue="Defult" name="field">
                        <option disabled>Job Field</option>
                        <option value="IT">IT</option>
                        <option value="Development">Development</option>
                        <option value="Medicine">Health</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Accounting">Education</option>
                        <option value="Accounting">Trade</option>
                        <option value="Accounting">Managment</option>
                        <option value="Accounting">Business</option>
                        <option value="Accounting">Others</option>
                    </select>
                    <br /><br />
                    <input type="text" name="company" placeholder="Company Name" />
                    <br /><br />
                    <input type="number" name="experience" placeholder="Experience needed" />
                    <br /><br />
                    <input type="number" name="salary" placeholder="Salary" />
                    <br /><br />
                    <select defaultValue="Defult" name="time">
                        <option disabled>Job Time</option>
                        <option value="Any">Any</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Training">Training</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Consultants">Consultants</option>
                    </select>
                    <br /><br />
                    <input type="text" name="address" placeholder="Job Address" />
                    <br /><br />
                    <input type="text" name="info" placeholder="More Info" />
                    <br /><br />
                    <input type="submit" value="Add Job" />
                </form>
            </div>
        )
    }
}
