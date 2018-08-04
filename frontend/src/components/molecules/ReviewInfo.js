/*----------------------
    review INFO COMPONENT:
    shows details of review. Owners can also access edit and delete features
------------------------*/

import React, { Component } from "react";
import axios from "axios";

import ReviewList from "../organisms/ReviewList";
import FollowLarge from "../atoms/FollowLarge";
import Button from "../atoms/Button.js";
import Loader from "../atoms/Loader";
import reviewStatus from "../../js/reviewStatus";

class ReviewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null,
      owner: null
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.getReview(id);
  }
  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    if (id) {
      this.getReview(id);
    }
  }
  getReview = reviewId => {
    if (reviewId) {
      this.props.getOneReview(reviewId, review => {
        if (review) {
          this.setState({
            review: review
          });
          this.getOwner(reviewStatus.getOwner(review));
        }
      });
    }
  };
  getOwner = ownerId => {
    console.log("get owner", ownerId);
    this.props.getOneUser(ownerId, profile => {
      let owner = profile && profile.displayName ? profile : null;
      this.setState({
        owner: owner
      });
    });
  };

  handleClick = (review_id, e) => {
    e.stopPropagation();
    if (this.props.user) {
      axios.post(`/api/follow/${review_id}`).then(res => {
        this.props.p(review_id);
      });
    } else {
      // Return
      return false;
    }
  };

  handleDelete = () => {
    this.props.deleteReview(this.state.review);
    this.props.history.push("/");
  };
  render() {
    const reviewId = this.props.match.params.id;
    const review = this.state.review;
    const owner = this.state.owner;
    const user = this.props.user;
    const isOwner = user && owner && user._id === owner._id;
    let buttons = null;

    console.log("render", review);
    if (!reviewId) {
      //this is the '/reviews/view/' route without reviewId
      return <ReviewList {...this.props} />;
    } 
    else {
      if (!review) {
        return <Loader />;
      }

      if (isOwner) {
        buttons = (
          <div className="row d-flex justify-content-around btn-section">
            <Button className="col" label="Edit" redirect={`/review/edit/${review._id}`} />
            <Button className="col" label="Delete" onClick={this.handleDelete} />
          </div>
        );
      } 
      else {
        buttons = owner ? (
          <div className="row d-flex justify-content-around btn-section">
            <Button className="col"
              label="View Reviewer Profile"
              redirect={`/user/view/${owner._id}`}
            />
            <Button className="col"
              label="Contact Reviewer"
              redirect={`/contact/${owner._id}/${review._id}`}
            />
          </div>
        ) : null;
      }
    }

    return (
      <div className="container">
        <div className="row ">
          <div className="col">
            <div className="material-card">
              <div className="review-meta row">
                <div className="flex-row">
                  {review.categories.map(category => {
                    return (
                      <p key={category} className="mr-1 review-category">
                        {category}
                      </p>
                    );
                  })}
                </div>
                <p className="review-owner col text-md-right">
                  {owner ? owner.displayName : "No Owner Info"}
                </p>
                <hr />
              </div>
              <div className="float-right">
                {!isOwner &&
                  user && (
                    <FollowLarge
                      follow={reviewStatus
                        .getFollowers(review)
                        .includes(user._id)}
                      onFollow={this.handleClick.bind(this, reviewId)}
                    />
                  )}
              </div>
              <h1>{review.title}</h1>
              <p>{review.status}</p>
              <div className="row justify-content-between">
                <div className="review-tech col-md-8">
                  <h3>
                    {review.rating}/10 - {review.tagline}
                  </h3>
                  <p>{review.description}</p>
                </div>
                <div className="review-tech col-md-4">
                  <h3>Tags</h3>
                  <ul>
                    {review.tags.map(item => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                  {!review.tmdb || review.tmdb === "" ? (
                    <h3>No Movie Link provided</h3>
                  ) : (
                    <h3>
                      <a href={review.tmdb}>Movie Link</a>
                    </h3>
                  )}
                </div>
              </div>
              {buttons}
            </div>
            <Button label="To Main" redirect={`/`} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewInfo;
