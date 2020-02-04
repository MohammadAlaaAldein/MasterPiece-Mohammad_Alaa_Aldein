import React, { Component } from 'react'
import axios from "axios"

export default class AddCompany extends Component {

    state = {
        msg: null
    }


    addCompany = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let user_id = localStorage.getItem("user_id")
        let field = event.target["field"].value
        let products = event.target["products"].value.split(",")
        let address = event.target["address"].value
        let time = event.target["time"].value
        let website = event.target["website"].value
        let email = event.target["email"].value
        let phone = event.target["phone"].value
        let info = event.target["info"].value

        let company = { name, user_id, field, products, address, time, website, email, phone, info }
        axios.post("http://localhost:9000/addCompany", company)
            .then(res => {
            })
        this.setState({ msg: "Company added" })
    }


    render() {
        const { msg } = this.state
        return (

            <div className="ajcontainer-contact100 acbg" >

                <div className="ajwrap-contact100">
                    <div className="ajcontact100-form-title actbg">
                        <span className="ajcontact100-form-title-1">
                            Add Company
                        </span>
                    </div>

                    <form className="ajcontact100-form validate-form" onSubmit={this.addCompany} style={{ marginTop: "-10px" }}>

                        <div className="row">
                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" data-validate="Name is required" >
                                <input className="ajinput ajinput100" type="text" name="name" placeholder="Name" />
                            </div>
                            <div className="col ml-4 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="address" placeholder="Address" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col time ml-3 ajwrap-input100 ajvalidate-input" >
                                <select name="field" className="ajinput ajinput100">
                                    <option className="dropdown-item">Working Field</option>
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

                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="time" placeholder="Working Hours" />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="products" placeholder="Products" />
                            </div>

                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="text" name="website" placeholder="Website" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="email" name="email" placeholder="Email" />
                            </div>

                            <div className="col ml-3 ajwrap-input100 ajvalidate-input" >
                                <input className="ajinput ajinput100" type="number" name="phone" placeholder="Phone" />
                            </div>
                        </div>

                        <div className="ajwrap-input100 ajvalidate-input">
                            <textarea className="ajtextarea ajinput100" name="info" placeholder="More Info About Company ..."></textarea>
                        </div>

                        <div style={{ marginBottom: "-20px" }} className="ajcontainer-contact100-form-btn">
                            <button type="submit" className="ajbutton ajcontact100-form-btn">
                                <span>
                                    Add Company
                                            <i className="fa fa-long-arrow-right m-l-7 ml-2" aria-hidden="true"></i>
                                </span>
                            </button>
                            {
                                msg === null ?
                                    <p className="company-msg" style={{ color: "white" }} >.</p>
                                    :
                                    <p className="company-msg">{msg} </p>
                            }

                        </div>
                    </form>
                </div>
            </div>




        )
    }
}
