import React from 'react';
import './styles/global.css';

import Header from "./components/Header";
import Background from "./components/Background";

function App() {
	return (
    	<>
			<Background />
			<Header />
			<h1>About me</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta porta quam sed lacinia. Proin nec neque vel elit molestie porttitor. Etiam rutrum non velit in molestie. Donec eget turpis eu tortor rutrum imperdiet. Quisque lobortis nibh volutpat est viverra, at congue lectus elementum. Maecenas nec luctus est, et consequat dui. Nulla nec lacus non neque finibus euismod. Quisque feugiat vehicula mi nec ornare. Quisque eu odio faucibus, vestibulum libero ut, consectetur ligula.</p>
			<div className="spacer"></div>
			<h1>About me</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta porta quam sed lacinia. Proin nec neque vel elit molestie porttitor. Etiam rutrum non velit in molestie. Donec eget turpis eu tortor rutrum imperdiet. Quisque lobortis nibh volutpat est viverra, at congue lectus elementum. Maecenas nec luctus est, et consequat dui. Nulla nec lacus non neque finibus euismod. Quisque feugiat vehicula mi nec ornare. Quisque eu odio faucibus, vestibulum libero ut, consectetur ligula.</p>
			<div className="spacer"></div>
			<div className="spacer"></div>
			<div className="spacer"></div>
		</>
	);
}

export default App;
