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
      results: [],
      license: 'freely'
    };
  },
  setLicense: function(license) {
    this.setState({'license': license})
  },
  search: function(query, start) {
    var start = start || 0;
    this.setState({searchQuery: query})
    var self = this;
    executeQuery({query: query, license: this.state.license, start: start}, function(data) {
      self.setState({results: data.hits});
    });
  }
};

module.exports = SearchMixin;
