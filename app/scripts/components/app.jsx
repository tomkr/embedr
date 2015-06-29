var SearchMixin = require('./search_mixin');
var RouteHandler = ReactRouter.RouteHandler;

var App = React.createClass({
  mixins: [SearchMixin],
  render: function() {
    return (
      <RouteHandler search={this.search} results={this.state.results} license={this.state.license} setLicense={this.setLicense} searchQuery={this.state.searchQuery}/>
    )
  }
});

module.exports = App;
