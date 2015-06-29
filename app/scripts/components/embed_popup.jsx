var IIIFImage = require('./iiif_image.jsx');

var EmbedPopup = React.createClass({
  render: function() {
    var embedLink = "//media.embedr.eu/" + this.props.id;
    var embedText = "<iframe src=\"" + embedLink + "\"></iframe>"
    return (
      <div className="embed__popup">
        <div className="close_button" onClick={this.props.close}>X</div>
        <strong>Embed this image</strong>
        <p>Copy the HTML code below to your website or blog. <a href="#">Click here for more information.</a></p>
        <textarea className="embed__box" rows="6">
          {embedText}
        </textarea>
        <a className="button__copy">Copy</a>
        <div>
          <label>Show preview</label>
        </div>
        <IIIFImage server="http://iiifhawk.klokantech.com" id={this.props.id} size="400,150" />
      </div>
    )
  }
});

module.exports = EmbedPopup;
