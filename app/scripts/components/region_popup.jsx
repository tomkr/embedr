var CloseButton = require('./close_button.jsx')
var IIIFImage = require('./iiif_image.jsx');

var RegionPopup = React.createClass({
  render: function() {
    var id = this.props.id ? this.props.id : this.props.result.id;
    var embedLink = "http://media.embedr.eu/" + id;
    var embedText = 'Test'
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this image</p>
        <p>Copy the HTML code below to your website or blog. <a href="#">Click here for more information.</a></p>
        <IIIFImage id={id} region={this.props.region} server="http://iiifhawk.klokantech.com" size="204,204"/>
        <textarea className="embed__box" rows="6" id="text-copy">
          {embedText}
        </textarea>
        <a href="#" className="button__copy" id="button-copy" data-clipboard-target="text-copy">copy</a>
      </div>
    )
  }
});

module.exports = RegionPopup;
