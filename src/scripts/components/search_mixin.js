var $ = require('jquery');
var executeQuery = function (queryOptions, callback, errorCallback) {
  var licenses = {
    'freely': ['license:creativecommons.org/publicdomain/', 'license:creativecommons.org/licenses/by/3.0/', 'license:BY/', 'license:BY-SA/'],
    'non-commercial': ['license:BY-NC', 'license:BY-NC_SA']
  }
  var query = queryOptions.query;
  var license = queryOptions.license;
  var start = queryOptions.start;
  var fullQuery = query;
  var licensesQuery = licenses[license].join(' OR ');
  fullQuery = fullQuery + ' AND (' + licensesQuery +')';
  $.ajax({
    dataType: 'json',
    url: 'http://embedr.eu/search/?query='+encodeURIComponent(fullQuery)+'&start='+start,
    success: function(data) {
      callback(data);
    },
    error: function(error) {
      errorCallback();
    }
  });
};

var SearchMixin = {
  getInitialState: function() {
    return {
      searchQuery: this.props.query || '',
      results: null,
      license: this.props.license || 'freely',
      start: 0,
      total: 0,
      loading: false,
      error: false
    };
  },
  nextPage: function() {
    this.setState({'start': this.state.start+120});
    if (this.state.start >= this.state.total) {
      return;
    }
    this.setState({'loading': true});
    var self = this;
    executeQuery({query: this.state.searchQuery, license: this.state.license, start: this.state.start}, function(data) {
      self.setState({results: self.state.results.concat(data.hits)});
      self.setState({'loading': false})
    });
  },
  search: function() {
    var start = this.state.start;
    var query = this.state.searchQuery;
    var self = this;
    executeQuery({query: query, license: this.state.license, start: start}, function(data) {
      self.setState({results: data.hits});
      self.setState({total: data.total});
    }, function() {
      self.setState({error: true});
    });
  }
};

module.exports = SearchMixin;
