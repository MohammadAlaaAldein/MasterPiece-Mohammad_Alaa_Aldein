import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

import AddJob from "./components/adding/AddJob"
import AddCompany from "./components/adding/AddCompany"
import AddJobApplication from "./components/adding/AddJobApplication"

import Home from "./components/website/Home"
import Header from "./components/website/Header"
import Footer from "./components/website/Footer"
import Search from "./components/website/Search"
import Aboutus from "./components/website/Aboutus"
import Contactus from "./components/website/Contactus"

import Login from "./components/user/Login"
import Register from "./components/user/Register"
import Logout from "./components/user/Logout"
import Profile from "./components/user/Profile"
import UserDashboard from "./components/user/UserDashboard"

import AdminDashboard from "./components/admin/AdminDashboard"

import Jobs from "./components/jobs/Jobs"
import Job from "./components/jobs/Job"
import JobApplications from "./components/jobs/JobApplications"
import JobApplication from "./components/jobs/JobApplication"


import Companies from "./components/companies/Companies"
import Company from "./components/companies/Company"


export default class App extends Component {

  state = {
    user: null,
    msg: null,
    refresh: null,
    path: null
  }

  UNSAFE_componentWillMount = () => {
     this.getLoggedInUser()
  }

  getLoggedInUser = () => {
    let _id = localStorage.getItem("user_id")
    // console.log(_id)
    if (_id !== "null") {
      axios.post("http://localhost:9000/getLoggedInUser", { _id })
        .then(res => {
          let user = res.data
          this.setState({ user })
        })
    }
  }

  msg = msg => {
    this.setState({ msg })
  }

  refresh = () => {
    this.setState({ refresh: "." })
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          {/* {
            window.location.href === "http://localhost:3000/" ?
              <Home />
              :
              null
          } */}
          {/* <Home /> */}



          <Route exact path="/" component={routerProps => (<Home {...routerProps} />)}></Route>
          <Route path="/Search" component={routerProps => (<Search {...routerProps} />)}></Route>
          <Route path="/Aboutus" component={routerProps => (<Aboutus {...routerProps} />)}></Route>
          <Route path="/Contactus" component={routerProps => (<Contactus {...routerProps} />)}></Route>

          <Route path="/Login" component={routerProps => (<Login {...routerProps} msg={this.msg} refresh={this.refresh} />)}></Route>
          <Route path="/Register" component={routerProps => (<Register {...routerProps} msg={this.msg} refresh={this.refresh} />)}></Route>
          <Route path="/Logout" component={routerProps => (<Logout {...routerProps} msg={this.msg} refresh={this.refresh} />)}></Route>
          <Route path="/Profile" component={routerProps => (<Profile {...routerProps} />)}></Route>
          <Route path="/UserDashboard" component={routerProps => (<UserDashboard {...routerProps} />)}></Route>

          <Route path="/AdminDashboard" component={routerProps => (<AdminDashboard {...routerProps} />)}></Route>

          <Route path="/Jobs" component={routerProps => (<Jobs {...routerProps} />)}></Route>
          <Route path="/Job" component={routerProps => (<Job {...routerProps} />)}></Route>
          <Route path="/JobApplications" component={routerProps => (<JobApplications {...routerProps} />)}></Route>
          <Route path="/JobApplication" component={routerProps => (<JobApplication {...routerProps} />)}></Route>

          <Route path="/AddJob" component={routerProps => (<AddJob {...routerProps} />)}></Route>
          <Route path="/AddCompany" component={routerProps => (<AddCompany {...routerProps} />)}></Route>
          <Route path="/AddJobApplication" component={routerProps => (<AddJobApplication {...routerProps} />)}></Route>

          <Route path="/Companies" component={routerProps => (<Companies {...routerProps} />)}></Route>
          <Route path="/Company" component={routerProps => (<Company {...routerProps} />)}></Route>

          <Footer />
        </Router>
        {/* <span> {this.state.refresh}</span> */}
      </div >
    )
  }
}

