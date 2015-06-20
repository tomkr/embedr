var Router = window.ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var SearchMixin = {
  getInitialState: function() {
    return {
      results: []
    };
  },
  search: function(query) {
    var self = this;
    $.getJSON('http://embedr.eu/search/?query='+query, function(data) {
      self.setState({results: data.hits});
    });
  }
}

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    )
  }
});

var Search = React.createClass({
  mixins: [SearchMixin],
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
        <Result key={result.id} result={result} />
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
    return {hover: 'button__embed'};
  },
  mouseOver: function () {
    this.setState({hover: 'button__embed display'});
  },
  mouseOut: function () {
    this.setState({hover: 'button__embed'});
  },
  click: function () {
    this.props.select(this.props.id);
  },
  render: function() {
    return (
      <div className="result" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a className={this.state.hover} href="#">&lt;/&gt;</a>
        <Link to="detail" params={{id: this.props.result.id}}>
          <IIIFImage server="http://iiifhawk.klokantech.com" id={this.props.result.id} size="150,150" />
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
  mixins: [SearchMixin],
  render: function() {
    return (
      <div className="detail">
        <OpenSeaDragon id={this.props.params.id}/>
        <ResultList results={this.state.results}/>
        <DetailHeader search={this.search} />
      </div>
    )
  }
});

var DetailHeader = React.createClass({
  render: function() {
    return (
      <div className="header detail">
        <div className="header__title">
          <h1 className="header__title__name">embedr</h1>
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

var OpenSeaDragon = React.createClass({
  componentDidMount: function() {
    console.log(this.props.id);
    var viewer = OpenSeadragon({
      id: 'detailImage',
      tileSources: [
        {
          "@context": "http://iiif.io/api/image/2/context.json",
          "@id": "http://iiifhawk.klokantech.com/000-test1",
          "filename": "000-test1.jp2",
          "height": 441,
          "order": 0,
          "profile": ["http://iiif.io/api/image/2/level1.json",
            {"formats": ["jpg"],
            "qualities": ["native", "color", "gray"],
            "supports": ["regionByPct", "sizeByForcedWh", "sizeByWh", "sizeAboveFull", "rotationBy90s", "mirroring", "gray"]
          }],
          "protocol": "http://iiif.io/api/image",
          "tiles": [
            {"height": 256, "scaleFactors": [1, 2, 4], "width": 256}],
          "width": 640
        },
        {
          "@context": "http://iiif.io/api/image/2/context.json",
          "@id": "http://iiifhawk.klokantech.com/000-test1/1",
          "filename": "000-test1/1.jp2",
          "height": 600,
          "order": 1,
          "profile": ["http://iiif.io/api/image/2/level1.json", {
            "formats": ["jpg"],
            "qualities": ["native", "color", "gray"],
            "supports": ["regionByPct", "sizeByForcedWh", "sizeByWh", "sizeAboveFull", "rotationBy90s", "mirroring", "gray"]
          }],
          "protocol": "http://iiif.io/api/image",
          "tiles": [
            {"height": 256, "scaleFactors": [1, 2, 4], "width": 256}],
          "width": 800
        },
        {
          "@context": "http://iiif.io/api/image/2/context.json",
          "@id": "http://iiifhawk.klokantech.com/000-test1/2",
          "filename": "000-test1/2.jp2",
          "height": 800,
          "order": 2,
          "profile": ["http://iiif.io/api/image/2/level1.json", {
            "formats": ["jpg"],
            "qualities": ["native", "color", "gray"],
            "supports": ["regionByPct", "sizeByForcedWh", "sizeByWh", "sizeAboveFull", "rotationBy90s", "mirroring", "gray"]
          }],
          "protocol": "http://iiif.io/api/image",
          "tiles": [
            {"height": 256, "scaleFactors": [1, 2, 4, 8], "width": 256}
          ],
          "width": 1280
        }],
      sequenceMode: true
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
