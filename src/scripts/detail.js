var React = require('react');
var ReactDOM = require('react-dom');
var Detail = require('./components/detail.jsx');
imageId = window.imageId;
ReactDOM.render(<Detail imageId={imageId} />, document.getElementById('detail'));
