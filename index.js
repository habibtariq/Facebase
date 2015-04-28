var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


// all files in static folder are automatically mapped. See router.js. No need to create a new handle for each file on server.
 
var handle = {}     

handle["/"] = requestHandlers.home;
//handle["/home"] = requestHandlers.home;

//handle["/send_payment_api"] = requestHandlers.send_payment_api;
//handle["/sample"] = requestHandlers.sample;
//handle["/get_transactions"] = requestHandlers.get_transactions;

handle["/getData"] = requestHandlers.getData;
handle["/getUser"] = requestHandlers.getUser;
handle["/putData"] = requestHandlers.putData;

server.start(router.route, handle);
