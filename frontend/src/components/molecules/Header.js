/*----------------------
    HEADER COMPONENT:
    if user is logged in, shows header with picture and tagline
------------------------*/


import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../atoms/Button.js';

class Header extends Component{
  render(){
    
    return(
      <div>
      {(!this.props.user) ?
        (
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <div className="header text-center">
                <h1 className="header-heading display-3">Lights, Camera, Action!</h1>
                <p className="header-lead lead">Review interesting movies. Share new favourites.</p>
                <Button label="Browse Movie Reviews" redirect="/review/view/"/>
              </div>
            </div>
          </div>
        ) :
        ( null )
      }
      </div>

    )
  }
}

export default withRouter(Header);