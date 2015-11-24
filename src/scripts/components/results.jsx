var React = require('react');
var ResultList = require('./result_list.jsx');
var HomeHeader = require('./home_header.jsx');
var SearchMixin = require('./search_mixin.js');

var Results = React.createClass({
  mixins: [SearchMixin],
  componentDidMount: function() {
    this.search();
  },
  render: function() {
    return (
      <div className="search">
        <div className="results__overlay"></div>
        { this.state.results ? <ResultList results={this.state.results} nextPage={this.nextPage} loading={this.state.loading}/> : null }
        <HomeHeader setLicense={this.setLicense} license={this.state.license} search={this.search} query={this.state.searchQuery} />
      </div>
    );
  }
});

module.exports = Results;
