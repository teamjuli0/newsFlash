$.getJSON('/api/articles', function(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].saved === true) {
      $('#savedArticles').prepend(
        `<br><div class="card"><img class="card-img-top scrapedImg" src="${
          data[i].img
        }"><div class="card-body"><h5 class="card-title"><a href="https://www.dailywire.com/${
          data[i].link
        }" target="_blank">${
          data[i].title
        }</a></h5><button class="btn btn-secondary removeArticle" data-id="${
          data[i]._id
        }">Remove From Saved</button>
        <button type="button" class="btn btn-primary comments" data-id="${
          data[i]._id
        }" data-toggle="modal" data-target="#exampleModal">Comments</button></div></div>`
      )
    }
  }
})

$(document).on('click', '.allArticles', function() {
  window.location.replace('/')
})

$(document).on('click', '.scrapeNew', function() {
  $.ajax({
    method: 'GET',
    url: '/api/scrapeData'
  }).then(function() {
    window.location.replace('/')
  })
})

$(document).on('click', '.removeArticle', function() {
  var articleId = $(this).attr('data-id')
  console.log(articleId)
  $.ajax({
    method: 'GET',
    url: 'api/removearticle/' + articleId,
    data: {
      saved: false
    }
  }).then(function(data) {
    console.log(data)
    window.location.replace('/savedarticles')
  })
})

$(document).on('click', '.comments', function() {
  $('#notes').empty()
  var thisId = $(this).attr('data-id')
  var thisImg = $(this)
    .parent()
    .prev()
    .attr('src')

  $.ajax({
    method: 'GET',
    url: '/api/articles/' + thisId
  }).then(function(data) {
    console.log(data)

    $(
      '#notes'
    ).append(`<div class="card notesCard"><img class="card-img-top" src="${thisImg}" alt="Card image cap"><div class="card-body"><h4 class="card-title">${data.title}</h4>
      <div id="userInfo"></div><div class="form-group">
      <label for="titleinput">UserName</label><input class="form-control" id="titleinput" placeholder="Your UserName"></div><div class="form-group">
      <label for="bodyinput">Comment</label><textarea class="form-control" id="bodyinput" placeholder="Your comment"></textarea></div><button data-id="${
        data._id
      }" class="savenote">Save Note</button></div></div>`)

    if (data.note) {
      $('#usernameInput').val(data.note.username)
      $('#bodyInput').val(data.note.body)
    }
  })
})

$(document).on('click', '.savenote', function() {
  var thisId = $(this).attr('data-id')
  var userName = $('#titleinput').val()
  var comment = $('#bodyinput').val()

  console.log(thisId)
  console.log(userName)
  console.log(comment)

  $.ajax({
    method: 'GET',
    url: '/api/articles/' + thisId,
    data: {
      title: userName,
      body: comment
    }
  }).then(function(data) {
    console.log(data)
    console.log
    $('#userInfo').empty()
    $('#userInfo').append(
      `<br><h5>Username: ${userName}</h5><br><h5>Comment: ${comment}</h5><br>`
    )
  })

  $('#titleinput').val('')
  $('#bodyinput').val('')
})
