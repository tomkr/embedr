var CloseButton = require('./close_button.jsx')
var IIIFImage = require('./iiif_image.jsx');

var EmbedPopup = React.createClass({
  render: function() {
    var embedLink = "http://media.embedr.eu/" + this.props.id;
    var embedText = '<div class="embdr_wrapper" style="position: relative; height: 400px;"><iframe style="border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="' + embedLink + '">Your browser doesn\'t support iFrames.</iframe></div>'
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this image</p>
        <p>Copy the HTML code below to your website or blog. <a href="#">Click here for more information.</a></p>
        <textarea className="embed__box" rows="6" id="text-copy">
          {embedText}
        </textarea>
        <a href="#" className="button__copy" id="button-copy" data-clipboard-target="text-copy">copy</a>
      </div>
    )
  }
});

module.exports = EmbedPopup;
