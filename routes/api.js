/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};


var data = {
  "posts": [
    {
      "title": "Coliformes",
      "text": "6",
      "unit": "UFC/0.1l",
      "alarm": "yes",
      "notes": "yes"
    },
    {
      "title": "Ferro",
      "text": "334",
      "unit": "mg/l",
      "alarm": "yes",
      "notes": "no"
    },
    {
      "title": "Nitratos",
      "text": "12",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "yes"
    },
    {
      "title": "Pedra",
      "text": "6",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Cal",
      "text": "13",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Fertilizantes",
      "text": "7",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Alumínio",
      "text": "334",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    }
  ]
};

// GET

exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      // text: post.text.substr(0, 50),
      text: post.text,
      unit: post.unit,
      alarm: post.alarm,
      notes: post.notes
    });
    // console.log(posts);
  });
  res.json({
    posts: posts
  });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};