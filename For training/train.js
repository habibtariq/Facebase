var unirest = require('unirest');

function person(name, imageURL){
	unirest.post("https://lambda-face-recognition.p.mashape.com/album_train")
	 .header("X-Mashape-Key", "6Zey27MELrmshOumnm1Bxn2Zap7bp1GDomAjsnBn38rYQv5LZB")
	 .header("Content-Type", "application/x-www-form-urlencoded")
	 .header("Accept", "application/json")
	 .send("album=habibTariq")
	 .send("albumkey=7b6caeb1864fbdd5f09fe3899cd2d436199c3b28c843580e3f61689734d717aa")
	 .send("entryid="+name)
	 .send("urls="+imageURL)
	 .end(function (result) {
  		console.log(result.status, result.headers, result.body);
	  });
}

function rebuild(){
	unirest.get("https://lambda-face-recognition.p.mashape.com/album_rebuild?album=habibTariq&albumkey=7b6caeb1864fbdd5f09fe3899cd2d436199c3b28c843580e3f61689734d717aa")
	 .header("X-Mashape-Key", "6Zey27MELrmshOumnm1Bxn2Zap7bp1GDomAjsnBn38rYQv5LZB")
	 .header("Accept", "application/json")
	 .end(function (result) {
		console.log(result.status, result.headers, result.body);
	 });
}
exports.person = person;
exports.rebuild = rebuild;