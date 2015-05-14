$(window).load(function () {
	$(document).ready(function () {
    
    //Webcam.attach("#firstCamBox");
		Webcam.attach("#webCamBox");

		//capture button calls hidden trigger button to take picture
		$("#webCamBox").click(function () {
			SnapAndPredict();
		});
		
		
		//sample ajax send data
		$("#webCamBox").click(function () {
		});
		
		
	
	});
	
	function SnapAndPredict() {
    //take_snapshot and run prediction
		Webcam.snap(function (data_uri) {
			var image = dataURLtoBlob(data_uri);
			console.log("file size is: " + image.size);
			
			//run prediction and use result
			getPrediction(image, usePredictionResults);

		});
	}

  
  //Converts image DataURI to image Blob
	function dataURLtoBlob(dataUrl) {
		// Decode the dataURL
		var binary = atob(dataUrl.split(',')[1]);

		// Create 8-bit unsigned array
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}

		// Return our Blob object
		return new Blob([new Uint8Array(array)], {
			type : 'image/png'
		});
	}

	//submit Button
	$("#submit").click(function () {
		var theData= {name: document.getElementById("username").innerHTML,
			webName: document.getElementById("webName").value,
			userName: document.getElementById("userName").value,
			password: document.getElementById("password").value,
			email: document.getElementById("email").value
		};
		sendData(theData,"");		
	});
	
	//sample send data function 
	function sendData(theData, callback) {
    
    
		var name = theData.name; //theData.name
		var webName = theData.webName;
		var userName = theData.userName;
		var password = theData.password;
		var email = theData.email;

		
    // send it
		$.ajax({
			url : "putData",
			type : "GET",
			data: {	name : name, webName : webName,
					userName : userName, password : password,
					email : email}
		}).done(function (result) {
			console.log("Received response..");
			console.log(result);
			//callback
			//callback(result);
		});
	}


	//retrieve Button
	$("#retrieve").click(function () {
		var theData= {name: document.getElementById("username").innerHTML,
			webName: document.getElementById("webName").value};
		receiveData(theData,"");		
	});

	
	//sample receive data function 
	function receiveData(theData, callback) {
    
    
		var name = theData.name; //theData.name
		var webName = theData.webName;
		
    // send it
		$.ajax({
			url : "getData",
			type : "GET",
			data: {	name: name, webName: webName}
		}).done(function (result) {
			console.log("Received response..");
			console.log(result);
			userName: document.getElementById("userName").value = result[0].username;
			password: document.getElementById("password").value = result[0].password;
			email: document.getElementById("email").value = result[0].email;
			//callback
			//callback(result);
		});
	}	
	
	
  //uploads image and calls the callback with results
	function getPrediction(image, callback) {
    
    
    document.getElementById("unknownUser").style.display='none';
    document.getElementById("userInfo").style.display='none';
	document.getElementById("databaseForm").style.display='none';
    document.getElementById("loadingUser").style.display='block';
    
    
		// Append our Canvas image file to the form data
    var fd = new FormData();
		fd.append("files", image);
		fd.append("album", "habibTariq");
		fd.append("albumkey", "7b6caeb1864fbdd5f09fe3899cd2d436199c3b28c843580e3f61689734d717aa");
		
    // And send it
		$.ajax({
			url : "https://lambda-face-recognition.p.mashape.com/recognize",
			type : "POST",
			data : fd,
			processData : false,
			contentType : false,
			beforeSend : function (xhr) {
				xhr.setRequestHeader("X-Mashape-Authorization", "6Zey27MELrmshOumnm1Bxn2Zap7bp1GDomAjsnBn38rYQv5LZB");
			}
		}).done(function (result) {
			console.log("Received response..");
      //callback
      callback(result);
		});
	}
	
	//third Button
	$("#surprise").click(function () {
		console.log("third button pressed..");
		$.ajax({
			url : "getProject"//"3D_Solar_System/index.html",
			type : "GET",
		}).done(function (result) {
			console.log("Received response..");
			console.log(result);
			//callback
			//callback(result);
		});
		
	});

function usePredictionResults(result) {
    document.getElementById("loadingUser").style.display='none';
    
    if (result.photos[0].tags.length === 0) {
      console.log("unknown user");
      document.getElementById("unknownUser").style.display='block';;
    }
    else{
      document.getElementById("userInfo").style.display='block';
	  document.getElementById("databaseForm").style.display='block';
      var name = result.photos[0].tags[0].uids[0].prediction;
      var confidence = result.photos[0].tags[0].uids[0].confidence*100;
      document.getElementById("confidence").innerHTML = confidence;
      document.getElementById("username").innerHTML = name;
    }
}

  
  
  
  
  

}); // Closes window.load
