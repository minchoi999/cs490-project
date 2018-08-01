import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';

// Import Javascript functions
import getCookie from './js/getCookie';
import apiCall from './js/apiCalls';

// Actions
import { setUser, logoutUser } from './actions/users.js';
import { setProjects } from './actions/projects.js';

// Connects component to Store state & dispatch actions to store
import { connect } from 'react-redux';

// Import stylesheets: "main.css", not "main.scss"
import "./stylesheets/main.css";

// Import custom components
import Nav from './components/molecules/Nav';
import Header from './components/molecules/Header';
import ReviewList from './components/organisms/ReviewList';
import ReviewInfo from './components/molecules/ReviewInfo';
import ReviewEdit from './components/organisms/ReviewEdit';
import UserInfo from './components/molecules/UserInfo';
import UserEdit from './components/molecules/UserEdit';
import ContactForm from './components/molecules/ContactForm';
import About from "./components/organisms/About";
import Footer from './components/molecules/Footer';
import Dashboard from './components/molecules/Dashboard';
import {NotFound} from './components/molecules/NotFound';

import MoviePopular from './components/molecules/MoviePopular';
import MovieDetail from './components/molecules/MovieDetail';
import { ScrollToTop } from './components/molecules/ScrollToTop';

// Loads environment variables with dotenv
require('dotenv').load();

// Declare App component 
class App extends Component {
  constructor(props) {
    super(props);

    // url is REACT_APP_APPURL if set, otherwise it's window.location.origin
    const url = (process.env.REACT_APP_APPURL) ?
      (process.env.REACT_APP_APPURL) :
      (window.location.origin);

    // component state has 
    this.state = {
      apiUrl: url
    }
  }
  // Once the app is mounted
  componentDidMount() {
    // load all projects 
    this.allProjects();
    this.setUser();
    // Get redirect cookie and redirect if exists
    const redirect = getCookie('redirect');
    if (redirect) {
      // Reset redirect cookie before redirecting
      document.cookie = 'redirect=';
      window.location = redirect;
    }
  }

  /*
  FUNCTIONS TO PASS DOWN TO CHILDREN COMPONENTS
  AS PROPS WHEN ROUTING
  (Move them to child components where possible, 
  once Redux is implemented in children)
  */

  // fetch all projcets
  allProjects = () => {
    apiCall.getAllProjects(res => {
      if (res.error) { console.error(res.error) }
      console.log('res.data', res.data);
      if (res.data) {
        this.setState({ projects: res.data }); // update state to response data
        this.props.setProjects(res.data); // redux store
      }
    });
  }
  // get one project by ID
  getOneProject = (projectId, next) => {
    // apiCall expects a "null" if projects are not loaded yet
    const projects = (typeof this.state.projects !== 'undefined') ? this.state.projects : null;
    apiCall.getProjectById(projects, projectId, res => {
      if (res.error) { console.error(res.error) }
      next(res.data);
    });
  }
  // creates new project
  newProject = (data) => {
    // This is now identical to this.updateProject()...
    // newProject will eventually be deleted.
    this.updateProject(data);
  }
  // update project
  updateProject = (data) => {
    console.log('updateProject', data);
    apiCall.postProject(data, this.allProjects());
  }
  // delete project
  deleteProject = (data) => {
    apiCall.deleteProject(data, this.allProjects());
  }

  // get one user profile by ID
  getOneUser = (id, next) => {
    apiCall.getUserById(id, res => {
      if (res.error) { console.error(res.error) }
      next(res.data);
    });
  }
  // updates user data 
  postUser = (data) => {
    apiCall.postUser(data, () => {
      this.allProjects();
      this.setUser();
    });
  }
  // get user data from api and assign it to state
  setUser = () => {
    console.log('set user');
    apiCall.getCurrentUser(res => {
      console.log('set user response', res);
      if (res.error) { console.error(res.error) }
      if (res.data) {
        this.setState({ user: res.data });
        // send data to redux store
        this.props.setUser(res.data);
      } else {
        console.log('User not logged in');
      }
    });
  }
  // logout the user by setting the app state.user as null
  logoutUser = () => { // logout user
    axios.get('/auth/logout').then(() => {
      this.setState({
        user: null
      });

      this.props.logoutUser();
      window.location = '/'; // and redirects to the homepage
    });
  }



