$.getJSON('/api/articles', function(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].saved === false) {
      $('#allArticles').prepend(
        `<br><div class="card"><img class="card-img-top scrapedImg" src="${
          data[i].img
        }"><div class="card-body"><h5 class="card-title"><a href="https://www.dailywire.com/${
          data[i].link
        }" target="_blank">${
          data[i].title
        }</a></h5><button class="btn btn-secondary saveArticle" data-id="${
          data[i]._id
        }" saved="${data[i].saved}">Save Article</button></div></div>`
      )
    }
  }
})

$(document).on('click', '.savedArticles', function() {
  window.location.replace('/savedarticles')
})

$(document).on('click', '.scrapeNew', function() {
  $.ajax({
    method: 'GET',
    url: '/api/scrapeData'
  }).then(function() {
    window.location.replace('/')
  })
})

$(document).on('click', '.saveArticle', function() {
  var articleId = $(this).attr('data-id')
  console.log(articleId)
  $.ajax({
    method: 'GET',
    url: 'api/savearticle/' + articleId,
    data: {
      saved: true
    }
  }).then(function(data) {
    console.log(data)
    window.location.replace('/')
  })
})
