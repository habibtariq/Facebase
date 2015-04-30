$(window).load(function () {
	$(document).ready(function () {
		var file = null;
		$('#photo').photobooth().on("image", function (event, dataUrl) {
			document.getElementById("conf").value = "0.00";
			document.getElementById("formName").value = "No User";
			file = dataURLtoBlob(dataUrl);
			var size = file.size;
			alert("Picture size: " + size);
			uploadImage(file);
			$("#gallery").append('<img src="' + dataUrl + '" >');
		});
	});

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

	function uploadImage(file) {
		var fd = new FormData();
		// Append our Canvas image file to the form data
		fd.append("files", file);
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
			alert("Received response..");
			var Name = result.photos[0].tags[0].uids[0].prediction;
			var confidence = result.photos[0].tags[0].uids[0].confidence;
			//        alert(Name);
			document.getElementById("conf").value = confidence;
			document.getElementById("formName").value = Name;
		});
	}
}); // Closes window.load