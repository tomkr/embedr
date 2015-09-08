var Viewer = require('./components/viewer.jsx')
//Export to window so it can be called in a Flask template.
window.Viewer = Viewer;

$(function(){
  $('#map').on('mouseover', function(e) {
    $('#viewer').show();
  });
  $('#map').on('mouseout', function(e) {
    if ($(e.toElement).closest('#viewer').length > 0) return;
    $('#viewer').hide();
  });
  $('#close').on('click', function(e){
    $('#title').hide();
  });
});
