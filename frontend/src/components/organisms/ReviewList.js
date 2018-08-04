/*----------------------
    REVIEW LIST COMPONENT:
    shows list of cards containing brief info on each review,
    as well as a search box in full list view.
------------------------*/

import React, { Component } from 'react';
import axios from 'axios';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";

import ReviewCard from '../molecules/ReviewCard';
import SearchBox from '../molecules/SearchBox';

class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            limit: (this.props.match.path === '/' && !this.props.user) ? (6) : (null)
        };
    }
    // for filtering reviews to show, by filter state
    filterReviews = (reviews, filters) => {
        if (reviews.length < 1) { return null }
        // if no filter is set, display all reviews
        if (!filters || filters.length < 1) {
            return reviews;
        } 
        else {
            filters.forEach(filter => {
                let regex = new RegExp('\\b' + filter + '\\b', 'i');
                reviews = reviews.filter(review => {
                    let text = review.tags.join(' ')
                        .concat(' ' + review.title)
                        .concat(' ' + review.category);
                    return regex.test(text);
                });
            })
            return reviews;
        }
    }
    handleFilterUpdate = (filterArray) => {
        this.setState({
            filters: filterArray
        });
    }
    handleClick = (review_id, e) => {
        console.log(e, 'this is e');
        // Prevents link from activating router
        //e.stopPropagation();
        return axios.post(`/api/follow/${review_id}`)
            .then(res => {
                console.log('Follow response', res);
                this.props.updateReviews(review_id);
            });
    }
    render() {
        const partial = Boolean(this.state.limit);
        let reviews = this.filterReviews(this.props.reviews, this.state.filters);

        if (reviews) {
            return (
                <div className={partial ? "container" : "container review-cards-full"}>
                    {
                        (!partial) ?
                            (
                                <SearchBox
                                    reviews={this.props.reviews}
                                    filters={this.state.filters}
                                    onTagsUpdate={this.handleFilterUpdate}
                                />
                            ) :
                            (null)
                    }
                    <div className="row justify-content-center">
                        {
                            reviews.map((review, i) => {
                                if (!partial || i < this.state.limit) {
                                    return (
                                        <ReviewCard
                                            key={review._id}
                                            user={this.props.user}
                                            review={review}
                                            onClick={() => this.props.history.push(`/review/view/${review._id}`)}
                                            onFollow={this.handleClick.bind(this, review._id)}
                                        />
                                    );
                                }
                                else return null;
                            })
                        }
                    </div>
                    <div className="text-center">
                        {
                            (partial) ?
                                (<Button label="All Movie Reviews" redirect={`/review/view/`} />) :
                                (<Button label="To Main" redirect={`/`} />)
                        }
                    </div>
                </div>
            );
        } else return <Loader />;
    }
}

export default ReviewList;
