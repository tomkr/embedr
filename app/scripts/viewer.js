var Viewer = require('./components/viewer.jsx')
//Export to window so it can be called in a Flask template.
window.Viewer = Viewer;

$(function(){
  $('#map').on('mouseover', function(e) {
    $('.viewer__toolbar').show();
  });
  $('#map').on('mouseout', function(e) {
    if ($(e.toElement).closest('.viewer__toolbar').length > 0) return;
    $('.viewer__toolbar').hide();
  });
});
