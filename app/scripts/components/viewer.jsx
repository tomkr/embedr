window.React = require('react');
var $ = require('jquery');
var EmbedButton = require('./embed_button.jsx')
var EmbedPopup = require('./embed_popup.jsx')
var RegionButton = require('./region_button.jsx')
var RegionPopup = require('./region_popup.jsx')

var makeLicenseHtml = function(license) {
  if (license.indexOf('publicdomain') > 0) {
    return "<img src='http://media.embedr.eu/static/img/pd.png' /> <a href='"+license+"'>No rights reserved.</a>"
  } else {
    return "<img src='http://media.embedr.eu/static/img/cc.png' /> <a href='"+license+"'>Some rights reserved.</a>"
  }
}

var makeLicenseHtmlNoImage = function(license) {
  if (license.indexOf('publicdomain') > 0) {
    return "<a href='"+license+"'>No rights reserved.</a>"
  } else {
    return "<a href='"+license+"'>Some rights reserved.</a>"
  }
}

var Viewer = React.createClass({
  processMetadata: function(res) {
    var imageData = res.sequences[0].canvases[0];
    var height = imageData.height;
    var width = imageData.width;
    var title = res.label || 'untitled';
    var author = 'creator unknown';
    var institution = '';
    var institutionUrl = false;
    res.metadata.forEach(function(metadata) {
      if (!metadata.value) {
        return;
      }
      if (metadata.label == 'Author') {
        author = metadata.value;
      }
      else if (metadata.label == 'Institution') {
        institution = metadata.value;
      }
      else if (metadata.label == 'Institution link') {
        institutionUrl = metadata.value;
      }
    });
      
    var institutionHtml = institutionUrl ? ("<a href='"+institutionUrl+"' target='_blank'>"+institution+"</a>") : institution;
    var license = res.license;
    var licenseHtml = makeLicenseHtml(license);
    var licenseHtmlNoImage = makeLicenseHtmlNoImage(license);
    var metadataText = "'"+title+"' | ";
    var metadataText = metadataText+author+" | ";
    var metadataText = metadataText+institutionHtml+" | ";
    var metadataText = metadataText+licenseHtml;
    var metadataTextNoImage = metadataText+licenseHtmlNoImage;
    this.setState({
      height: height,
      width: width,
      metadataText: metadataText,
      metadataTextNoImage: metadataTextNoImage
    });
  },
  componentDidMount: function() {
    var apiUrl = "http://media.embedr.eu/"+this.props.id+"/manifest.json";
    $.getJSON(apiUrl, function(res) {
      this.processMetadata(res);
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

        { this.state.showRegionPopup ? <RegionPopup region={this.state.region} id={this.props.id} close={this.toggleRegionPopup} metadataText={this.state.metadataTextNoImage}/> : null }
        <MetadataField text={this.state.metadataText}/>
      </div>
    )
  }
});

var MetadataField = React.createClass({
  getInitialState: function() {
    return {
      hidden: false
    }
  },
  hide: function() {
    this.setState({hidden: true})
  },
  render: function() {
    if (this.state.hidden) {
      return null;
    }
    return (
      <div id="title">
        <span dangerouslySetInnerHTML={{__html: this.props.text}} />
        <a href="#" id="close" onClick={this.hide}></a>
      </div>
    )
  }
});

module.exports = Viewer;
