/*----------------------
    PROJECT CARD COMPONENT:
    shows little card with basic project info
------------------------*/

import React from 'react';
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import FollowSmall from '../atoms/FollowSmall';

import projectStatus from '../../js/projectStatus';

const ReviewCard = ({user, project, onClick, onFollow}) => (
    <div className="col-md-3 card"
        key={project._id}
        id={project._id}>
        {/* Follow button shows only if user is logged in and not the owner */}
        {(user && projectStatus.getOwner(project) !== user._id) ? (
                <FollowSmall 
                    follow={projectStatus.getFollowers(project).includes(user._id)} 
                    onFollow={onFollow} 
                />
            ) : (
                null
            )
        }
        <div className="card-body">
        <img className="card-img" top width="225px" height="335px"  src={project.poster}/>
            <p className="card-category">{project.category}</p>
            <h4 className="card-title">{project.title}</h4>
                <Dotdotdot clamp={4}>
                <p className="card-text">
                    {project.rating}/10 - {project.tagline}</p>
                </Dotdotdot>
            <Button className="align-self-end btn btn-lg btn-block btn-primary"
                label="More" onClick={onClick}/>
        </div>
    </div>  
);

export default ReviewCard;