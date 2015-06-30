var ResultList = require('./results.jsx');
var SearchBar = require('./search_bar.jsx');
var EmbedButton = require('./embed_button.jsx');
var EmbedPopup = require('./embed_popup.jsx');
var InformationButton = require('./information_button.jsx')
var InformationPopup = require('./information_popup.jsx')

var Detail = React.createClass({
  getInitialState: function() {
    return {showResults: false};
  },
  search: function(query) {
    this.props.search(query);
    this.setState({showResults: true})
  },
  render: function() {
    return (
      <div className="detail">
        <OpenSeaDragon id={this.props.params.id}/>
        { this.state.showResults ? <ResultList results={this.props.results}/> : null }
        <DetailHeader query={this.props.searchQuery} search={this.search} license={this.props.license} setLicense={this.props.setLicense} />
      </div>
    )
  }
});

var DetailHeader = React.createClass({
  render: function() {
    return (
      <div className="header detail">
        <div className="header__title">
          <h1 className="header__title__name"><a href="/">embedr</a></h1>
        </div>
        <ul className="header__navigation">
          <li><a href="#">about</a></li>
          <li><a href="#">contact</a></li>
        </ul>
        <SearchBar query={this.props.query} search={this.props.search} />
      </div>
    )
  }
});

var OpenSeaDragon = React.createClass({
  getInitialState: function() {
    return {
      showPopup: false,
      showInfoPopup: false
    };
  },
  componentDidMount: function() {
    $.getJSON('http://media.embedr.eu/'+this.props.id+'/manifest.json', function(result) {
      var canvas = result.sequences[0].canvases[0];
      var height = canvas.height;
      var width = canvas.width;
      var viewer = OpenSeadragon({
        id: 'detail__image',
        zoomInButton: 'zoom-in-button',
        zoomOutButton: 'zoom-out-button',
        tileSources: [
          {
            "@context": "http://iiif.io/api/image/2/context.json",
            "@id": "http://iiifhawk.klokantech.com/"+this.props.id,
            "filename": this.props.id+".jp2",
            "height": height,
            "order": 0,
            "profile": ["http://iiif.io/api/image/2/level1.json",
              {"formats": ["jpg"],
              "qualities": ["native", "color", "gray"],
              "supports": ["regionByPct", "sizeByForcedWh", "sizeByWh", "sizeAboveFull", "rotationBy90s", "mirroring", "gray"]
            }],
            "protocol": "http://iiif.io/api/image",
            "tiles": [
              {"height": 256, "scaleFactors": [1, 2, 4, 8], "width": 256}],
            "width": width
          }]
      });
    }.bind(this));
  },
  togglePopup: function(e) {
    e.preventDefault();
    this.setState({showPopup: !this.state.showPopup});
  },
  toggleInfoPopup: function(e) {
    e.preventDefault();
    this.setState({showInfoPopup: !this.state.showInfoPopup});
  },
  zoomIn: function(e) {
    e.preventDefault();
  },
  render: function() {
    return (
      <div className="detail__main">
        <div id="detail__image" />
        <EmbedButton togglePopup={this.togglePopup}/>
        { this.state.showPopup ? <EmbedPopup id={this.props.id} close={this.togglePopup}/> : null }
        <div className="button__zoom">
          <a id="zoom-in-button" href="#">
            <img src="/images/zoom-in.png" />
          </a>
        </div>
        <div className="button__zoom--out">
          <a id="zoom-out-button" href="#">
            <img src="/images/zoom-out.png" />
          </a>
        </div>
        <InformationButton togglePopup={this.toggleInfoPopup}/>
        { this.state.showInfoPopup ? <InformationPopup id={this.props.id} close={this.toggleInfoPopup}/> : null }
      </div>
    )
  }
});

module.exports = Detail;
