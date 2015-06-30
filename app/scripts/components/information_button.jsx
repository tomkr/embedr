var InformationButton = React.createClass({
  render: function() {
    return (
      <a className="button__metadata" href="#" onClick={this.props.togglePopup}>
        <img src="/images/metadata.png" />
      </a>
    )
  }
});

module.exports = InformationButton;
