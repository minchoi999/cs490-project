import * as React from 'react';
import '../stylesheets/NavigationBar.css';

class NavigationBar extends React.Component {
	render() {
		return (
			<div id="navigation">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<a className="navbar-brand" href="#home">M-GEEK<span className="sr-only">(current)</span></a>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="fas fa-bars burger-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#categories" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Categories
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" href="#action">Action</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#adventure">Adventure</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#comedy">Comedy</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#fantasy">Fantasy</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#horror">Horror</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#comedy">Comedy</a>
								</div>
							</li>
							<li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
							<li className="nav-item"><a className="nav-link" href="#login">Login</a></li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default NavigationBar;