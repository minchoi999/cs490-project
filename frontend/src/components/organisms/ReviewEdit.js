/*----------------------
    REVIEW EDIT COMPONENT:
    owners can edit their own reviews from here.
------------------------*/

import React, { Component } from 'react';
import Button from '../atoms/Button.js';
import Input from '../atoms/Input';
import Categories from '../molecules/Categories.js';

class ReviewEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      owner: "",
      categories: [],
      description: "",
      rating: "",
      tagline: "",
      tags: [],
      status: "",
      poster: "",
      tmdb: "",
      users: [],
      active: false,
    };
  }
  componentDidMount() {
    // if user is not logged in and therefore user info is null, redirect to home
    // redirect to login page in the future
    if (!this.props.user) {
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    }
    else if (this.props.match.params.id) {
      // if editing a review, retrieve review data based on URL
      this.getReviewData();
    }
    else {
      // if creating a new review, set owner based on props
      // NOTE I've changed the owner info to user ID, because displayname can be changed
      // and therefore cannot be used to identify the user.
      this.setState({
        users: [{
          _id: this.props.user._id,
          status: 'owner'
        }]
      });
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  getReviewData = () => {
    const reviewId = this.props.match.params.id;
    this.props.getOneReview(reviewId, res => {
      this.setState(res);
    });
  }

  handleClick = (e) => {
    // stop dropdown from closing
    e.stopPropagation();

    return this.setState({
      active: !this.state.active
    })
  }

  onInputChange = (name, value) => {
    const newValue = {};
    if (name === 'tags') {
      newValue[name] = value.split(',');
    } else {
      newValue[name] = value;
    }
    this.setState(...this.state, newValue);
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.props.history.push('/');
  }
  onFormClear = () => {
    // if (this.props.match.params.id) {
      this.setState({
        title: "",
        categories: [],
        description: "",
        rating: "0",
        tagline: "",
        tags: [],
        status: "",
        poster: "http://via.placeholder.com/225x335",
        tmdb: "",
        users: [{
          _id: this.props.user._id,
          status: 'owner'
        }],
        active: false,
      });
    // }
  }

  setActive = (item, e) => {
    // prevent dropdown from closing
    e.stopPropagation();

    console.log(item, 'this is item');
    let { categories } = this.state;
    const index = categories.indexOf(item.title);

    categories = (index === -1) ?
      [...categories, item.title] :
      [...categories.slice(0, index), ...categories.slice(index + 1)];

    return this.setState({ categories });
  }

  removeTag = (name) => {
    let { categories } = this.state;
    const index = categories.indexOf(name);

    categories = index === -1 ? [...categories, name]
      : [...categories.slice(0, index), ...categories.slice(index + 1)]

    return this.setState({ categories });
  }

  removeFocus = () => {
    this.setState({
      active: false,
    })
  }

  render() {
    if (!this.props.user) {
      return <h3>ERROR: Not logged in. Redirecting...</h3>;
    }
    else {
      let inputFields = [
        {
          label: 'Movie Title',
          name: 'title',
          placeholder: 'e.g. Batman',
          value: this.state.title,
          required: true
        },
        {
          label: 'Categories',
          name: 'categories',
          type: 'text',
          placeholder: 'e.g. Horror, Romance, Comedy, etc.',
          value: this.state.categories
        },
        {
          label: 'Premise',
          tag: 'textarea',
          name: 'status',
          placeholder: 'Brief description of the movie\'s context and storyline - no spoilers!',
          value: this.state.status,
          required: true
        },
        {
          label: 'Rating',
          name: 'rating',
          type: 'text',
          placeholder: 'From zero to ten',
          value: this.state.rating,
          required: true
        },
        {
          label: 'Review',
          tag: 'textarea',
          name: 'description',
          placeholder: 'What did you like or dislike about the movie?',
          value: this.state.description,
          required: true
        },
        {
          label: 'Tagline',
          name: 'tagline',
          placeholder: 'Final thoughts in 120 characters or less!',
          value: this.state.tagline,
          required: true
        },
        {
          label: 'Tags',
          name: 'tags',
          type: 'text',
          placeholder: 'Keywords or tags, without spaces and separated by commas',
          value: this.state.tags
        },
        {
          label: 'Movie Poster URL',
          name: 'poster',
          placeholder: "http://via.placeholder.com/225x335",
          value: this.state.poster,
        },
        {
          label: 'Movie Database URL',
          name: 'tmdb',
          placeholder: 'http://cs490-project-movie.herokuapp.com/tmdb/movie/299536',
          value: this.state.tmdb,
        }
      ];
      return (
        <div className="container" onClick={this.removeFocus}>
          <div className="row">
            <div className="col">
              <div className="material-card">
                <h1>{(this.props.match.params.id) ? 'Edit a Review' : 'Write a Review'}</h1>
                <form onSubmit={this.onFormSubmit}>
                  <fieldset>
                    {inputFields.map(item => {
                      if (item.name === 'categories') {
                        return (
                          <div key={item.name}>
                            <label className="control-label">Genres</label>
                            <Categories removeTag={this.removeTag} categories={this.state.categories} setActive={this.setActive} handleClick={this.handleClick} active={this.state.active} />
                          </div>
                        )
                      }
                      return <Input key={item.name} onChange={this.onInputChange} data={item} />;
                    })}
                    <div className="d-flex justify-content-around btn-section">
                      <button type="submit" className="btn">Submit</button>
                      <button type="button" className="btn" onClick={this.onFormClear}>Clear</button>
                      <Button label="Cancel" redirect={(this.props.match.params.id) ? (`/review/view/${this.props.match.params.id}`) : (`/`)} />
                    </div>
                  </fieldset>
                </form>
              </div>
              <Button label="To Main" redirect={`/`} />
            </div>
          </div>
        </div>
      );

    }
  }
}

export default ReviewEdit;
