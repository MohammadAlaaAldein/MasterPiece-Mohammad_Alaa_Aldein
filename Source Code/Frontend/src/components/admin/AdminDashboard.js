import React, { Component } from 'react'
import axios from "axios"
import "../../Design/admindash/css/admindashboard.css"

export default class AdminDashboard extends Component {

    state = {
        messages: null,
        msg: null
    }


    UNSAFE_componentWillMount() {
        this.getMessages()
    }

    getMessages = () => {
        axios.get("http://localhost:9000/getMessages")
            .then(res => {
                // console.log(res.data)
                this.setState({ messages: res.data })
            })
    }


    getAllMessages = () => {
        axios.get("http://localhost:9000/getAllMessages")
            .then(res => {
                let messages = res.data
                this.setState({ messages })
            })
    }


    readMessage = _id => {
        axios.post("http://localhost:9000/readMessage", { _id })
            .then(res => {
                console.log(res.data)
            })
        this.setState({ msgread: "Message marked as readed" })
        this.getMessages()
        this.getMessages()
        this.getMessages()
        setInterval(() => {
            this.setState({ msgread: null })
        }, 4000);
    }


    deleteMessage = _id => {
        axios.post("http://localhost:9000/deleteMessage", { _id })
            .then(res => {
                console.log(res.data)
            })
        // window.location.reload()
        this.setState({ msgdelete: "Message has been deleted" })
        this.getMessages()
        this.getMessages()
        this.getMessages()
        setInterval(() => {
            this.setState({ msgdelete: null })
        }, 4000);
    }




    render() {
        const { messages, msgdelete,msgread } = this.state
        return (
            <div className="limiter">
                <p className="admindelete"> {msgdelete} </p>
                <p className="adminread"> {msgread} </p>

                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="button_cont" align="center" onClick={this.getAllMessages}><button className="read show mb-5" rel="nofollow noopener">Show All Messages</button></div>
                        <div className="table">
                            <div className="admindashboard-row header">
                                <div className="cell">NO</div>
                                <div className="cell">Name</div>
                                <div className="cell">Email</div>
                                <div className="cell">Message</div>
                                <div className="cell">Actions</div>
                            </div>

                            {
                                messages !== null ?
                                    messages.map((message, key) => {
                                        return (
                                            <div className="admindashboard-row" key={key}>
                                                <div className="cell" data-title="No">
                                                    {key + 1}
                                                </div>
                                                <div className="cell" data-title="Name">
                                                    {message.name}
                                                </div>
                                                <div className="cell" data-title="Email">
                                                    {message.email}
                                                </div>
                                                <div className="cell" data-title="Message">
                                                    {message.message}
                                                </div>
                                                <div className="cell " data-title="Location">
                                                    <div className="button_cont float-left ml-4" align="center" onClick={() => this.readMessage(message._id)}><button className="read" rel="nofollow noopener">Mark as Readed</button></div>
                                                    <div className="button_cont" align="center"><button className="read x fa fa-trash" onClick={() => this.deleteMessage(message._id)} rel="nofollow noopener"></button></div>
                                                </div>
                                            </div>

                                        )
                                    })
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>


            // <div className="row">
            //     <div className="col-2">
            //     </div>

            //     <div className="col-8">
            //         <table className="table">
            //             <thead>
            //                 <tr>
            //                     <td> NO </td>
            //                     <td> Name </td>
            //                     <td> Email </td>
            //                     <td> Message </td>
            //                     <td> Actions </td>
            //                 </tr>
            //             </thead>

            //             <tbody>
            //                 {
            //                     messages !== null ?
            //                         messages.map((message, key) => {
            //                             return (
            //                                 <tr key={key}>
            //                                     <td> {key + 1} </td>
            //                                     <td> {message.name} </td>
            //                                     <td> {message.email} </td>
            //                                     <td> {message.message} </td>
            //                                     <td>
            //                                         <button className="btn btn-success mr-2" onClick={() => this.readMessage(message._id)} > Check as readed </button>
            //                                         <button className="btn btn-danger" onClick={() => this.deleteMessage(message._id)}> Delete </button>
            //                                     </td>
            //                                 </tr>
            //                             )
            //                         })
            //                         : null
            //                 }
            //             </tbody>
            //         </table>
            //     </div>
            //     <div className="col-2">
            //         <button onClick={this.getAllMessages}>
            //             Show All Messages
            //         </button>
            //     </div>

            // </div>
        )
    }
}
