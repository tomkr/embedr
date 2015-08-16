var EmbedButton = React.createClass({
  makeIIIF: function(rect) {
    console.log(rect.x+','+rect.y+','+rect.width+','+rect.height);
    boxDrawer.exitEditMode();
  },
  startSelection: function() {
    var self = this;
    document.body.style.cursor = "crosshair";
    var boxDrawer = osdRegionRectTool({
      osd: OpenSeadragon,
      viewer: viewer,
      onDrawFinish: function(rect) { self.makeIIIF(rect) },
      onDrawStart: function() { console.log('starting rectangle!') },
      onModeEnter: function() { console.log('entering edit mode!') },
      onModeExit: function() { console.log('exiting edit mode!') },
      onDraw: function() { console.log('Drahwrin!') }
    });
    boxDrawer.enterEditMode();
  },
  render: function() {
    return (
      <a className="button__region" href="#" onClick={this.startSelection}>
        <img src="/images/embed.png" />
      </a>
    )
  }
});

module.exports = EmbedButton;
