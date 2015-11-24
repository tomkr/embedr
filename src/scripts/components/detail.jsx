var React = require('react');
var SearchMixin = require('./search_mixin.js');
var ResultList = require('./results.jsx');
var SearchBar = require('./search_bar.jsx');
var EmbedButton = require('./embed_button.jsx');
var EmbedPopup = require('./embed_popup.jsx');
var InformationButton = require('./information_button.jsx')
var Navigation = require('./navigation.jsx')

var Detail = React.createClass({
  getInitialState: function() {
    return {
      showResults: false
    };
  },
  doSearch: function(query) {
    this.search(query);
    this.setState({showResults: true});
  },
  render: function() {
    var iframe = "http://media.embedr.eu/"+this.props.imageId;
    return (
      <div className="detail">
        <div id="detail__image">
          <iframe src={iframe}></iframe>
        </div>
        <DetailHeader query={this.state.searchQuery} search={this.search} license={this.state.license} setLicense={this.setLicense} />
      </div>
    )
  }
});

var DetailHeader = React.createClass({
  render: function() {
    return (
      <div className="header detail">
        <div className="header__title">
          <h1 className="header__title__name"><a href="/">embedr</a></h1>
        </div>
        <Navigation />
        <SearchBar query={this.props.query} search={this.props.search} license={this.props.license} setLicense={this.props.setLicense}/>
      </div>
    )
  }
});

module.exports = Detail;
