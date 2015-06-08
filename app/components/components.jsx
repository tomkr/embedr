var Search = React.createClass({
  getInitialState: function() {
    return {results: []};
  },
  search: function(query) {
    var self = this;
    $.getJSON('https://hawk-frontend-staging.herokuapp.com?query='+query, function(data) {
      self.setState({results: data});
    });
  },
  render: function() {
    return (
      <div className="search">
        <SearchBar search={this.search} />
        <ResultList results={this.state.results} />
      </div>
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

var ResultList = React.createClass({
  render: function() {
    var classes = "result_list";
    if (this.props.results.length > 0) {
      classes += " display";
    }
    console.log(this.props)
    var resultNodes = this.props.results.map(function (result) {
      return (
        <Result key={result._id} id={result._id} />
      );
    });
    return (
      <div className={classes}>
        {resultNodes}
      </div>
    )
  }
});

var Result = React.createClass({
  render: function() {
    var source = "http://iiifhawk.klokantech.com/"+this.props.id+"/full/100,100/0/native.jpg";
    return (
      <img src={source} />
    );
  }
});
