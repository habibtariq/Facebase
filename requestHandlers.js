var fs = require("fs"),
    formidable = require("formidable");
var url = require('url');
var connection = require('./database');
var train = require("./train");
connection.connect();


var name;

//redirect to index.html
function home(response) {
  console.log("Request handler 'home' was called.");

  response.writeHead(302, {'Location': 'index.html'});
  response.end();  
}


function getData(response, request) {
  console.log("getData was called");
  var url_parts = url.parse(request.url, true);

  var website = url_parts.query.webName;
  console.log("Data requested by the user name:" + name + " for:" + website);

	
	connection.query("SELECT * from facebase WHERE website = '" + website + "' AND user = '" + name + "'", function (err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
			response.end(JSON.stringify(rows));
		} else
			console.log('Error while performing Query.');
	});
  
  response.end();
}

function getUser(response, request) {
  console.log("getUser was called");
  var url_parts = url.parse(request.url, true);

  console.log("Login by the user name:" + url_parts.query.formName + " and confidence:" + url_parts.query.conf);
	name = url_parts.query.formName;
	if (name != "No User") {
    response.writeHead(302, {'Location': 'form.html'});
    response.end();
	}
  
  response.end(); //TODO
}

function putData(response, request) {
  console.log("putData was called");
  var url_parts = url.parse(request.url, true);
  console.log(url_parts);
  var user = url_parts.query.name,
	website = url_parts.query.webName,
	username = url_parts.query.userName,
	password = url_parts.query.password,
	email = url_parts.query.email;

	var post = {
		user : user,
		website : website,
		username : username,
		password : password,
		email : email
	};
	var query = connection.query('INSERT INTO facebase SET ?', post, function (err, result) {
			// Neat!
		});
	console.log(query.sql);

	console.log("Data submitted by the user name:" + name + " website:" + website + " Username:" + username + " passwd:" + password + " email:" + email);
	fs.readFile('./form.html', function (error, data) {
		console.log('Serving the page form.html');
		response.end(data);
	});
  
}

function putUser(response, request) {
  console.log("putUser was called");
  var url_parts = url.parse(request.url, true);

	console.log("Login User name:" + url_parts.query.name + " and image URL:" + url_parts.query.imageurl);
	train.person(url_parts.query.formname,url_parts.query.imageurl);
	train.rebuild();  
    response.writeHead(302, {'Location': 'trainingform.html'});
    response.end();
  
  response.end(); //TODO
}


exports.home = home;
exports.getData = getData;
exports.getUser = getUser;
exports.putData = putData;
exports.putUser = putUser;