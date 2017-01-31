"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

var http = require('http');
var fs = require('fs');
var port = 3010;

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['ace.jpg', 'bubble.jpg', 'chess.jpg', 'fern.jpg','mobile.jpg'];



function serveImage(filename, req, res) {
  fs.readFile('images/' +filename, function(err, body){
    if(err){
      console.error(err);
      res.statusCode(500);
      res.statusMessage("Whoopsies");
      res.end("Silly Me")
      return;
    }
    res.setHeader("Content-Type","image/jpeg");
    res.end(body);
  });
}
var server = http.createServer(function(req, res){

  switch(req.url){
    case '/gallery':
    var gHtml = imageNames.map(function(filename){
      return '  <image src="'+ filename+'"alt="a fishing ace at work">';
    }).join('');
    var html = "<!doctype html>";
        html +="<head>"
        html +=   "<title>Gallery</title>"
        html +='   <link href ="gallery.css" rel="stylesheet" type="text/css">';
        html +="</head>";
        html +='<body>';
        html +='  <h1>Gallery</h1>';
        html +=gHtml;
        html +="  <h1>Hello</h1> Time is " + Date.now();
        html +='</body>';
    res.end(html);
    break;
    case "/chess":
    case "/chess.jpg":
      serveImage('chess.jpg',req, res)
      break;
    case '/gallery.css':
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
      break;
    case "/ace":
    case "/ace.jpg":
    case "/ace.jpeg":
      serveImage('ace.jpg',req,res)
        break;
    case "/bubble":
    case "/bubble.jpg":
        serveImage('bubble.jpg',req,res)
        break;
    case "/fern":
    case "/fern/":
    case "/fern.jpg":
    case "/fern.jpeg":
        serveImage('fern.jpg',req,res)
        break;
    case "/mobile":
    case "/mobile.jpg":
        serveImage('mobile.jpg',req,res)
        break;

    default:
      res.statusCode = 404;
      res.statusMessage = "We aint found that";
      res.end();



  }


});

server.listen(port, function(){
  console.log("Listening on Port " + port);
});
