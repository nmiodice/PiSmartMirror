var React = require('react');
var ForecastStore = require('../stores/ForecastStore.js');

class Forecast extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = null;
	}

	onChange() {
		this.setState(ForecastStore.getState());
	}

	componentDidMount() {
    	ForecastStore.addChangeListener(this.onChange);
  	}

	componentWillUnmount() {
    	ForecastStore.removeChangeListener(this.onChange);
  	}

	render() {
		if (this.state == null) {
			return null;
		}

		var items = []
		var i = 0;
		this.state.forecast.forEach(function(x) {
			items.push(<div key={i}>{x.desc_simple + ', ' + x.temp + ', ' + x.date_string}</div>);
			i++;
		})

		return (
			<div className='forecast'>
				<div>{this.state.city}</div>
				{items}
			</div>
			);
	}
}


module.exports = Forecast;
