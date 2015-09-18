var CloseButton = require('./close_button.jsx')
var IIIFImage = require('./iiif_image.jsx');

var RegionPopup = React.createClass({
  getInitialState: function() {
    var region = this.props.region.split(',')
    return {
      width: region[2],
      height: region[3],
      ratio: region[2]/region[3]
    };
  },
  validateSize: function(height, width) {
    var ratio = this.state.ratio;
    if (height > width && height > 2056) {
      height = 2056;
      width = height * ratio;
    }
    else if (width > height && width > 2056) {
      width = 2056;
      height = width / ratio;
    }
    return {height: Math.round(height), width: Math.round(width)};
  },
  setHeight: function(event) {
    var height = event.target.value;
    var width = height * this.state.ratio;
    this.setState(this.validateSize(height,width));
  },
  setWidth: function(event) {
    var width = event.target.value;
    var height = width / this.state.ratio;
    this.setState(this.validateSize(height,width));
  },
  render: function() {
    var id = this.props.id ? this.props.id : this.props.result.id;
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this selection</p>
        <p>Copy the code below to your website or blog</p>
        <RegionBox height={this.state.height} width={this.state.width} region={this.props.region} id={this.props.id} metadataText={this.props.metadataText}/>
        <div className="embed__option">
          <p className="embed__resize">
            Adjust the size of the image
            <input id="emded_height" value={this.state.height} onChange={this.setHeight}/>
            x
            <input id="emded_width" value={this.state.width} onChange={this.setWidth}/>
          </p>
          <p className="embed__resize">The width and height have a maximum of 2056 pixels</p>
        </div>
        <IIIFImage id={id} region={this.props.region} server="http://iiif.embedr.eu" size="400,"/>
        <p><a href="#">Click here for more information.</a></p>
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
