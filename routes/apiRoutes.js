var axios = require('axios')
var cheerio = require('cheerio')
var db = require('./../models')

module.exports = function(app) {
  app.get('/api/scrapeData', function(req, res) {
    axios.get('https://www.dailywire.com').then(function(response) {
      var $ = cheerio.load(response.data)

      $('.article-features').each(function(i, element) {
        var result = {}

        result.title = $(this)
          .find('h2')
          .text()
        result.link = $(this)
          .find('a')
          .attr('href')
        result.img = $(this)
          .find('img')
          .attr('src')

        db.Article.create(result)
          .then(function(dbResults) {
            console.log(dbResults)
          })
          .catch(function(err) {
            return console.log(err)
          })
      })

      $('.article-plug').each(function(i, element) {
        var result = {}

        result.title = $(this)
          .find('h2')
          .text()
        result.link = $(this)
          .find('a')
          .attr('href')
        result.img = $(this)
          .find('img')
          .attr('src')

        db.Article.create(result)
          .then(function(dbResults) {
            console.log(dbResults)
          })
          .catch(function(err) {
            return console.log(err)
          })
      })

      $('.article-teaser').each(function(i, element) {
        var result = {}

        result.title = $(this)
          .find('h3')
          .text()
        result.link = $(this)
          .find('a')
          .attr('href')
        result.img = $(this)
          .find('img')
          .attr('src')

        db.Article.create(result)
          .then(function(dbResults) {
            console.log(dbResults)
          })
          .catch(function(err) {
            return console.log(err)
          })
      })

      res.send('Scrape Complete')
    })
  })

  app.get('/api/savedarticles', function(req, res) {
    db.Article.find({ saved: true })
      .then(function(savedArticles) {
        res.json(savedArticles)
      })
      .catch(function(err) {
        res.json(err)
      })
  })

  app.get('/api/savearticle/:id', function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { saved: true },
      { new: true }
    )
      .then(function(savedArticles) {
        res.json(savedArticles)
      })
      .catch(function(err) {
        res.json(err)
      })
  })

  app.get('/api/removearticle/:id', function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { saved: false },
      { new: true }
    )
      .then(function(removedArticle) {
        res.json(removedArticle)
      })
      .catch(function(err) {
        res.json(err)
      })
  })

  app.get('/api/articles', function(req, res) {
    db.Article.find({})
      .then(function(dbArticles) {
        res.json(dbArticles)
      })
      .catch(function(err) {
        res.json(err)
      })
  })

  app.get('/api/articles/:id', function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate('note')
      .then(function(dbArticles) {
        res.json(dbArticles)
      })
      .catch(function(err) {
        res.json(err)
      })
  })

  app.post('/api/articles/:id', function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          { _id: req.param.id },
          { note: dbNote._id },
          { new: true }
        )
      })
      .then(function(dbArticle) {
        res.json(dbArticle)
      })
      .catch(function(err) {
        res.json(err)
      })
  })
}
