import * as React from 'react';

const contactImg = require('../images/contactImg.png');
import '../stylesheets/Contact.css';

class Contact extends React.Component {
	render() {
		return (
			<div id="contact" className="container-fluid">

				<div className="row header"><h2>Contact</h2></div>

				<div className="row">

					<img src={require('../images/contactImg.png')} className="contact-img col-sm-6 img-fluid" alt="ContactImage" />

					<div className="col-sm-6 text-center">
						<h3>Do you like what we made?</h3>
						<p>Blah blah blah</p>

						<hr />

						<p><a href="mailto:bangchi.duong.20193@outlook.com?Subject=Hello%20there!" target="_top">
							<button type="button" className="btn btn-light">Send Email <i className="fas fa-envelope-square social-icons" aria-hidden="true" /></button>
						</a></p>	
					</div>

				</div>	
			</div>
		);
	}
}


export default Contact;