var routes = require('routes')(),
    fs = require('fs'),
    db = require('monk')('localhost/movies'),
    movies = db.get('movies'),
    qs = require('qs'),
    mime = require('mime'),
    view = require('./view');

routes.addRoute('/movies', (req, res, url) => {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    movies.find({}, function (err, docs) { //docs returns an array of objects where each object is an item in the collection
      if (err) return err
      var template = view.render('movies/index', {movies: docs})
      res.end(template)
        })
      }
    if (req.method === 'POST') {
      var data = ''
      req.on('data', function(chunk) {
        data += chunk;
      })
      req.on('end', function() {
        var movie = qs.parse(data)
        movies.insert(movie, function (err,doc) {
          if (err) res.end('oops')
          res.writeHead(302, {'Location': '/movies'})
        res.end()
      })
    })
    }
})

routes.addRoute('/movies/new', function (req,res,url) {
  res.setHeader('Content-Type', 'text/html')
  var template = view.render('movies/new', {})
  res.end(template)
  })


routes.addRoute('/public/*', function (req, res, url) {
  res.setHeader ('Content-Type', mime.lookup(req.url))
  fs.readFile('.' + req.url, function (err, file) {
    if (err) {
      res.setHeader ('Content-Type', 'text/html')
      res.end('404')
    }
    res.end(file)
  })
})

routes.addRoute('/movies/:id/delete', function (req, res, url) {
  res.setHeader ('Content-Type', 'text/html')
  if (req.method === 'POST') {
    movies.remove({_id: url.params.id}, function (err, doc) { // when to use :id, url.params.id or {{_id}}
      if (err) return err;
      res.writeHead(302, {'Location': '/movies'})
      res.end()
    })
  }
})

routes.addRoute('/movies/:id/edit', function (req, res, url) {
  res.setHeader ('Content-Type', 'text/html')
  if (req.method === 'GET') {
    movies.findOne({_id: url.params.id}, function (err, docs) {
      if (err) return err
      var template = view.render('movies/edit', docs)
      res.end(template)
        })
      }
    if (req.method === 'POST') {
      var data = ''
      req.on('data', function(chunk) {
        data += chunk;
      })
      req.on('end', function() {
      var movie = qs.parse(data)
      movies.update(url.params.id, movie, function (err,doc) {
        if (err) res.end('oops')
        res.writeHead(302, {'Location': '/movies/' + url.params.id})
        res.end()
      })
    })
    }
})

routes.addRoute('/movies/:id', function (req, res, url){
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    movies.findOne({_id: url.params.id}, function (err, doc) {
      if (err) return err
      var template = view.render('movies/show', {movies: doc})
      res.end(template)
    })
  }
})

routes.addRoute('/', function (req, res, url) {
  if (req.method === 'GET') {
    movies.find({}, function (err, doc) {
      if (err) console.log (err);
      var template = view.render('movies/landing', doc);
      res.end(template);
    })
  }
})

module.exports = routes;
