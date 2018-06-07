import * as React from 'react';
import homeImg from '../images/homeImg.jpg';
import '../stylesheets/Home.css';

class Home extends React.Component {
	render() {
		return (
			<div id="home" className="container">
				<div className="row">

					<div className="col-md-4 img-sect d-none d-md-block"><img src={homeImg} className="home-img img-fluid" alt="HomeImage" /></div>

					<div className="col-md-8 text-center">
						<h1>Start searching!</h1>
						<hr />
                        <div>Display stuffs</div>
					</div>

				</div>
			</div>
		);
	}
}

export default Home;