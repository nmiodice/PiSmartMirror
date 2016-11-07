var React = require('react');
var WeatherStore = require('../stores/WeatherStore.js');

class Weather extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = null;
	}

	onChange() {
		this.setState(WeatherStore.getState());
	}

	componentDidMount() {
    	WeatherStore.addChangeListener(this.onChange);
  	}

	componentWillUnmount() {
    	WeatherStore.removeChangeListener(this.onChange);
  	}

	render() {
		if (this.state == null) {
			return null;
		}
		
		return (
			<div className='weather'>
				{JSON.stringify(this.state)};
			</div>
			);
	}
}


module.exports = Weather;
