var CloseButton = require('./close_button.jsx')
var IIIFImage = require('./iiif_image.jsx');

var EmbedPopup = React.createClass({
  getProportion: function() {
    if (this.props.result) {
      var meta = JSON.parse(this.props.result.image_meta)[0];
      return (meta.height/meta.width*100)+"%";
    } else {
      return (this.props.height/this.props.width*100)+"%";
    }
  },
  render: function() {
    var id = this.props.id ? this.props.id : this.props.result.id;
    var proportion = this.getProportion();
    var embedLink = "http://media.embedr.eu/" + id;
    var embedText = '<div class="embdr_wrapper" style="position: relative; padding-bottom: '+proportion+'; padding-top: 0px; height: 0;"><iframe style="border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="' + embedLink + '">Your browser doesn\'t support iFrames.</iframe></div>'
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this image</p>
        <p>First choose your platform:</p>
        <div className="embed__option">
          <p className="embed__subtitle">Embed on social media</p>
          <p className="embed__callout"><img src="/images/share_small.png" className="embed__icon"/>Copy the URL in the address bar.</p>

        </div>
        <div className="embed__option">
          <p className="embed__subtitle">Embed on website or blog</p>
          <p className="embed__callout"><img src="/images/embed_small.png" className="embed__icon"/>Copy the HTML code below</p>
          <textarea className="embed__box" rows="6" id="text-copy">
            {embedText}
          </textarea>
        </div>
        <a href="http://embedr.eu/content/how-to-embed">More information about embedding</a>
      </div>
    )
  }
});

module.exports = EmbedPopup;
