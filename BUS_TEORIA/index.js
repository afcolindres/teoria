var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var credenciales = {
     host:"localhost",
     user:"root",
     password:"",
     port:"3306",
     database: "bd_s_bus"
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/rutas", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT COD_RUTA, CANT_P_CLASE, CANT_P_NORMAL, CANT_TRA_EDAD_NIÑOS, UTILIDAD 
                    FROM tbl_rutas`,
        [],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});


app.post("/registrar_rutas", function(req,res){
    if (req.body.cant_viajes!=0) {
        var conexion = mysql.createConnection(credenciales);
        for (let index = 0; index < req.body.cant_viajes; index++) {
            x = Math.round(Math.random() * (11 - 1) + 1);
            x2 = Math.round(Math.random() * (30 - 1) + 1);
            x3 =30-x2;
            x4=((x*1000)+(x2*700)+(x3*500))-(7000+((x+x2+x3)*50));
            conexion.query(`INSERT INTO tbl_rutas (CANT_P_CLASE, CANT_P_NORMAL, CANT_TRA_EDAD_NIÑOS, UTILIDAD) 
                    VALUES (?,?,?,?)`,
                [x,x2,x3,x4],
                function(error, data, fields){
                    //console.log(data);
                }
            );
            
        }
        var json=[{mensaje :'1'}];
        // console.log(json);
        res.send(json);
    }
});

app.post("/detalle_ruta", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT COD_RUTA, CANT_P_CLASE, CANT_P_NORMAL, CANT_TRA_EDAD_NIÑOS, UTILIDAD 
                    FROM tbl_rutas
                    where COD_RUTA=?`,
        [req.body.codigo_ruta],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.post("/detalle_rutas", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT COD_RUTA, CANT_P_CLASE, CANT_P_NORMAL, CANT_TRA_EDAD_NIÑOS, UTILIDAD 
                    FROM tbl_rutas`,
        [],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});


app.listen(8008, function(){ 
    console.log("Servidor iniciado, en el puerto 8008");
});