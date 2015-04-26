var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Totti10',
  database : 'test'
});
connection.connect();

 var name;
var server = http.createServer(function (req,res){

    if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
//    console.log('favicon requested');
    return;
    }
                            
    var url_parts = url.parse(req.url,true);
 //   console.log(req.url);
    
    var body = '';
    if(req.method === 'POST'){
       // res.end('post');
       console.log('Request found with POST method');     
        req.on('data', function (data) {
            body += data;
            console.log('got data:'+data);
        });
        req.on('end', function () {
 
            var POST = qs.parse(body);
            // use POST
            res.end("Sent data are name:"+POST.name+" age:"+POST.age);
 
        });
        
       
    } else {
    console.log('Request found with GET method');     
    req.on('data',function(data){ res.end(' data event: '+data);});
 //   console.log('got :'+ JSON.stringify(url_parts));
    if(url_parts.pathname == '/')
        
    fs.readFile('./index.html',function(error,data){ 
    console.log('Serving the page index.html');
    res.end(data);    
    });
    
    else if(url_parts.pathname == '/getData'){
         console.log('Serving the Got Data.');
        getData(res,url_parts);
    }
	
    else if(url_parts.pathname == '/getUser'){
         console.log('Serving the Got User.');
        getUser(res,url_parts);
    }
    else if(url_parts.pathname == '/putData'){
         console.log('Serving the Got User.');
        putData(res,url_parts);
    }	
        }
 
});
server.listen(8080);
console.log('Server listenning at localhost:8080');
 
 
 
function  getData(res,url_parts){

 console.log("Data requested by the user name:"+name+" for:"+url_parts.query.webName);
//        res.end("Data requested by the user name:"+name+" for:"+url_parts.query.webName);
var website = url_parts.query.webName;
    connection.query("SELECT * from facebase WHERE website = '"+website+"' AND user = '"+name+"'", function(err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            res.end(JSON.stringify(rows));
        }
        else
    console.log('Error while performing Query.');
    });

}
function  getUser(res,url_parts){

 console.log("Login by the user name:"+url_parts.query.formName+" and confidence:"+url_parts.query.conf);
        name = url_parts.query.formName;
		if(name != "No User"){
			fs.readFile('./form.html',function(error,data){ 
				console.log('Serving the page form.html');
				res.end(data);    
			});
		}
//		res.end("Data submitted by the user name:"+url_parts.query.name+" and confidence:"+url_parts.query.conf);
}
function  putData(res,url_parts){
var user = name, website = url_parts.query.webName, username = url_parts.query.userName,
password = url_parts.query.password, email = url_parts.query.email;

var post  = {user: user, website: website, username: username, password: password, email:email};
var query = connection.query('INSERT INTO facebase SET ?', post, function(err, result) {
  // Neat!
});
console.log(query.sql);

 console.log("Data submitted by the user name:"+name+" website:"+website+" Username:"+username+" passwd:"+ password+" email:"+email);
//        res.end("Data submitted by the user name:"+name+" website:"+url_parts.query.webName+" Username"+url_parts.query.userName);
            fs.readFile('./form.html',function(error,data){ 
                console.log('Serving the page form.html');
                res.end(data);    
            });
}
