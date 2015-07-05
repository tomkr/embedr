var IIIFImage = require('./iiif_image.jsx');

var EmbedPopup = React.createClass({
  render: function() {
    var embedLink = "http://media.embedr.eu/" + this.props.id;
    var embedText = "<iframe src=\"" + embedLink + "\"></iframe>"
    return (
      <div className="embed__popup">
        <div className="close_button" onClick={this.props.close}>X</div>
        <strong>Embed this image</strong>
        <p>Copy the HTML code below to your website or blog. <a href="#">Click here for more information.</a></p>
        <textarea className="embed__box" rows="6" id="text-copy">
          {embedText}
        </textarea>
        <a href="#" className="button__copy" id="button-copy" data-clipboard-target="text-copy">Copy</a>
        <div>
          <label>Show preview</label>
        </div>
        <IIIFImage server="http://iiif.embedr.eu" id={this.props.id} size="400,150" />
      </div>
    )
  }
});

module.exports = EmbedPopup;
