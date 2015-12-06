var React = require('react');
var ReactDOM = require('react-dom');
var Results = require('./components/results.jsx');
ReactDOM.render(<Results query={window.query} license={window.license} />, document.getElementById('results'));
