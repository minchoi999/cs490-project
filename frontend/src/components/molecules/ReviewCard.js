/*----------------------
    REVIEW CARD COMPONENT:
    shows little card with basic review info
------------------------*/

import React from 'react';
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import FollowSmall from '../atoms/FollowSmall';

import reviewStatus from '../../js/reviewStatus';

const ReviewCard = ({user, review, onClick, onFollow}) => (
    <div className="col-md-3 card"
        key={review._id}
        id={review._id}>
        {/* Follow button shows only if user is logged in and not the owner */}
        {(user && reviewStatus.getOwner(review) !== user._id) ? (
                <FollowSmall 
                    follow={reviewStatus.getFollowers(review).includes(user._id)} 
                    onFollow={onFollow} 
                />
            ) : (
                null
            )
        }
        <div className="card-body">
        <img className="card-img" top width="225px" height="335px"  src={review.poster}/>
            <p className="card-category">{review.category}</p>
            <h4 className="card-title">{review.title}</h4>
                <Dotdotdot clamp={4}>
                <p className="card-text">
                    {review.rating}/10 - {review.tagline}</p>
                </Dotdotdot>
            <Button className="align-self-end btn btn-lg btn-block btn-primary"
                label="More" onClick={onClick}/>
        </div>
    </div>  
);

export default ReviewCard;