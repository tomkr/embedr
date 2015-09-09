var CloseButton = React.createClass({
  render: function() {
    if (this.props.dark) {
      imageSrc = '/images/close_dark.png'
    }
    else {
      imageSrc = '/images/close.png'
    }
    return (
      <div className="button__close" onClick={this.props.onClick}><img src={imageSrc} /></div>
    )
  }
})

module.exports = CloseButton;
