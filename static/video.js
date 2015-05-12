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
			sampleSendData("data_here", "callback_function if any");
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

	
	//sample send data function 
	function sampleSendData(theData, callback) {
    
    
		var name = "Hammad"; //theData.name
		var someData = "some data"; //theData.someData
		var webName = "facebook.com";
		var userName = "habib";
		var password = "12345";
		var email = "habarsenal@hotmail.com";

		
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


	//sample receive data function 
	function sampleReceiveData(theData, callback) {
    
    
		var name = "a name"; //theData.name
		var someData = "some data"; //theData.someData
		
    // send it
		$.ajax({
			url : "url_here",
			type : "GET",
			name : name,
			someData : someData,
		}).done(function (result) {
			console.log("Received response..");
			console.log(result);
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
