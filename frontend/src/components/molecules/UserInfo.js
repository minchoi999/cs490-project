/*----------------------
    USER INFO COMPONENT:
    shows user info.
------------------------*/

import React, { Component } from 'react';
import Button from '../atoms/Button.js';
import Loader from "../atoms/Loader.js";
import defaultAvatar from "../../images/default-avatar.png";
import reviewStatus from '../../js/reviewStatus';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            reviews: null
        };
    }
    componentDidMount() {
        this.getUserInfo();
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.user) {
            this.getReviews(nextProps.reviews, this.state.user);
        }
    }
    getUserInfo = () => {
        // Get user ID from URL path, and retrieve user data from server
        const userId = this.props.match.params.id;
        this.props.getOneUser(userId, profile => {
            this.getReviews(this.props.reviews, profile);
            this.setState({
                user: profile
            });
        });
    }
    getReviews = (allReviews, user) => {
        if (allReviews.length > 0) {
            let userReviews = reviewStatus.userReviews(allReviews, user._id);
            this.setState({
                reviews: userReviews
            });
        }
    }
    handleClick = (e) => {
        this.props.history.push(`/review/view/${e.target.id}`);
    }
    renderInfo = (user, reviews) => {
        if (user) {
            return (
                <div className='user-info'>
                    <div className='user-info-meta row'>
                        <p>User Profile</p>
                    </div>
                    <div className='row'>
                        <div>
                            <img
                                key={user.avatar}
                                src={user.avatar}
                                onError={(e) => {
                                    e.target.src = defaultAvatar;
                                }}
                                className="img-fluid avatar"
                                alt="User Avatar" />
                        </div>
                        <div><h1>{user.displayName}</h1></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <strong className="col"><u>Username:</u></strong>
                                <div className="col user-info-detail">{user.username}</div>
                            </div>
                            <div className="row">
                                <strong className="col"><u>Favourite Genres:</u></strong>
                                <div className="col user-info-detail">
                                    {
                                        user.genres.map(item => {
                                            return <div key={item}>{item}</div>;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <strong className="col"><u>Favourite Movies:</u></strong>
                                <div className="col user-info-detail">
                                    {
                                        user.movies.map(item => {
                                            return <div key={item}>{item}</div>;
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <h4>My Reviews</h4>
                            <ul>
                                {
                                    (reviews) ?
                                        (
                                            reviews.map(item => {
                                                return (
                                                    <li key={item.reviewId} className="user-info-reviews">
                                                        <a id={item.reviewId} onClick={this.handleClick}>
                                                            {`${item.reviewTitle} (${item.status})`}
                                                        </a>
                                                    </li>
                                                );
                                            })
                                        ) :
                                        ('No reviews yet')
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around btn-section'>
                        {
                            (this.props.user && user._id === this.props.user._id) ?
                                (<Button label="Edit Profile" redirect={`/user/edit/`} />) :
                                (<Button label={`Contact ${user.displayName}`} redirect={`/contact/${user._id}`} />)
                        }
                    </div>
                </div>
            );
        }
        else return <Loader />
    }
    render() {
        let user = this.state.user;
        let reviews = this.state.reviews;
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        {this.renderInfo(user, reviews)}
                        <Button label="To Main" redirect={`/`} />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;