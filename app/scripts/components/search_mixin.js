var executeQuery = function (queryOptions, callback) {
  var licenses = {
    'freely': ['license:creativecommons.org/publicdomain/', 'license:BY/', 'license:BY-SA/'],
    'non-commercial': ['license:BY-NC', 'license:BY-NC_SA']
  }
  var query = queryOptions.query;
  var license = queryOptions.license;
  var start = queryOptions.start;
  var fullQuery = query;
  var licensesQuery = licenses[license].join(' OR ');
  fullQuery = fullQuery + ' AND (' + licensesQuery +')';
  $.getJSON('http://embedr.eu/search/?query='+encodeURIComponent(fullQuery)+'&start='+start, function(data) {
    callback(data);
  });
};

var SearchMixin = {
  getInitialState: function() {
    return {
      searchQuery: '',
      results: null,
      license: 'freely',
      start: 0,
      total: 0,
      loading: false
    };
  },
  setLicense: function(license) {
    this.setState({'license': license})
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
  search: function(query, start) {
    var start = this.state.start;
    this.setState({searchQuery: query})
    var self = this;
    executeQuery({query: query, license: this.state.license, start: start}, function(data) {
      self.setState({results: data.hits});
      self.setState({total: data.total});
    });
  }
};

module.exports = SearchMixin;
