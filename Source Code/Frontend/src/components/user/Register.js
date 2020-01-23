import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import "../../Design/register/css/register.css"

export default class Register extends Component {

    state = {
        msg: null
    }


    register = async event => {
        event.preventDefault()
        let name = event.target["name"].value
        let email = event.target["email"].value
        let password = event.target["password"].value
        let repassword = event.target["repassword"].value
        let phone = null
        let field = null
        let address = null
        let experience = null
        let info = null
        let role = "user"

        let newUser = { name, email, password, phone, field, address, experience, info, role }

        name === "" || email === "" || password === "" || repassword === "" ?
            this.setState({ msg: "Please fill all fields" })
            :
            password === repassword ?
                axios.post("http://localhost:9000/register", newUser)
                    .then(res => {
                        if (res.data === "already registered") {
                            this.setState({ msg: "This account is already exist, You can" })
                        }
                        else {
                            let user = res.data
                            // console.log(user)
                            localStorage.setItem("user_id", user._id)
                            localStorage.setItem("role", user.role)
                            this.props.refresh()
                            this.props.msg(user.name)
                        }
                    })
                : this.setState({ msg: "Passwords is not match" })
    }


    render() {
        const { msg } = this.state
        return (
            <div className="register-body">

                <div className="main ">

                    <section className="signup">
                        <div className="register-container">
                            <div className="register-signup-content">
                                <form method="POST" id="signup-form" className="signup-form" onSubmit={this.register}>
                                    <h2 className="form-title register-h2">Create account</h2>
                                    <div className="register-form-group">
                                        <input type="text" className="register-input register-form-input" name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="register-form-group">
                                        <input type="email" className="register-input register-form-input" name="email" id="email" placeholder="Your Email" />
                                    </div>
                                    <div className="register-form-group">
                                        <input type="password" className="register-input register-form-input" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <div className="register-form-group">
                                        <input type="password" className="register-input register-form-input" name="repassword" id="re_password" placeholder="Repeat your password" />
                                    </div>
                                    <div className="register-form-group">
                                        <input type="submit" name="submit" id="submit" className="register-input register-form-submit" value="Sign up" />
                                    </div>
                                </form>

                                <p className="register-loginhere register-p">
                                    Have already an account ? <Link to="Login" className="register-loginhere-link">Login here</Link>
                                </p>
                                {
                                    msg === null ?
                                        <p className="text-white register-loginhere register-p text-center">.</p>
                                        :
                                        msg !== "This account is already exist, You can" ?
                                            < p className="register-loginhere register-p text-center text-danger"> {msg} </p>
                                            :
                                            < p className="register-loginhere register-p text-center text-danger"> {msg}  <Link to="Login" className="register-loginhere-link">Login</Link></p>

                                }

                              </div>
                        </div>
                    </section>
                </div>
            </div >
            // {/* // <div className="registerBody">
            // //     <h4>Please Register</h4>
            // //     <form onSubmit={this.register} >
            // //         <input type="text" name="name" placeholder="Name" />
            // //         <br />
            // //         <br />
            // //         <input type="email" name="email" placeholder="Email" />
            // //         <br />
            // //         <br />
            // //         <input type="password" name="password" placeholder="Password" />
            // //         <br />
            // //         <br />
            // //         <input type="password" name="repassword" placeholder="Re password" />
            // //         <br />
            // //         <br />
            // //         <input type="submit" value="Register" />
            // //     </form>
            // //     <Link to="Login"> You already registered? Login now </Link>
            // //     <h4> {this.state.msg} </h4>
            // // </div> */}
        )
    }
}
