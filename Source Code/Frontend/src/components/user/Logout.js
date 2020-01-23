import React, { Component } from 'react'

export default class Logout extends Component {

    UNSAFE_componentWillMount() {
        this.logout()
    }

    logout = async () => {
        localStorage.setItem("user_id", null)
        this.props.refresh()
        // this.props.refresh()
        this.props.history.push("/home")
    }

    render() {
        return (
            <>
            </>
        )
    }
}
