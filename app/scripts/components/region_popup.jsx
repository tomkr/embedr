var CloseButton = require('./close_button.jsx')
var IIIFImage = require('./iiif_image.jsx');

var RegionPopup = React.createClass({
  render: function() {
    var id = this.props.id ? this.props.id : this.props.result.id;
    var embedText = "http://iiif.embedr.eu/"+this.props.id+"/"+this.props.region+"/204,204/0/native.jpg";
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this image</p>
        <p>Copy the HTML code below to your website or blog. <a href="#">Click here for more information.</a></p>
        <IIIFImage id={id} region={this.props.region} server="http://iiif.embedr.eu" size="204,204"/>
        <div>
          <label for="embed_height">Height</label>
          <input id="emded_height"/>
          <label for="embed_width">Width</label>
          <input id="emded_width"/>
          <p>The width and height have a maximum of 2056 pixels</p>
        </div>
        <textarea className="embed__box" rows="6" id="text-copy">
          {embedText}
        </textarea>
        <a href="#" className="button__copy" id="button-copy" data-clipboard-target="text-copy">copy</a>
      </div>
    )
  }
});

module.exports = RegionPopup;
