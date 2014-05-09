var mysql = require('mysql');

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
  ],
  "masterPosts": [
    {
      "title": "Qualidade da Água",
      "text": "Boa",
      "unit": "",
      "colorRGB1": "200,200,200",
      "color1": "#666",
      "colorRGB2": "0,255,0",
      "color2": "#0f0"
    }
  ]
};

// GET

exports.posts = function (req, res) {
  var posts = [];
  var masterPosts = [];
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
  data.masterPosts.forEach(function (post, i) {
    masterPosts.push({
      id: i,
      title: post.title,
      // text: post.text.substr(0, 50),
      text: post.text,
      unit: post.unit,
      colorRGB1: post.colorRGB1,
      color1: post.color1,
      colorRGB2: post.colorRGB2,
      color2: post.color2
    });
    // console.log(posts);
  });
  // console.log(masterPosts);
  res.json({
    posts: posts,
    masterPosts : masterPosts
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