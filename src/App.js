import * as React from 'react';

import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';
import Movie from './components/Movie';
import NavigationBar from './components/NavigationBar';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">

				<NavigationBar />

				<Home />

				<Movie/>

				<Contact />

				<Footer />
			</div>
		);
	}
}

export default App;
