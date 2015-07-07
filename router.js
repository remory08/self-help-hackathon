var routes = require('routes')(),
    fs = require('fs'),
    mime = require('mime'),
    //qs = require('qs'),
    db = require('monk')('localhost/breaktime'),
    breaktime = db.get('breaktime'),
    view = require('./view');

routes.addRoute('/', function (req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
      var template = view.render('index', {})
      res.end(template)
        }
      })

    routes.addRoute('/breaktime', function (req, res, url) {
      if (req.method === 'GET') {
          var template = view.render('break', {});
          res.end(template);
        }
      })

    routes.addRoute('/breaktime/personal', function (req, res, url) {
      if (req.method === 'GET') {
          var template = view.render('personal');
          res.end(template);
        }
      })

    routes.addRoute('/breaktime/meditate', function (req, res, url) {
      if (req.method === 'GET') {
          // if (err) console.log (err);
          var template = view.render('meditate');
          res.end(template);
        }
        // if (req.method === 'POST') {
        //   var data = ''
        //   req.on('data', function(chunk) {
        //     data += chunk;
        //   })
        //   req.on('end', function() {
        //     var meditation = qs.parse(data)
        //     breaktime.insert(meditation, function (err,doc) {
        //       if (err) res.end('oops')
        //       res.writeHead(302, {'Location': 'breaktime/meditate'})
        //     res.end()
        //   })
        // })
        // }
        })


    routes.addRoute('/breaktime/move', function (req, res, url) {
      if (req.method === 'GET') {
          // if (err) console.log (err);
          var template = view.render('move');
          res.end(template);
        }
      })

    routes.addRoute('/breaktime/stretch', function (req, res, url) {
      if (req.method === 'GET') {
          // if (err) console.log (err);
          var template = view.render('stretch');
          res.end(template);
        }
      })

    routes.addRoute('/breaktime/summary', function (req, res, url) {
      if (req.method === 'GET') {
          // if (err) console.log (err);
          var template = view.render('summary');
          res.end(template);
        }
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

module.exports = routes;
