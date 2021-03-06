import React from 'react';
import Tag from '../atoms/Tag.js';
import Dropdown from '../atoms/Dropdown.js';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

const Categories = (props) => {
    return (
        <div className="category-wrapper">
            <div className="tag-container">
                {props.categories.map(e => {
                    return <Tag key={e} name={e} removeTag={props.removeTag} />
                })}
            </div>
            <div className="dropdown-button-container">
                <button type="button" className="btn" onClick={props.handleClick}>
                    Select Categories
                    <FaAngleDown size={24} />
                </button>
            </div>
            {props.active && <Dropdown categories={props.categories} setActive={props.setActive} closeDropdown={props.handleClick} />}
        </div>
    )
};

export default Categories;