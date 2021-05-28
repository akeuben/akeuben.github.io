import React from 'react';
import About from './components/about';
import Projects from './components/projects';
import Stats from './components/stats';
import './style.css';

const App = () => {
	return<>
		<Header />
		<Background />
		<About>
			<Stats />
			<Projects />
		</About>
	</>
}

const Background = () => {
	return <>
		<div className="background"></div>
	</>
}

const Header = () => {
	return <>
		<header>
			<h2 id="logo">Avery Keuben</h2>
			<a className="headerLink" href="#about">About</a>
			<a className="headerLink" href="#projects">Projects</a>
			<a className="headerLink" href="https://www.github.com/Kappabyte">GitHub</a>
		</header>
	</>
}

export default App;