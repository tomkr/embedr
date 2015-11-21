var React = require('react');
var SearchMixin = require('./search_mixin.js');
var ResultList = require('./results.jsx');
var SearchBar = require('./search_bar.jsx');
var Navigation = require('./navigation.jsx');

var Search = React.createClass({
  mixins: [SearchMixin],
  render: function() {
    var classes = "search";
    return (
      <div className="search">
        { this.state.results ? <ResultList results={this.state.results} nextPage={this.nextPage} loading={this.state.loading}/> : null }
        <HomeHeader setLicense={this.setLicense} license={this.state.license} search={this.search} query={this.state.searchQuery} />
      </div>
    );
  }
});

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

module.exports = Search;
