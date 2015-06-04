$ ->
  $('.js-search').on 'input', (e) ->
    query = $(e.target).val()
    $results = $('#results')
    $results.html('')
    url = 'http://hawk-frontend-staging.herokuapp.com'
    $.getJSON url, {query: query}, (data) ->
      data.forEach (image) ->
        imageId = image['_id']
        imageUrl = "http://iiifhawk.klokantech.com/#{imageId}/full/100,100/0/native.jpg"
        $results.html("<img src='#{imageUrl}'>")
