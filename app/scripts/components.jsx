var Router = window.ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    )
  }
});

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
    return (
      <div className="search">
        <ResultList results={this.state.results}/>
        <HomeHeader search={this.search} />
      </div>
    );
  }
});

var HomeHeader = React.createClass({
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
        <SearchBar search={this.props.search} />
      </div>
    )
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      showAdvanced: false
    }
  },
  showAdvanced: function(e) {
    this.setState({showAdvanced: !this.state.showAdvanced})
  },
  handleChange: function(e) {
    var query = e.target.value;
    this.props.search(query);
  },
  render: function() {
    return (
      <div className="search_box">
        <div className="search__advanced" onClick={this.showAdvanced}>advanced search</div>
        <input className="search_bar" placeholder="Search" onChange={this.handleChange}/>
        <div className="search__button"></div>
        { this.state.showAdvanced ? <AdvancedSearch close={this.showAdvanced} /> : null }
      </div>
    );
  }
});

var AdvancedSearch = React.createClass({
  render: function() {
    return (
      <div className="search__advanced__box">
        <div className="close_button" onClick={this.props.close}>X</div>
        <ul>
          <AdvancedOption value="any">any license</AdvancedOption>
          <AdvancedOption value="all">all creative commons</AdvancedOption>
          <AdvancedOption value="commercial">commercial use allowed</AdvancedOption>
          <AdvancedOption value="modification">commercial use and modifictions allowed</AdvancedOption>
          <AdvancedOption value="unknown">no known copyright restrictions</AdvancedOption>
        </ul>
      </div>
    )
  }
});

var AdvancedOption = React.createClass({
  render: function() {
    var license = "license"+this.props.value;
    return (
      <li>
        <label>
          <input type="radio" name="license" id={license} value={this.props.value} />
          {this.props.children}
        </label>
      </li>
    )
  }
})

var ResultList = React.createClass({
  render: function() {
    if (this.props.results.length == 0) return null;
    var resultNodes = this.props.results.map(function (result) {
      return (
        <Result key={result._id} id={result._id} select={this.props.select}/>
      );
    }.bind(this));
    return (
      <div className="results__overlay">
        <div className="results">
          {resultNodes}
        </div>
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
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a className={this.state.hover} href="#">&lt;/&gt;</a>
        <Link to="detail" params={{id: this.props.id}}>
          <IIIFImage server="http://iiifhawk.klokantech.com" id={this.props.id} size="150,150" />
        </Link>
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
      <div className="detail">
        <OpenSeaDragon />
        <Search />
      </div>
    )
  }
});

var OpenSeaDragon = React.createClass({
  componentDidMount: function() {
    var viewer = OpenSeadragon({
      id: 'detailImage',
      preserveViewport: true,
      visibilityRatio:    1,
      minZoomLevel:       1,
      defaultZoomLevel:   6,
      tileSources:   [{
        "@context": "http://library.stanford.edu/iiif/image-api/1.1/context.json",
        "@id": "http://iiifhawk.klokantech.com/000-test2/",
        "formats": [ "jpg", "png", "gif" ],
        "height": 3600,
        "profile": "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2",
        "qualities": [ "native", "bitonal", "grey", "color" ],
        "scale_factors": [ 1, 2, 4, 8, 16 ],
        "tile_height": 256,
        "tile_width": 256,
        "width": 2617
      }
    ]
    });
  },
  render: function() {
    return (
      <div id="detailImage" />
    )
  }
})

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Search}/>
    <Route name="detail" path="/:id" handler={Detail}/>
  </Route>
);

Router.run(routes, function(Root) {
  React.render(<Root/>, document.getElementById('search'))
});
