var EmbedButton = require('./embed_button.jsx')
var EmbedPopup = require('./embed_popup.jsx')
var InformationButton = require('./information_button.jsx')
var InformationPopup = require('./information_popup.jsx')

var Viewer = React.createClass({
  getInitialState: function() {
    return {
      showEmbedPopup: false,
      showInfoPopup: false
    };
  },
  toggleEmbedPopup: function(e) {
    e.preventDefault();
    this.setState({showEmbedPopup: !this.state.showEmbedPopup});
  },
  toggleInfoPopup: function(e) {
    e.preventDefault();
    this.setState({showInfoPopup: !this.state.showInfoPopup});
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
          <InformationButton togglePopup={this.toggleInfoPopup}/>
        </div>
        { this.state.showEmbedPopup ? <EmbedPopup id={this.props.id} close={this.togglePopup}/> : null }
        { this.state.showInfoPopup ? <InformationPopup id={this.props.id} close={this.toggleInfoPopup}/> : null }
      </div>
    )
  }
});

module.exports = Viewer;
