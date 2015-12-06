var React = require('react');
var EmbedButton = React.createClass({
  render: function() {
    return (
      <a className="button__rounded" href="#" onClick={this.props.togglePopup}>
        <img src="/images/embed.png" />
      </a>
    )
  }
});

module.exports = EmbedButton;
