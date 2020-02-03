import React, { Component } from 'react'
import axios from "axios"
import "../../Design/addJob/addJob.css"

export default class AddJob extends Component {

    state = {
        msg: null
    }


    addJob = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let experience = event.target["experience"].value
        // let salary = event.target["salary"].value
        let address = event.target["address"].value
        let time = event.target["time"].value
        let company = event.target["company"].value
        let info = event.target["info"].value
        let job = { name, user_id, field, experience, address, time, company, info }

        axios.post("http://localhost:9000/addJob", job)
            .then(res => {
                console.log(res.data)
            })
        this.setState({ msg: "Job Submitted, Thank You ^_^" })
    }

    render() {
        const { msg } = this.state
        return (

            // {/* 


            //             // <div>
            //             //     <form onSubmit={this.addJob} >
            //             //         <input type="text" name="name" placeholder="Job Name" />
            //             //         <br /><br />
            //             //         <select defaultValue="Defult" name="field">
            //             //             <option disabled>Job Field</option>
            //             //             <option value="IT">IT</option>
            //             //             <option value="Development">Development</option>
            //             //             <option value="Health">Health</option>
            //             //             <option value="Engineering">Engineering</option>
            //             //             <option value="Education">Education</option>
            //             //             <option value="Trade">Trade</option>
            //             //             <option value="Managment">Managment</option>
            //             //             <option value="Business">Business</option>
            //             //             <option value="Others">Others</option>
            //             //         </select>
            //             //         <br /><br />
            //             //         <input type="text" name="company" placeholder="Company Name" />
            //             //         <br /><br />
            //             //         <input type="number" name="experience" placeholder="Experience needed" />
            //             //         <br /><br />
            //             //         <input type="number" name="salary" placeholder="Salary" />
            //             //         <br /><br />
            //             //         <select defaultValue="Defult" name="time">
            //             //             <option disabled>Job Time</option>
            //             //             <option value="Any">Any</option>
            //             //             <option value="Full Time">Full Time</option>
            //             //             <option value="Part Time">Part Time</option>
            //             //             <option value="Training">Training</option>
            //             //             <option value="Contract">Contract</option>
            //             //             <option value="Freelancer">Freelancer</option>
            //             //             <option value="Temporary">Temporary</option>
            //             //             <option value="Consultants">Consultants</option>
            //             //         </select>
            //             //         <br /><br />
            //             //         <input type="text" name="address" placeholder="Job Address" />
            //             //         <br /><br />
            //             //         <textarea type="text" name="info" placeholder="More Info"></textarea>
            //             //         <br /><br />
            //             //         <input type="submit" value="Add Job" />
            //             //     </form>
            //             // </div>

            <div className="ajcontainer-contact100 ajbg" >
                <div className="ajwrap-contact100">
                    <div className="ajcontact100-form-title ajtbg">
                        <span className="ajcontact100-form-title-1">
                            Job Opportunity
                                </span>
                    </div>

                    <form className="ajcontact100-form validate-form " onSubmit={this.addJob}>

                        <div className="row">
                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" data-validate="Name is required">
                                <input className="ajinput ajinput100" type="text" name="name" placeholder="Job Name" />
                            </div>

                            <div className="col ml-4 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="company" placeholder="Company Name" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col time ml-3 ajwrap-input100 ajvalidate-input" >
                                <select name="field" className="ajinput ajinput100">
                                    <option className="dropdown-item">Job Field</option>
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
                            </div>

                            <div className="col time ml-3 ajwrap-input100 ajvalidate-input" >
                                <select name="time" className="ajinput ajinput100">
                                    <option className="dropdown-item">Time</option>
                                    <option className="dropdown-item" value="Full Time">Full Time</option>
                                    <option className="dropdown-item" value="Part Time">Part Time</option>
                                    <option className="dropdown-item" value="Training">Training</option>
                                    <option className="dropdown-item" value="Contract">Contract</option>
                                    <option className="dropdown-item" value="Freelancer">Freelancer</option>
                                    <option className="dropdown-item" value="Temporary">Temporary</option>
                                    <option className="dropdown-item" value="Consultant">Consultant</option>
                                    <option className="dropdown-item" value="Any">Any</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="number" name="experience" placeholder="Experience Needed" />
                            </div>

                            <div className="col ml-4 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="address" placeholder="Address" />
                            </div>

                        </div>


                        <div className="ajwrap-input100 ajvalidate-input">
                            <textarea className="ajtextarea ajinput100" name="info" placeholder="More Info About Job ..."></textarea>
                        </div>

                        <div className="ajcontainer-contact100-form-btn">
                            <button type="submit" className="ajbutton ajcontact100-form-btn">
                                <span>
                                    Add Job
                                            <i className="fa fa-long-arrow-right m-l-7 ml-2" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                    {
                        msg === null ?
                            <p style={{ color: "white" }}>.</p>
                            :
                            <p className="msg">{msg} </p>
                    }
                </div>
            </div>

        )
    }
}
