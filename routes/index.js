
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log("exports index");
  res.render('index', {title:'Index page', layout:'indexLayout'});
};

exports.project = function(req, res){
	console.log("exports project");
  res.render('project');
};

exports.projects = function(req, res){
  res.render('projects', {title:'Projects page', layout:'indexLayout'});
};

exports.addProject = function(req, res){
	console.log("ADd project");
  res.render('addProject', {title:'Add a project', layout:'indexLayout'});
};

exports.addActivity = function(req, res){
  console.log("ADd activity");
  res.render('addActivity');
};

// exports.partialsProjects = function (req, res) {
//   var name = req.params.name;
//   res.render('partialsProjects/' + name, {title:'Projects', layout:'indexLayout'});
// };

exports.partials = function (req, res) {
  var name = req.params.name;
  console.log("name in partials: "+name);
  res.render('partials/' + name);
};