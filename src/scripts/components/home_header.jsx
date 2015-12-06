var React = require('react');
var Navigation = require('./navigation.jsx');
var SearchBar = require('./search_bar.jsx');

var HomeHeader = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="header__title">
          <h1 className="header__title__name"><a href="/">embedr</a></h1>
          <p className="header__title__text">Image embedding done right</p>
        </div>
        <div className="header__search">
          <Navigation />
          <SearchBar setLicense={this.props.setLicense} license={this.props.license} search={this.props.search} query={this.props.query} />
        </div>
      </div>
    )
  }
});

module.exports = HomeHeader;
