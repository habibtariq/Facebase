var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

 
var handle = {}     

handle["/"] = requestHandlers.home;
handle["/getData"] = requestHandlers.getData;
handle["/getUser"] = requestHandlers.getUser;
handle["/putData"] = requestHandlers.putData;

server.start(router.route, handle);
