var SearchMixin = require('./search_mixin.js');
var ResultList = require('./results.jsx');
var SearchBar = require('./search_bar.jsx');
var EmbedButton = require('./embed_button.jsx');
var EmbedPopup = require('./embed_popup.jsx');
var InformationButton = require('./information_button.jsx')

var Detail = React.createClass({
  mixins: [SearchMixin],
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.setState({showResults: false});
    }
  },
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
    // var iframe = "http://media.embedr.eu/"+this.props.imageId;
    var iframe = "http://dev.embedr.eu/viewer/Clark.html";
    return (
      <div className="detail">
        <div id="detail__image">
          <iframe src={iframe}></iframe>
        </div>
        { this.state.results ? <ResultList results={this.state.results}  nextPage={this.nextPage} loading={this.state.loading}/> : null }
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
        <ul className="header__navigation">
          <li><a href="/about">about</a></li>
          <li><a href="#">contact</a></li>
        </ul>
        <SearchBar query={this.props.query} search={this.props.search} license={this.props.license}/>
      </div>
    )
  }
});

module.exports = Detail;
