import * as React from 'react';
import '../stylesheets/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<nav className="footer navbar-dark bg-dark static-bottom text-center">
				<div className="social-icons">
					<a href="https://www.linkedin.com/in/bang-chi-duong-6857969a/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin social-icons" aria-hidden="true" /></a>
					<a href="https://github.com/duongch4" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square social-icons" aria-hidden="true" /></a>
				</div>
				
				<div className="navbar-text">
					M-Geek © 2018. All Right Reserved
				</div>
			</nav>
		);
	}
}

export default Footer;