  // once project is unfollowed or followed, matches the db value without calling db
  updateUserProjects = (project_id) => {
    // copy state
    let { user } = this.state;
    let { followedProjects } = user;

    // findindex of project that was followed
    const projectIndex = followedProjects.findIndex((e) => {
      return e === project_id;
    });

    // if project exists on array, remove it else add it
    followedProjects = projectIndex !== -1
      ? [...followedProjects.slice(0, projectIndex),
      ...followedProjects.slice(projectIndex + 1)]
      : [...followedProjects, project_id];

    // save new state
    user.followedProjects = followedProjects;
    this.setState({
      user
    });
  }

  render() {
    return (

      <Router>
        <ScrollToTop>
          <Switch>
            <div>
              {/* Nav components get rendered in all pages. User is set to null when user logged out */}
              <Nav user={this.props.user} logoutUser={this.logoutUser} />

              {/* Routing for homepage */}
              <Route exact
                path="/" render={(routeProps) => (
                  /* If user is logged in, but user doesn't have username, redirect to user edit page */
                  (this.props.user && !this.props.user.username) ?
                    (<Redirect to={{
                      pathname: '/user/edit/'
                    }} />) :
                    (
                      <div>
                        {/* If user is logged out, render Header, ReviewList and About components (Landing page) */}
                        {/* Header component. */}
                        <Header user={this.props.user} />

                        {/* ReviewList inherits route props, plus App is passed on as ReviewList prop */}
                        <ReviewList
                          {...routeProps}
                          {...{
                            projects: this.props.projects,
                            user: this.props.user,
                            updateProjects: this.allProjects
                          }}
                        />
                        {/* About component */}
                        <About user={this.props.user} />
                      </div>
                    )
                )}
              />
              {/* Shows single project */}
              <Route path="/project/view/:id?" render={(routeProps) => {
                // ReviewInfo component shows single project. Functions defined at parent level
                return <ReviewInfo
                  {...routeProps}
                  {...{
                    projects: this.props.projects,
                    user: this.props.user,
                    deleteProject: this.deleteProject,
                    allProjects: this.allProjects,
                    getOneProject: this.getOneProject,
                    getOneUser: this.getOneUser,
                    updateProjects: this.allProjects
                  }} />
              }} />
              {/* Shows user page */}
              <Route path="/user/view/:id" render={(routeProps) => {
                return <UserInfo
                  {...routeProps}
                  {...{
                    user: this.props.user,
                    projects: this.props.projects,
                    getOneUser: this.getOneUser
                  }} />
              }} />
              {/* User can edit its own information when logged in */}
              <Route path="/user/edit/" render={(routeProps) => {
                return <UserEdit {...routeProps} {...{
                  user: this.props.user,
                  onUserPost: this.postUser
                }} />
              }} />

              {/* Adds a review (only logged in users)  */}
              <Route path="/project/add/" render={(routeProps) => {
                return <ReviewEdit
                  {...routeProps}
                  {...{
                    user: this.props.user,
                    handleSubmit: this.newProject
                  }} />
              }} />

              {/* Edits a review (only logged in users) */}
              <Route path="/project/edit/:id" render={(routeProps) => {
                return <ReviewEdit
                  {...routeProps}
                  {...{
                    user: this.props.user,
                    handleSubmit: this.updateProject,
                    getOneProject: this.getOneProject
                  }} />
              }} />

              <Route path="/dashboard" component={Dashboard} />

              {/* Shows contact form to contact review owner */}
              <Route path="/contact/:userId/:projectId?" render={(routeProps) => {
                return <ContactForm
                  {...routeProps}
                  {...{
                    user: this.props.user,
                    handleSubmit: this.sendMessage,
                    getOneProject: this.getOneProject,
                    getOneUser: this.getOneUser
                  }} />
              }} />
              <Route exact path="/tmdb" render={(routeProps) => {
                return <MoviePopular
                  {...routeProps}
                  {...{
                    user: this.props.user
                  }} />
              }} />
              <Route exact path="/tmdb/movie/:id" render={(routeProps) => {
                return <MovieDetail
                  {...routeProps}
                  {...{
                    user: this.props.user
                  }} />
              }} />
              {/* Footer component gets shown in every single page */}
              <Footer />
            </div>
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>
    )
  }
}


// Takes the state from store and maps it to this.props
const mapStateToProps = (state) => {
  return {
    projects: state.projectReducer.projects,
    user: state.userReducer.user
  }
};

// Allows you to bind this.props.dispatch to object methods. this.props.dispatch(setUser(user)) becomes this.props.setUser(user)
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setProjects: (projects) => {
      dispatch(setProjects(projects));
    },
    logoutUser: () => {
      dispatch(logoutUser());
    }
  }
}

// Wraps component with connect allowing access to store and dispatch
const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnect;