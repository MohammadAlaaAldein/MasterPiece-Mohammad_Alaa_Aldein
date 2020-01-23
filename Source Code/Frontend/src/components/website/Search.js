import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <form className="form-inline my-2 my-lg-0 ml-5">
                <input className="form-control pr-5 mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}
