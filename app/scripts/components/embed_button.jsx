var EmbedButton = React.createClass({
  render: function() {
    return (
      <a className="button__embed" href="#" onClick={this.props.togglePopup}>
        <img src="/images/embed.png" />
      </a>
    )
  }
});

module.exports = EmbedButton;
