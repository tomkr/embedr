var React = require('react');
var CloseButton = require('./close_button.jsx')

var EmbedPopup = React.createClass({
  getInitialState: function() {
    return {zoomable: true};
  },
  getProportion: function() {
    if (this.props.result) {
      var meta = JSON.parse(this.props.result.image_meta)[0];
      return (meta.height/meta.width*100)+"%";
    } else {
      return (this.props.height/this.props.width*100)+"%";
    }
  },
  embedLink: function(zoomable) {
    var id = this.props.id ? this.props.id : this.props.result.id;
    var embedLink = "http://media.embedr.eu/" + id;
    if (!zoomable) embedLink += "?nozoom=1";
    return embedLink;
  },
  embedText: function(zoomable) {
    var proportion = this.getProportion();
    return '<div class="embdr_wrapper" style="position: relative; padding-bottom: '+proportion+'; padding-top: 0px; height: 0;"><iframe style="border: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="' + this.embedLink(zoomable) + '">Your browser doesn\'t support iFrames.</iframe></div>';

  },
  toggleZoomable: function() {
    this.setState({zoomable: !this.state.zoomable});
  },
  render: function() {
    return (
      <div className="embed__popup">
        <CloseButton onClick={this.props.close} />
        <p className="embed__title">Embed this image</p>
        <p>First choose your platform:</p>
        <div className="embed__option">
          <p className="embed__subtitle">Embed on social media</p>
          <p className="embed__callout"><img src="/images/share_small.png" className="embed__icon"/>Copy the URL in the address bar above</p>
        </div>
        <div className="embed__option">
          <p className="embed__subtitle">Embed on website or blog</p>
          <p className="embed__callout"><img src="/images/embed_small.png" className="embed__icon"/>Copy the HTML-code below</p>
          <label className="embed__zoom-control">
            <input type="checkbox" id="zoomable" onChange={this.toggleZoomable} checked={this.state.zoomable}/>
            Make embedded image zoomable
          </label>
          <textarea className="embed__box" rows="6" id="text-copy" value={this.embedText(this.state.zoomable)} readOnly={true}></textarea>
        </div>
        <a href="http://embedr.eu/content/how-to-embed" target="_blank">More information about embedding</a>
      </div>
    )
  }
});

module.exports = EmbedPopup;
