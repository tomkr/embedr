var SearchMixin = require('./search_mixin');
var ResultList = require('./results.jsx');
var SearchBar = require('./search_bar.jsx');

var Search = React.createClass({
  mixins: [SearchMixin],
  select: function(imageId) {
    this.setState(
      {
        selected: true,
        results: [],
        id: imageId
      }
    )
  },
  render: function() {
    var classes = "search";
    return (
      <div className="search">
        <ResultList results={this.state.results}/>
        <HomeHeader setLicense={this.setLicense} license={this.state.license} search={this.search} />
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
          <p className="header__title__text">High quality cultural heritage image embedding</p>
        </div>
        <ul className="header__navigation">
          <li><a href="/about">about</a></li>
          <li><a href="#">contact</a></li>
        </ul>
        <SearchBar setLicense={this.props.setLicense} license={this.props.license} search={this.props.search} />
      </div>
    )
  }
});

module.exports = Search;
