import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Home from '../components/Home.jsx';
import Slider from '../components/Slider/Slider.jsx';
import Movie from '../components/Movie.jsx';
import NavigationBar from '../components/NavigationBar.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
    constructor(props) {
        super(props);

        this.state = {
            secretData: '',
        };

  }

  /**
   * This method will be executed after initial rendering.
   */
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send();
    }


  /**
   * Render the component.
   */
    render() {
        return (
            <div className="App">
                {/* <NavigationBar /> */}

                <Dashboard secretData={this.state.secretData}/>

                <Home />

                <Slider />

                <Movie />

                {/* <Contact /> */}

                <Footer />
            </div>
        );
  }

}

export default DashboardPage;