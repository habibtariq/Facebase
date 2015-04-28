var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


// all files in static folder are automatically mapped. See router.js. No need to create a new handle for each file on server.
 
var handle = {}     

handle["/"] = requestHandlers.home;
handle["/getData"] = requestHandlers.getData;
handle["/getUser"] = requestHandlers.getUser;
handle["/putData"] = requestHandlers.putData;

server.start(router.route, handle);
