
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);

app.get('/project', routes.project);
app.get('/project/:pid', routes.project);
app.get('/project/:pid/:id', routes.project);
app.get('/projects', routes.projects);
app.get('/addProject', routes.addProject);

// app.get('/project/addActivity/:pid', routes.activity);

// app.post('/addProject', function(req, res){
// 	console.log("Name is "+req.body.name);
// 	res.render('projects');
// });
// app.get('/projects/:name', routes.partialsProjects);
app.get('/partials/:name', routes.partials);



// JSON API

app.get('/api/posts', api.posts);
app.get('/api/posts/:id', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.post('/api/project', api.addProject);
app.delete('/api/post/:id', api.deletePost);

app.get('/geoapi', api.geoapi);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);



// /// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// /// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }




/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
