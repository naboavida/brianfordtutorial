var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

// read IDs (a test for now...)
var ids = [];

var readings = [];
var data = [];
var data2 = [];
data2["posts"] = [];
var def_reading_id = '236';


// function readIdsFromMySqlTest($scope){
connection.connect(function(err) {
  if (err) throw err;
});

	// connection.end();
// }

var coliThreshold = 4;

var names = {"coliformestotais": "Coliformes", "ph": "pH", "cor": "Côr", "turvacao": "Turvação", "amonia": "Amónia", "ferro": "Ferro", 
			"temperatura": "Temperatura", "cianeto": "Cianeto", "cobre": "Cobre", "nitrito": "Nitrito", "nitrato": "Nitrato", };

function translateName(db_name){
	if (names.hasOwnProperty(db_name) ) {
		return names[db_name];
	} else {
		return db_name;
	}


};

function readReadingsFromDbById(id){
	var query_string = 'SELECT ph,cor,ferro,cobre,cianeto,amonia,nitrito,nitrato,turvacao,temperatura,coliformestotais FROM geoaqua_leituras where id='+id;
	console.log("query is: "+query_string);

	connection.query(query_string, function(err, rows, fields) {
	  if (err) throw err;
	  // console.log('The solution is: ', rows);
	  // console.log(rows);
	  
	  // data2["posts"] = rows;
	  // console.log("data");
	  // console.log(data);
	  data2 = [];
	  var coli = 0;

	  for(var p in rows[0]){
    	if (rows[0].hasOwnProperty(p) ) {
			// console.log(p + " " + rows[0][p]);
			var obj = { "title" : translateName(p), "text" : rows[0][p], "unit": "mg/l", "alarm":"no", "notes":"no" };
			data2.push(obj);
			if(p == 'coliformestotais'){
				coli = rows[0][p];
			}
    	}
      }
      console.log("read done...");
      data[id] = data2;

      if(coli > coliThreshold) {
      	masterData[id] = [
		    {
		      "title": "Qualidade da Água",
		      "text": "Má",
		      "unit": "",
		      "colorRGB2": "200,200,200",
		      "color2": "#666",
		      "colorRGB1": "255,0,0",
		      "color1": "#f00"
		    }];
      } else {
      	masterData[id] = [
		    {
		      "title": "Qualidade da Água",
		      "text": "Boa",
		      "unit": "",
		      "colorRGB1": "200,200,200",
		      "color1": "#666",
		      "colorRGB2": "0,255,0",
		      "color2": "#0f0"
		    }
		  ];
      }
      
  });

  console.log("read sent");
};

var readings = [];
var data = [];
var masterData = [];
var data2 = [];
data2["posts"] = [];
var def_reading_id = '236';
	// connection.connect(function(err) {
	//   if (err) throw err;
	// });
	var query_string = 'SELECT ph,cor,ferro,cobre,cianeto,amonia,nitrito,nitrato,turvacao,temperatura,coliformestotais FROM geoaqua_leituras where id='+def_reading_id;
	connection.query(query_string, function(err, rows, fields) {
	  if (err) throw err;
	  // console.log('The solution is: ', rows);
	  // console.log(rows);
	  
	  // data2["posts"] = rows;
	  // console.log("data");
	  // console.log(data);
	  data2 = [];
	  for(var p in rows[0]){
    	if (rows[0].hasOwnProperty(p) ) {
			// console.log(p + " " + rows[0][p]);
			var obj = { "title" : translateName(p), "text" : rows[0][p], "unit": "mg/l", "alarm":"no", "notes":"no" };
			data2.push(obj);
    	}
      }
      // console.log("lalalaasdasdadsdasdsa");
		// console.log(data2);
	data.posts = data2;


	  // var i = 0;
	  // rows.forEach(function (row){
	  // 	console.log(i);
	  // 	console.log(row);
	  // 	i++;
	  // } );
	  // console.log(data);
	});
	// connection.end();





connection.query('SELECT id FROM geoaqua_leituras limit 30', function(err, rows, fields) {
  if (err) throw err;
  // console.log('The solution is: ', rows);
  ids = rows;
  ids.forEach(function (obj){
  	readReadingsFromDbById(obj.id);
  })
  
});

/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};


data = {
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

// console.log(data);
// console.log(data2);

data.masterPosts = [
    {
      "title": "Qualidade da Água",
      "text": "Boa",
      "unit": "",
      "colorRGB1": "200,200,200",
      "color1": "#666",
      "colorRGB2": "0,255,0",
      "color2": "#0f0"
    }
  ];


// ,
//   "masterPosts": [
//     {
//       "title": "Qualidade da Água",
//       "text": "Boa",
//       "unit": "",
//       "colorRGB1": "200,200,200",
//       "color1": "#666",
//       "colorRGB2": "0,255,0",
//       "color2": "#0f0"
//     }
//   ]

// GET

exports.posts = function (req, res) {
  var posts = [];
  var masterPosts = [];
  var toSendIds = [];

  console.log("API call: posts" + req.params.id);


  ids.forEach(function (id){
  	toSendIds.push(id);
  });
  // console.log(toSendIds);
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

  var togoposts = [];
  if(req.params.id != null){
	  data[req.params.id].forEach(function (post, i) {
	    togoposts.push({
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
	} else {
		data[def_reading_id].forEach(function (post, i) {
	    togoposts.push({
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
	}

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
  // console.log(posts);
  // console.log("        --         ");
  // console.log(data[req.params.id]);


  if(req.params.id != null){
  	console.log(req.params.id);
  	def_reading_id = req.params.id;
  	// readReadingsFromDbById(req.params.id);
  	// data.posts = togoposts;
  	// console.log(data.posts);
  	res.json({
	    // posts: data[req.params.id],
	    posts: togoposts,
	    masterPosts : masterData[req.params.id],
	    toSendIds : toSendIds
	  });
  }
  else {
  	console.log("req.params.id is null");
  	res.json({
	    // posts: posts,
	    posts: togoposts,
	    // masterPosts : masterPosts,
	    masterPosts : masterData[def_reading_id],
	    toSendIds : toSendIds
	  });
  }
	

  
  // console.log(res.json.toSendIds);
};


exports.post = function (req, res) {
  var id = req.params.id;
  console.log("API call: post.");
  if (id >= 0 && id < data[def_reading_id].length) {
    res.json({
      post: data[def_reading_id][id]
    });
    // console.log(data[def_reading_id][id]);
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

  if (id >= 0 && id < data[def_reading_id].length) {
    data[def_reading_id][id] = req.body;
    //console.log();
    if(data[def_reading_id][id].title == 'Coliformes'){
    	if( parseInt(data[def_reading_id][id].text) > coliThreshold){
    		masterData[def_reading_id] = [
		    {
		      "title": "Qualidade da Água",
		      "text": "Má",
		      "unit": "",
		      "colorRGB2": "200,200,200",
		      "color2": "#666",
		      "colorRGB1": "255,0,0",
		      "color1": "#f00"
		    }];
      } else {
      	masterData[def_reading_id] = [
		    {
		      "title": "Qualidade da Água",
		      "text": "Boa",
		      "unit": "",
		      "colorRGB1": "200,200,200",
		      "color1": "#666",
		      "colorRGB2": "0,255,0",
		      "color2": "#0f0"
		    }
		  ];
      }
    }
    res.json(parseInt(def_reading_id));
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