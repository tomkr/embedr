$(function(){
  $('.js-search').on('input', function(e) {
    var query = $(e.target).val();
    var $results = $('#results');
    $results.html('');
    $.getJSON('http://localhost:4567', {query: query}, function(data) {
      data.forEach(function(image) {
        var imageId = image['_id'];
        var imageUrl = 'http://iiifhawk.klokantech.com/'+imageId+'/full/100,100/0/native.jpg';
        $results.html("<img src='"+imageUrl+"'>");
        console.log($results.html())
      });
    });
  });
});
