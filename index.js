let http = require("http");
let express = require("express");
let app = express();
let fs = require("fs");
let sharp = require("sharp");

let fileNumber = 0;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/app'));

let server = http.createServer(app);
server.listen(8080, () => {
	console.log("Server listening on Port 8080");
	fs.readdir(__dirname + '/images', function(err, files){
		if(err){
			return console.log("Konnte kein images Verzeichnis finden.");
		}
		files.forEach(function(file){
			fileNumber++;
		});
	});
});

app.get('/id/:id', function(req, res){
	try {
		res.contentType("image/jpeg");
		let rs = fs.createReadStream(__dirname + '/images/' + req.params.id + '.jpg');
		rs.on('open', function(){
			rs.pipe(res);
		});
		rs.on('error', function(){
			res.contentType("text/plain");
			res.status(200).send("Bild mit dieser ID existiert nicht.");
		});
	} catch {
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
	}
});

app.get('/random', function(req, res){
	let index = Math.floor(Math.random() * Math.floor(fileNumber));
	res.contentType("image/jpeg");
	let rs = fs.createReadStream(__dirname + '/images/' + index + '.jpg');
	rs.on('open', function(){
		rs.pipe(res);
	});
	rs.on('error', function(){
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
	});
});

app.get('/id/:id/:size', function(req, res){
	try {
		res.contentType("image/jpeg");
		let image = sharp(__dirname + '/images/' + req.params.id + '.jpg');
		image.resize(parseInt(req.params.size), parseInt(req.params.size));
		if(req.query.grayscale != null || req.query.greyscale != null){
			image.toColorspace('b-w');
		}
		if(req.query.blur != null){

			let blurValue = req.query.blur != "" ? parseInt(req.query.blur) : 5;
			if(blurValue < 1){
				blurValue = 1;
			}
			if(blurValue > 100){
				blurValue = 100;
			}
			image.blur(blurValue);
		}
		image.toBuffer().then(data => {
			res.status(200).send(data);	
		})
	} catch(e) {
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
		console.log(e);
	}
});

app.get('/random/:size', function(req, res){
	let index = Math.floor(Math.random() * Math.floor(fileNumber));
	try {
		res.contentType("image/jpeg");
		let image = sharp(__dirname + '/images/' + index + '.jpg');
		image.resize(parseInt(req.params.size), parseInt(req.params.size));
		if(req.query.grayscale != null || req.query.greyscale != null){
			image.toColorspace('b-w');
		}
		if(req.query.blur != null){

			let blurValue = req.query.blur != "" ? parseInt(req.query.blur) : 5;
			if(blurValue < 1){
				blurValue = 1;
			}
			if(blurValue > 100){
				blurValue = 100;
			}
			image.blur(blurValue);
		}
		image.toBuffer().then(data => {
			res.status(200).send(data);	
		})
	} catch(e) {
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
		console.log(e);
	}
});

app.get('/id/:id/:sizex/:sizey', function(req, res){
	try {
		res.contentType("image/jpeg");
		let image = sharp(__dirname + '/images/' + req.params.id + '.jpg');
		image.resize(parseInt(req.params.sizex), parseInt(req.params.sizey));
		if(req.query.grayscale != null || req.query.greyscale != null){
			image.toColorspace('b-w');
		}
		if(req.query.blur != null){

			let blurValue = req.query.blur != "" ? parseInt(req.query.blur) : 5;
			if(blurValue < 1){
				blurValue = 1;
			}
			if(blurValue > 100){
				blurValue = 100;
			}
			image.blur(blurValue);
		}
		image.toBuffer().then(data => {
			res.status(200).send(data);	
		})
		
	} catch(e) {
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
		console.log(e);
	}	
});

app.get('/random/:sizex/:sizey', function(req, res){
	let index = Math.floor(Math.random() * Math.floor(fileNumber));
	try {
		res.contentType("image/jpeg");
		let image = sharp(__dirname + '/images/' + index + '.jpg');
		image.resize(parseInt(req.params.sizex), parseInt(req.params.sizey));
		if(req.query.grayscale != null || req.query.greyscale != null){
			image.toColorspace('b-w');
		}
		if(req.query.blur != null){

			let blurValue = req.query.blur != "" ? parseInt(req.query.blur) : 5;
			if(blurValue < 1){
				blurValue = 1;
			}
			if(blurValue > 100){
				blurValue = 100;
			}
			image.blur(blurValue);
		}
		image.toBuffer().then(data => {
			res.status(200).send(data);	
		})
		
	} catch(e) {
		res.contentType("text/plain");
		res.status(200).send("Bild mit dieser ID existiert nicht.");
		console.log(e);
	}
});