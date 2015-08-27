var EmbedButton = require('./embed_button.jsx')
var EmbedPopup = require('./embed_popup.jsx')
var RegionButton = require('./region_button.jsx')
var RegionPopup = require('./region_popup.jsx')

var Viewer = React.createClass({
  componentDidMount: function() {
    var apiUrl = "http://iiif.embedr.eu/"+this.props.id+"/info.json";
    $.getJSON(apiUrl, function(res) {
      this.setState({
        height: res.height,
        width: res.width
      });
    }.bind(this));
  },
  getInitialState: function() {
    return {
      showEmbedPopup: false,
      showRegionPopup: false,
      height: 100,
      width: 100,
      region: 'full'
    };
  },
  toggleEmbedPopup: function(e) {
    e.preventDefault();
    this.setState({showEmbedPopup: !this.state.showEmbedPopup});
  },
  setRegion: function(region) {
    this.setState({region: region});
    this.setState({showRegionPopup: !this.state.showRegionPopup});
  },
  toggleRegionPopup: function(e) {
    e.preventDefault();
    this.setState({showRegionPopup: !this.state.showRegionPopup});
  },
  render: function() {
    return (
      <div className="viewer">
        <div className="viewer__toolbar">
          <EmbedButton togglePopup={this.toggleEmbedPopup}/>
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
          <RegionButton setRegion={this.setRegion}/>
        </div>
        { this.state.showEmbedPopup ? <EmbedPopup width={this.state.width} height={this.state.height} id={this.props.id} close={this.toggleEmbedPopup}/> : null }
        { this.state.showRegionPopup ? <RegionPopup region={this.state.region} id={this.props.id} close={this.toggleRegionPopup}/> : null }
      </div>
    )
  }
});

module.exports = Viewer;
