var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
// var credenciales = {
//     host:"localhost",
//     user:"root",
//     password:"",
//     port:"3306",
//     database: "bd_gafe"
// };

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.listen(8008, function(){ 
    console.log("Servidor iniciado, en el puerto 8008");
});