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
    var classes = "search";
    if (this.state.results.length > 0) {
      classes += " overlay";
    }
    return (
      <div className={classes}>
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
      <div className="search_box">
        <input className="search_bar" placeholder="Search" onChange={this.handleChange}/>
        <div className="search__button"></div>
      </div>
    );
  }
});

var ResultList = React.createClass({
  render: function() {
    var resultNodes = this.props.results.map(function (result) {
      return (
        <Result key={result._id} id={result._id} />
      );
    });
    return (
      <div className="result_list">
        {resultNodes}
      </div>
    )
  }
});

var Result = React.createClass({
  getInitialState: function () {
    return {hover: 'embed_button'};
  },
  mouseOver: function () {
    this.setState({hover: 'embed_button display'});
  },
  mouseOut: function () {
    this.setState({hover: 'embed_button'});
  },
  render: function() {
    var source = "http://iiifhawk.klokantech.com/"+this.props.id+"/full/150,150/0/native.jpg";
    return (
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a className={this.state.hover} href="#">&lt;/&gt;</a>
        <img src={source} />
      </div>
    );
  }
});
