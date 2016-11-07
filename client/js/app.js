var Main     = require('./components/Main.react');
var React    = require('react');
var ReactDOM = require('react-dom');
window.React = React;

ReactDOM.render(<Main/>, document.getElementById('react'));
