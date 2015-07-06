var CloseButton = React.createClass({
  render: function() {
    return (
      <div className="button__close" onClick={this.props.onClick}><img src="/images/close.png" /></div>
    )
  }
})

module.exports = CloseButton;
