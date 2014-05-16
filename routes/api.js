var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

// read IDs (a test for now...)
var ids = [{"id":"223"}, {"id":"225"}];

var readings = [];
var data = [];
var data2 = [];
data2["posts"] = [];
var def_reading_id = '223';
var def_limit_read = '160';
var ids_positions = [{"pid":0, "id":"223", "lat":"0.194333333333", "lon":"6.69913888889"}, {"pid":0, "id":"225", "lat":"0.195861111111", "lon":"6.68877777778"}];
var connection_active = false;

// function readIdsFromMySqlTest($scope){
connection.connect(function(err) {
  if (err) return; else connection_active=true;
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
	// console.log("query is: "+query_string);

	connection.query(query_string, function(err, rows, fields) {
	  // if (err) throw err;
	  if (err) return;

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
      // console.log("read done...");
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

  // console.log("read sent");
};

var readings = [];
var data = [];
var masterData = [];
var data2 = [];
data2["posts"] = [];

	// connection.connect(function(err) {
	//   if (err) throw err;
	// });
	var query_string = 'SELECT ph,cor,ferro,cobre,cianeto,amonia,nitrito,nitrato,turvacao,temperatura,coliformestotais FROM geoaqua_leituras where id='+def_reading_id;
	connection.query(query_string, function(err, rows, fields) {
	  // if (err) throw err;
	  if (err) return;

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





// if(connection_active){
//   ids_positions = [];



// }


// var query_string = 'SELECT id_ponto FROM geoaqua_leituras where id='+aux_id;
var query_string = 'SELECT id,id_ponto FROM geoaqua_leituras limit '+def_limit_read;
  console.log("query is: "+query_string);

  connection.query(query_string, function(err, rows, fields) {
    // if (err) throw err;
    if (err) return;

    // console.log('The solution is: ', rows);
    // console.log(rows);
    
    // data2["posts"] = rows;
    // console.log("data");
    // console.log(data);
    ids_positions = [];

    rows.forEach(function (elem){
      // console.log(elem.id_ponto);

      // console.log("read ids_geo done...");
      // console.log("p: "+elem.id_ponto);

      // tirar o cod_sistema e o codigo
      // fazer query com os dois acima
      var q_codigo = elem.id_ponto.substring(0,4);
      var q_cod_sistema = elem.id_ponto.substring(5,9);

      

      if(q_codigo.length == 4 && q_cod_sistema.length > 2){
        var newquery = 'select geoaqua_leituras.id, x, y from geoaqua_fontenariorede inner join geoaqua_leituras where codigo="'+q_cod_sistema+'" and cod_sistema="'+q_codigo+'"';

        connection.query(newquery, function(err, rows, fields) {
          if (err) throw err;

          // console.log("rows");
          // console.log(rows);
          // console.log(fields);
          if(rows[0] != undefined){
            // console.log('The solution22 is: ', rows);
            // the pid below must be mapped with the current project being read
            var obj = { "pid": 0, "id" : elem.id, "lat" : rows[0].y, "lon": rows[0].x};
            ids_positions.push(obj);
          }

          
          
        });
      }
      

      // console.log("read ids_geo done..."+newquery);

    });

    for(var p in rows[0]){
      if (rows[0].hasOwnProperty(p) ) {
        // console.log(p + " " + rows[0][p]);
        // var obj = { "id" : p, "lat" : rows[0][p], "lon": "mg/l"};
        // ids_positions.push(obj);


        // console.log("read ids_geo done...");
        // console.log("p: "+rows[0][p]);

        // // tirar o cod_sistema e o codigo
        // // fazer query com os dois acima
        // var q_codigo = rows[0][p].substring(0,4);
        // var q_cod_sistema = rows[0][p].substring(5,9);

        // var newquery = 'select x, y from geoaqua_fontenariorede where codigo="'+q_cod_sistema+'" and cod_sistema="'+q_codigo+'"';

        // if(q_codigo.length == 4 && q_cod_sistema.length == 4){
        //   connection.query(newquery, function(err, rows, fields) {
        //     if (err) throw err;

        //     console.log("rows");
        //     console.log(rows);
        //     if(rows[0] != undefined){
        //       // console.log('The solution22 is: ', rows);
        //       var obj = { "id" : 223, "lat" : rows[0].y, "lon": rows[0].x};
        //       ids_positions.push(obj);
        //     }

            
            
        //   });
        // }
        

        // console.log("read ids_geo done..."+newquery);
      }
    }
      
      // data[id] = data2;

      
      
  });




data = {
  "223": [
    {
      "title": "Coliformes",
      "text": "2",
      "unit": "UFC/0.1l",
      "alarm": "yes",
      "notes": "yes",
      "bulletData": {
          "ranges": [1, 180, 300],
          "measures": [70],
          "markers": [100]
      }
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
      "text": "4",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "yes"
    },
    {
      "title": "Pedra",
      "text": "1",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Cal",
      "text": "3",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Fertilizantes",
      "text": "1",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    },
    {
      "title": "Alumínio",
      "text": "33",
      "unit": "mg/l",
      "alarm": "no",
      "notes": "no"
    }
  ],
  "225": [
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

masterData[ids[0].id] = [
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
masterData[ids[1].id] = [
    {
      "title": "Qualidade da Água",
      "text": "Má",
      "unit": "",
      "colorRGB2": "200,200,200",
      "color2": "#666",
      "colorRGB1": "255,0,0",
      "color1": "#f00"
    }
  ];

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



project_info = [
  {
    "id": "0",
    "nome": "São Tomé",
    "habitantesPax": "124455",
    "areaHa": "100"
  },
  {
    "id": "1",
    "nome": "Príncipe",
    "habitantesPax": "1235",
    "areaHa": "20"
  }
]


connection.query('SELECT id FROM geoaqua_leituras limit '+def_limit_read, function(err, rows, fields) {
  // if (err) throw err;
  if (err) ; else ids = rows;

  // console.log('The solution is: ', ids);
  
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
  // data.posts.forEach(function (post, i) {
  //   posts.push({
  //     id: i,
  //     title: post.title,
  //     // text: post.text.substr(0, 50),
  //     text: post.text,
  //     unit: post.unit,
  //     alarm: post.alarm,
  //     notes: post.notes
  //   });
  //   // console.log(posts);
  // });

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
	      notes: post.notes,
        bulletData: post.bulletData
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
  	// console.log(req.params.id);
  	def_reading_id = req.params.id;
  	// readReadingsFromDbById(req.params.id);
  	// data.posts = togoposts;
  	// console.log(data.posts);
  	res.json({
	    // posts: data[req.params.id],
	    posts: togoposts,
	    masterPosts : masterData[req.params.id],
	    toSendIds : toSendIds,
      last_read_id : def_reading_id
	  });
  }
  else {
  	// console.log("req.params.id is null");
  	res.json({
	    // posts: posts,
	    posts: togoposts,
	    // masterPosts : masterPosts,
	    masterPosts : masterData[def_reading_id],
	    toSendIds : toSendIds,
      last_read_id : def_reading_id,
      project_info : project_info
	  });
  }
	

  
  // console.log(res.json.toSendIds);
};


exports.post = function (req, res) {
  var id = req.params.id;
  // console.log("API call: post.");
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
	// console.log("API call: addPost");
  data[def_reading_id].push(req.body);
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

  if (id >= 0 && id < data[def_reading_id].length) {
    data[def_reading_id].splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};

exports.geoapi = function (req, res){
	console.log("API call: geoapi");
	// console.log(req);
	res.json(ids_positions);
  // console.log(ids_positions);
}