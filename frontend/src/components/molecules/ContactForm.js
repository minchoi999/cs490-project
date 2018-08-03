/*----------------------
    CONTACT FORM COMPONENT:
    shows contact form
------------------------*/


import React, { Component } from 'react';
import axios from 'axios';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Loader from '../atoms/Loader.js';

import reviewStatus from '../../js/reviewStatus';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: null,
            review: null,
            subject: '',
            body: ''
        }
    }
    componentDidMount() {
        const params = this.props.match.params;
        console.log('Contact form did mount', params);
        this.setContact(params.userId);
        this.setReview(params.reviewId);
    }
    shouldComponentUpdate() {
        return true;
    }
    setReview = (reviewId) => {
        console.log('setReview', reviewId, this.props);
        this.props.getOneReview(reviewId, review => {
            console.log('review found', review);
            if (review) {
                this.setState({
                    review: review,
                    subject: 'RE: ' + review.title
                });
                this.setContact(reviewStatus.getOwner(review));
            } else {
                console.log('setReview could not find review');
            }
        })
    }
    setContact = (contactId) => {
        this.props.getOneUser(contactId, contact => {
            if (contact) {
                console.log('setContact contact info found', contact);
                this.setState({
                    contact: contact
                });
            } else {
                console.log('setContact could not find contact');
                this.props.history.push('/');
            }
        })
    }
    handleChange = (name, value) => {
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }
    handleReset = () => {
        this.setState({
            subject: '',
            body: ''
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.user) {
            console.log('user not logged in');
            alert('Please log in first!');
            this.props.history.push('/');
        } else {
            console.log('state', this.state);
            const url = `https://formspree.io/${this.state.contact.email}`;
            const body = {
                name: this.props.user.username,
                _replyto: this.props.user.email,
                subject: this.state.subject,
                message: this.state.body
            };
            console.log('message ready to be sent', url, body);
            axios.post(url, body)
                .then(res => {
                    console.log('message submitted', res);
                    alert('Message sent successfully!');
                })
                .catch(err => { if (err) throw err; });
        }
    }
    render() {
        const contact = this.state.contact;
        const review = this.state.review;
        const inputFields = [
            {
                label: 'Subject',
                name: 'subject',
                placeholder: 'Enter your subject here',
                value: this.state.subject,
                required: true
            },
            {
                tag: 'textarea',
                label: 'Message',
                name: 'body',
                placeholder: 'Enter your message here',
                value: this.state.body,
                required: true
            }
        ];

        if (contact) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="material-card">
                                <h1>Contact Form</h1>
                                {(review) ?
                                    (<p>You want to know more about the review <b>{review.title}</b>? Great!</p>) :
                                    (null)
                                }
                                <p>Fill out the form below to get in touch with <b>{contact.displayName}</b></p>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        {inputFields.map(item => {
                                            return <Input key={item.name} data={item} onChange={this.handleChange} />
                                        })}
                                        <div className="d-flex justify-content-around">
                                            <button type="submit" className="btn">Submit</button>
                                            <button className="btn" onClick={this.handleReset}>Clear</button>
                                            <Button label="Cancel" redirect={'/'} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <Button label="To Main" redirect={`/`} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }

    }
}

export default ContactForm;
