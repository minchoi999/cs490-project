/*----------------------
    USER EDIT COMPONENT:
    users can edit their own profiles from here.
------------------------*/


import React, { Component } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';


class UserEdit extends Component {
    constructor(props) {
        super(props);
        if (this.props.user) {
            this.state = {
                username: this.props.user.username,
                displayName: this.props.user.displayName,
                avatar: this.props.user.avatar,
                genres: this.props.user.genres,
                movies: this.props.user.movies,
                email: this.props.user.email
            }    
        }
    }
    componentDidMount() {
        // if user is not logged in and therefore user info is null, redirect to home
        // redirect to login page in the future
        if (!this.state) {
            setTimeout(() => {
                this.props.history.push('/');
            }, 1000);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // React isn't catching the changes to state somehow... 
        // for now I am forcing update with each change.
        return true;
    }
    handleChange = (name, value) => {
        let obj = {};
        if (name === 'genres' || name === 'movies') {
            let arr = value.split(',');
            obj[name] = arr;
        } else {
            obj[name] = value;            
        }
        this.setState(obj);
    }
    handleClear = () => {
        this.setState({
            username: '',
            displayName: '',
            avatar: '',
            genres: '',
            movies: '',
            email: this.props.user.email
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onUserPost({
            _id: this.props.user._id, 
            username: this.state.username,
            displayName: this.state.displayName,
            avatar: this.state.avatar,
            genres: this.state.genres,
            movies: this.state.movies,
            email: this.state.email,
            reviews: this.props.user.reviews
        });
        this.props.history.push(`/user/view/${this.props.user._id}`);
    }
    render() {
        if (!this.state) {
            return <h3>ERROR: No user data. Redirecting...</h3>;
        } else {
            let genres = 'Enter data, separating values by commas.';
            let movies = 'Enter movies, sepating values by commas.';
            if (typeof this.state.genres === 'object') {
                genres = this.state.genres.toString();
            }
            if (typeof this.state.movies === 'object') {
                movies = this.state.movies.toString();
            }
            let inputFields = [
                {
                  label: 'Username',
                  name: 'username',
                  placeholder: '',
                  value: this.state.username,
                  required: true
                },
                {
                  label: 'Display Name',
                  name: 'displayName',
                  placeholder: '',
                  value: this.state.displayName,
                  required: true
                },
                {
                  label: 'Email',
                  name: 'email',
                  placeholder: 'Enter your email address',
                  value: this.state.email,
                  required: true
                },
                {
                  label: 'Favourite Genres',
                  name: 'genres',
                  value: genres,
                  placeholder: 'Separate movie genres by commas'
                },
                {
                  label: 'Favourite Movies',
                  name: 'movies',
                  value: movies,
                  placeholder: 'Separate movies by commas'
                },
                {
                  label: 'Avatar URL',
                  name: 'avatar',
                  placeholder: '',
                  value: this.state.avatar
                }
              ];
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="material-card">
                                <h1>Edit User Profile</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        {inputFields.map(item => {
                                            return <Input key={item.name} data={item} onChange={this.handleChange} />
                                        })}
                                        <div className="d-flex justify-content-around btn-section">
                                            <button type="submit" className="btn">Submit</button>
                                            <button type="button" className="btn" onClick={this.handleClear}>Clear</button>
                                            <Button label="Cancel" redirect={`/user/view/${this.props.user._id}`} />
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

export default UserEdit;
