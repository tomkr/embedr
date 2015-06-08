var Search = React.createClass({
  search: function(query) {
    $.getJSON('https://hawk-frontend-staging.herokuapp.com?query='+query, function(data) {
      console.log(data);
    });
  },
  render: function() {
    return (
      <SearchBar search={this.search}/>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function(e) {
    var query = e.target.value;
    this.props.search(query);
  },
  render: function() {
    return (
      <input className="form-control input-lg" placeholder="Search" onChange={this.handleChange}/>
    );
  }
});
