import React, { Component } from 'react'
import axios from 'axios'
import "../../Design/contactus/css/contactus.css"

export default class Contactus extends Component {

    state = {
        user: null,
        msg: null
    }


    UNSAFE_componentWillMount() {
        let _id = localStorage.getItem("user_id")
        if (_id !== "null") {
            axios.post("http://localhost:9000/getLoggedInUser", { _id })
                .then(res => {
                    let user = res.data
                    this.setState({ user })
                })
        }
    }

    contactus = event => {
        event.preventDefault()
        let name = event.target["name"].value
        let email = event.target["email"].value
        let message = event.target["message"].value
        let status = "unreaded"

        let contact = { name, email, message, status }

        axios.post("http://localhost:9000/contactus", contact)
            .then(res => {
                console.log(res.data)
            })
        // window.location.reload()
        this.setState({ msg: "Message Sent, Thank You ^_^" })
    }

    render() {
        const { user, msg } = this.state
        return (
            //     <div>
            //         <form onSubmit={this.contactus}>
            //             {
            //                 user !== null ?
            //                     <>
            //                         <input name="name" type="text" defaultValue={user.name} />
            //                         <br />
            //                         <input name="email" type="email" defaultValue={user.email} />
            //                         <br />
            //                         <textarea name="message"></textarea>
            //                         <br />
            //                         <input type="submit" value="Send Message" />
            //                     </>
            //                     : null
            //             }

            //         </form>
            //     </div>
            // )


            <div className="container-contact100">
                {/* <div className="contact100-map" id="google_map" data-map-x="40.722047" data-map-y="-73.986422" data-pin="images/icons/map-marker.png" data-scrollwhell="0" data-draggable="1"></div> */}

                <div className="wrap-contact100">
                    <div className="contact100-form-title ">
                        <span className="contact100-form-title-1">
                            Contact Us
				        </span>

                        <span className="contact100-form-title-2">
                            Feel free to drop us a line below!
				        </span>
                    </div>

                    <form className="contact100-form validate-form" onSubmit={this.contactus}>
                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                            <span className="label-input100">Full Name</span>
                            {
                                user !== null ?
                                    <input className="contact-input input100" type="text" name="name" defaultValue={user.name} />
                                    :
                                    <input className="contact-input input100" type="text" name="name" placeholder="Your Name" />
                            }
                            <span className="focus-input100"></span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <span className="label-input100">Email</span>
                            {
                                user !== null ?
                                    <input className="contact-input input100" type="text" name="email" defaultValue={user.email} />
                                    :
                                    <input className="contact-input input100" type="text" name="email" placeholder="Your Email" />
                            }
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Message is required">
                            <span className="label-input100">Message</span>
                            <textarea className="input100" name="message" placeholder="Your Message..."></textarea>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn contact-button">
                                <span>
                                    Send Message
							        <i className="ml-2 fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                    {
                        msg === null ?
                            <p style={{ color: "white" }}> . </p>
                            :
                            <p className="msg"> {msg} </p>

                    }
                </div>
            </div>

        )
    }
}
