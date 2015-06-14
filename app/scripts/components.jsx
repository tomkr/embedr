var Search = React.createClass({
  getInitialState: function() {
    return {
      results: [],
      selected: false,
      id: null
    };
  },
  search: function(query) {
    var self = this;
    $.getJSON('https://hawk-frontend-staging.herokuapp.com?query='+query, function(data) {
      self.setState({results: data});
    });
  },
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
    if (this.state.results.length > 0) {
      classes += " overlay";
    }
    if (this.state.selected) {
      classes += " detail";
    }
    return (
      <div className={classes}>
        <SearchHeader />
        <SearchBar search={this.search} />
        <Detail id={this.state.imageId} />
        <ResultList results={this.state.results} select={this.select}/>
      </div>
    );
  }
});

var SearchHeader = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="header__title">
          <h1 className="header__title__name">embedr</h1>
          <p className="header__title__text">High quality cultural heritage image embedding</p>
        </div>
        <ul className="header__navigation">
          <li><a href="#">about</a></li>
          <li><a href="#">contact</a></li>
        </ul>
      </div>
    )
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
        <Result key={result._id} id={result._id} select={this.props.select}/>
      );
    }.bind(this));
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
  click: function () {
    this.props.select(this.props.id);
  },
  render: function() {
    return (
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.click}>
        <a className={this.state.hover} href="#">&lt;/&gt;</a>
        <IIIFImage server="http://iiifhawk.klokantech.com" id={this.props.id} size="150,150" />
      </div>
    );
  }
});

var IIIFImage = React.createClass({
  makeSource: function() {
    var server = this.props.server;
    var id = this.props.id;
    var region = this.props.region || "full";
    var size = this.props.size || "1000,";
    var rotation = this.props.rotation || "0";
    var quality = this.props.quality || "native";
    var format = this.props.format || "jpg";
    return server+"/"+id+"/"+region+"/"+size+"/"+rotation+"/"+quality + "." +format;
  },
  render: function() {
    var source = this.makeSource();
    return (
      <img src={source} />
    )
  }
});

var Detail = React.createClass({
  render: function() {
    return (
      <div id="map" />
    )
  }
})
