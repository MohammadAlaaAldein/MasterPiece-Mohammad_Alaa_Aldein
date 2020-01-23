import React, { Component } from 'react'
import "../../Design/home/home.css"
import slider1 from "../../images/3.jpg"
import slider2 from "../../images/1.jpg"
import slider3 from "../../images/7.jpg"

export default class Home extends Component {

    render() {
        return (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <h2 className="text1"> Find Your Dream Job </h2>
                        <img className="d-block w-100 " src={slider1} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <h2 className="text2">Apply Job Easily </h2>
                        <img className="d-block w-100 " src={slider2} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <h2 className="text3"> Keep In Touch With Us </h2>
                        <img className="d-block w-100 " src={slider3} alt="Third slide" />

                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}
