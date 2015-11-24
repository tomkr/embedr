var React = require('react');
var HomeHeader = require('./home_header.jsx');

var Search = React.createClass({
  render: function() {
    return (
      <div className="search">
        <HomeHeader/>
      </div>
    );
  }
});

module.exports = Search;
