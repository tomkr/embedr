var React = require('react');
var CloseButton = require('./close_button.jsx');
var IIIFImage = require('./iiif_image.jsx');

var RegionPopup = React.createClass({
  getInitialState: function() {
    var region = this.props.region.split(',');
    var initialWidth = region[2];
    var initialHeight = region[3];
    var ratio = region[2]/region[3];
    var validatedSize = this.validateSize(initialHeight, initialWidth, ratio, 1000);
    return {
      width: validatedSize.width,
      height: validatedSize.height,
      ratio: ratio
    };
  },
  validateSize: function(height, width, ratio, max) {
    if (height > width && height > max) {
      height = max;
      width = height * ratio;
    }
    else if (width >= height && width > max) {
      width = max;
      height = width / ratio;
    }
    return {height: Math.round(height), width: Math.round(width)};
  },
  setHeight: function(event) {
    var height = event.target.value;
    var width = height * this.state.ratio;
    this.setState(this.validateSize(height, width, this.state.ratio, 2056));
  },
  setWidth: function(event) {
    var width = event.target.value;
    var height = width / this.state.ratio;
    this.setState(this.validateSize(height, width, this.state.ratio, 2056));
  },
  render: function() {
    var id = this.props.id ? this.props.id : this.props.result.id;
    var metadataText = "Detail of "+this.props.metadataText;
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this selection</p>
        <p>Copy the code below to your website or blog</p>
        <RegionBox height={this.state.height} width={this.state.width} region={this.props.region} id={this.props.id} metadataText={metadataText}/>
        <div className="embed__option">
          <p className="embed__resize">
            Adjust the size of the image<span title="The maximum width and height are 2056px."><sup>?</sup></span>
            <input id="emded_width" value={this.state.width} onChange={this.setWidth}/>
            x
            <input id="emded_height" value={this.state.height} onChange={this.setHeight}/>
          </p>
        </div>
        <IIIFImage id={id} region={this.props.region} server="http://iiif.embedr.eu" size="!400,300"/>
        <p><a href="http://embedr.eu/content/how-to-embed">More information about embedding</a></p>
      </div>
    )
  }
});

var RegionBox = React.createClass({
  render: function() {
    var embedText = "<div id='embedr_img'><img src='http://iiif.embedr.eu/"+this.props.id+"/"+this.props.region+"/"+this.props.width+","+this.props.height+"/0/native.jpg'/><p>"+this.props.metadataText+"</p></div>";
    return (
      <textarea className="embed__box" rows="6" id="text-copy" value={embedText} readOnly={true}>
      </textarea>
    )
  }
});

module.exports = RegionPopup;
