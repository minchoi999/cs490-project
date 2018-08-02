import React, { Component } from "react";

import ReviewList from '../organisms/ReviewList';

import reviewStatus from '../../js/reviewStatus';

class Dashboard extends Component {

    render() {
        if (this.props.reviews && this.props.user) {
            let reviews = reviewStatus.userReviews(this.props.reviews, this.props.user).filter(item => {
                return item.status === 'following';
            });

            return (
                <div>
                    <h2 className="text-center">
                        Dashboard
                    </h2>
                    <div className="dashboard">
                        <ReviewList limit={this.props.limit} updateReviews={this.props.updateReviews} reviews={reviews} user={this.props.user} />
                    </div>
                </div>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }
}

export default Dashboard;