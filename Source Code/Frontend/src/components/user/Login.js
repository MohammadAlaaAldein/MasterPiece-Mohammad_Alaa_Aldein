import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import "../../Design/login/css/login.css"

export default class Login extends Component {

    state = {
        msg: null
    }

    login = async event => {
        event.preventDefault()

        let email = event.target["email"].value
        let password = event.target["password"].value
        let user = { email, password }

        email === "" || password === "" ?
            this.setState({ msg: "Please fill all field" })
            :
            axios.post("http://localhost:9000/login", user)
                .then(res => {
                    let user = res.data
                    console.log(user)
                    if (user !== null) {
                        localStorage.setItem("user_id", user._id)
                        localStorage.setItem("role", user.role)
                        this.props.refresh()
                        this.props.msg(user.name)
                        this.props.history.goBack()
                    }
                    else {
                        this.setState({ msg: "Email or Password is Incorrect" })
                        console.log(this.state.msg)
                    }
                })
    }

    render() {
        const { msg } = this.state
        return (
            // <div>
            //     <h4>Please Login</h4>
            //     <form onSubmit={this.login} >
            //         <input type="email" name="email" placeholder="Email" />
            //         <br />
            //         <br />
            //         <input type="password" name="password" placeholder="Password" />
            //         <br />
            //         <br />
            //         <input type="submit" value="Login" />
            //     </form>
            //     <Link to="Register"> You don't have account? Register now </Link>
            //     <h4> {this.state.msg} </h4>
            // </div>



            <div className="login-body">

                <div className="main ">

                    <section className="signup">
                        <div className="login-container">
                            <div className="login-signup-content">
                                <form method="POST" id="signup-form" className="signup-form" onSubmit={this.login}>
                                    <h2 className="form-title login-h2">Login</h2>

                                    <div className="login-form-group">
                                        <input type="email" className="login-input login-form-input" name="email" id="email" placeholder="Your Email" />
                                    </div>

                                    <div className="login-form-group">
                                        <input type="password" className="login-input login-form-input" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <div className="login-form-group">
                                        <input type="submit" name="submit" id="submit" className="login-input login-form-submit" value="Login" />
                                    </div>
                                </form>

                                <p className="login-loginhere login-p">
                                    Dont have an account ? <Link to="Register" className="login-loginhere-link">Create Account Now</Link>
                                </p>

                                {
                                    msg === null ?
                                        <p className="login-loginhere login-p text-center text-white">.</p>
                                        :
                                        <p className="login-loginhere login-p text-center text-danger"> {msg} </p>
                                }

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
