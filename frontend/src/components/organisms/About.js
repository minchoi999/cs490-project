/*----------------------
    ABOUT COMPONENT:
    shows information about BitHelper rationale
------------------------*/


import React, { Component } from 'react';
import Button from '../atoms/Button.js';
import reel from "../../images/kaye_movie_icn-01.svg";
import seat from "../../images/kaye_movie_icn-05.svg";


class About extends Component{
  render(){
    
    return(
      <div>
      {(!this.props.user) ?
        (
        <section className="about">
           <div className="row features">
               <div className="col-md-6 text-center">
                   <img className="about-icon" src={seat} alt=""/>
                    <h2 className="white-text mt-0">Connect</h2>
                    <p className="white-text">Meet other movie geeks and share your thoughts!</p>
               </div>
               <div className="col-md-6 text-center">
                    <img className="about-icon" src={reel} alt=""/>
                    <h2 className="white-text mt-0">Discover movies</h2>
                    <p className="white-text">Find something new with our movie database and review system.</p>
               </div>
            </div>
            <div className="row join">
                <div className="col-md-12 text-center">
                    <h1 className="header-heading display-3">Your experience starts here</h1>
                    <p className="header-lead lead">Find the best movies, faster and together.</p>
                    <a href="/auth/github"><Button label="Join us" /></a>
                </div>
            </div>
        </section>
        ) : (
          null
        )
      }
      </div>

    )
  }
}

export default About