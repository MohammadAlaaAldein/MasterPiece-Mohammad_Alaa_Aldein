import React, { Component } from 'react'
import axios from "axios"

export default class AddJobApplication extends Component {

    state = {
        msg: null
    }


    addJobApplication = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let experience = event.target["experience"].value
        let address = event.target["address"].value
        let time = event.target["time"].value
        let info = event.target["info"].value

        let jobApplication = { name, user_id, field, experience, address, time, info }
        axios.post("http://localhost:9000/addJobApplication", jobApplication)
            .then(res => {
            })
            this.setState({msg:"Your Seek Submitted, Good Luck ^_^"})
    }


    render() {
        const { msg } = this.state
        return (


            <div className="ajcontainer-contact100 ajabg" >

                <div className="ajwrap-contact100">
                    <div className="ajcontact100-form-title ajatbg">
                        <span className="ajcontact100-form-title-1">
                            Job Seek
                                </span>
                    </div>

                    <form className="ajcontact100-form validate-form" onSubmit={this.addJobApplication}>

                        <div className="ajwrap-input100 ajvalidate-input" data-validate="Name is required" >
                            <input className="ajinput ajinput100" type="text" name="name" placeholder="Job Seek Name" />
                        </div>

                        <div className="row">
                            <div className="col time ml-3 ajwrap-input100 ajvalidate-input" >
                                <select name="field" className="ajinput ajinput100">
                                    <option className="dropdown-item">Job Seek Field</option>
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

                            <div className="col time ml-4 ajwrap-input100 ajvalidate-input" >
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
                                <input className="ajinput ajinput100" type="number" name="experience" placeholder="Experience You Have" />
                            </div>

                            <div className="col ml-4 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="address" placeholder="Address Prefer" />
                            </div>

                        </div>

                        <div className="ajwrap-input100 ajvalidate-input">
                            <textarea className="ajtextarea ajinput100" name="info" placeholder="More Info About Job ..."></textarea>
                        </div>

                        <div className="ajcontainer-contact100-form-btn">
                            <button type="submit" className="ajbutton ajcontact100-form-btn">
                                <span>
                                    Add Job Seek
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
