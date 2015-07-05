var Viewer = require('./components/viewer.jsx')

React.render(<Viewer />, document.getElementById('viewer'));

$(function(){
  $('#map').on('mouseover', function(e) {
    $('#viewer').show();
  });
  $('#map').on('mouseout', function(e) {
    if ($(e.toElement).closest('#viewer').length > 0) return;
    $('#viewer').hide();
  });
});
