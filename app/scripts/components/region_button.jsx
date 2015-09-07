var RegionButton = React.createClass({
  makeIIIF: function(rect) {
    this.props.setRegion(rect.x+','+rect.y+','+rect.width+','+rect.height);
    this.boxDrawer.exitEditMode();
    document.body.style.cursor = "auto";
    $('.osd-select-rectangle').remove();
  },
  startSelection: function() {
    var self = this;
    if (!self.boxDrawer) {
      self.boxDrawer = osdRegionRectTool({
        osd: OpenSeadragon,
        viewer: viewer,
        onDrawFinish: function(rect) { self.makeIIIF(rect) }
      });
    }
    document.body.style.cursor = "crosshair";
    this.boxDrawer.enterEditMode();
  },
  render: function() {
    return (
      <a className="button__region" href="#" onClick={this.startSelection}>
        <img src="/images/embed.png" />
      </a>
    )
  }
});

module.exports = RegionButton;
