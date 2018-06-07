import * as React from 'react';
import '../stylesheets/NavigationBar.css';

class NavigationBar extends React.Component {
	render() {
		return (
			<div id="navigation" className="container">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<a className="navbar-brand" href="#home">M-GEEK<span className="sr-only">(current)</span></a>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="fas fa-bars burger-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item"><a className="nav-link" href="#profile">Categories</a></li>
							<li className="nav-item"><a className="nav-link" href="#projects">Series</a></li>
							<li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
							<li className="nav-item"><a className="nav-link" href="#contact">Login</a></li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default NavigationBar;