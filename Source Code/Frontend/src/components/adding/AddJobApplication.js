import React, { Component } from 'react'
import axios from "axios"

export default class AddJobApplication extends Component {

    addJobApplication = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let experience = event.target["experience"].value
        let address = event.target["address"].value
        let salary = event.target["salary"].value
        let time = event.target["time"].value

        let jobApplication = { name, user_id, field, experience, address, salary, time }
        // console.log("JOB APPLICATION :  ", jobApplication)
        axios.post("http://localhost:9000/addJobApplication", jobApplication)
            .then(res => {
                console.log("RES DATA : ", res.data)
            })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.addJobApplication} >
                    <input type="text" name="name" placeholder="Job Name" /><br />
                    <select defaultValue="Defult" name="field">
                        <option disabled>Job Field</option>
                        <option value="IT">IT</option>
                        <option value="Development">Development</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Accounting">Accounting</option>
                    </select><br />
                    <input type="number" name="experience" placeholder="Your Experience in this job" /><br />
                    <input type="number" name="salary" placeholder="Salary" /><br />
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
                    </select><br />
                    <input type="text" name="address" placeholder="Address you prefer" /><br />
                    <textarea name="info" placeholder="More info" ></textarea><br />
                    <input type="submit" value="Add Job Application" />
                </form>
            </div>
        )
    }
}
