var React = require('react');
var WebsocketUtil = require('../utils/WebsocketUtil.js');
var Weather = require('./Weather.react.js');
var Forecast = require('./Forecast.react.js');
// var News = require('./News.react.js');

class Main extends React.Component {

	constructor(props) {
		super(props);
		WebsocketUtil.init();
	}

	render() {
		return (
			<div className='main'>
				<Weather/>
				<Forecast/>
			</div>
			);
	}
}

module.exports = Main;
