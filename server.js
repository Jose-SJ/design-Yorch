//data base
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'rhpj-database.czm8qnebos6f.us-east-1.rds.amazonaws.com',
    user: 'RHPJ',
    password: 'Miuniverso423',
    database: 'Database-schema-J'
});
//sniffer
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
var mensaje;
server.on("error", err => {
  console.log(`server error:\n${err.stack}`);//si hay un error me lo dice
  server.close();// cierra el sniffer
});
server.on("message", (msg, rinfo) => {
  //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  mensaje = msg.toString("utf8");
  let Fecha,Hora;
  let long, lat, fech;
   
  // Deco
  var time1;
  weeks = parseInt(raw_data.slice(6,10))
  time = parseInt(raw_data.slice(11,16))

  const today = new Date(1980, 0, 8)
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const seconds = today.getDate()
  // Creating a new Date (with the delta)
  const finalDate = new Date(year, month, day + 7*weeks, 0, 0, seconds + time + 14*60*60)
    fecha=finalDate.toISOString().slice(0,10);
    hora=finalDate.toISOString().slice(11,19);
  latitudap = mensaje.slice(16,19);
  latituddp = mensaje.slice(19,24);
  latitud = latitudap + "." + latituddp;
  
  longitudap1 = mensaje[24];
  longitudap2 = mensaje.slice(26,28);
  longituddp = mensaje.slice(28,33);
  longitud = longitudap1 + longitudap2 + "." + longituddp;


    if (con) {
 
      console.log("Connected!");
      var sql =
        "INSERT INTO syrusmsg2 (fech, hora, lat, long ) VALUES ?";
      var value = [[Fecha, Hora, lat, long]];
      con.query(sql, [value], function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        //con.end();
      });
    } else {
      console.log("Error conection with db");
    }
  
  

  // insertar aqui db
});
server.on("listening", () => {
  const address = server.address();
  //console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(51000, "172.31.36.95"); //172.31.36.95
// Prints: server listening 0.0.0.0:41234

// server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");// nejorar el envio de uinf

const path = require("path");
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", __dirname + "/views");

// static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("views/index.html")
});

app.get("/datos", (req, res) => {
  if (con) {
    var sql = "SELECT * FROM syrusmsg ORDER BY igmsg DESC limit 1 ";
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result[0]);
      //con.end();
    });
  } else {
    console.log("error conection with db");
  }
  //res.json(`${mensaje}`);
});
app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});