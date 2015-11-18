var $ = require('jquery');
var qs = require('querystring')
var Viewer = require('./components/viewer.jsx')

var viewerType = function(params) {
  if(params.nozoom === '1') { return 'nozoom' }
  if(params.full === '1') { return 'embeddable' }
  return 'default'
}

$(function(){
  $('#map').on('mouseover', function(e) {
    $('.viewer__toolbar').show();
  });
  $('#map').on('mouseout', function(e) {
    if ($(e.toElement).parents('#viewer').length > 0) return;
    $('.viewer__toolbar').hide();
  });
});

//Export to window so it can be called in a Flask template.
window.Viewer = Viewer;
var embedrViewerParams = qs.parse(window.location.search.slice(1));
window.embedrViewerType = viewerType(embedrViewerParams);
