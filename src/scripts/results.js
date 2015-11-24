var React = require('react');
var Results = require('./components/results.jsx');
React.render(<Results query={window.query} license={window.license} />, document.getElementById('results'));
