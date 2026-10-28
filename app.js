let express = require("express");
let cors = require("cors");
let mysql = require("mysql2");

const app = express();
const PORT = 5000

app.use(express.json());
app.use(cors());

//conexion a la base de datos
let conectar = mysql.createConnection({
    host:"127.0.0.1",
    user: "root",
    password: "061205",
    database: "inventario",
    port: 3306
});

conectar.connect((error)=>{
    if(error){
        console.log("error conexion bd")
    }
    else{
        console.log("conexion realizada")
    }
});

app.get("/prueba",(req,res)=>{
    res.json({"mensaje": "esto es una prueba"})
});

app.post("/guardar",(req,res)=>{
    const {nombre, precio} = req.body
    res.json({"mensaje": "datos recibidos" + nombre + precio})
});

app.post("/productos",(req,res)=>{
    const {nombre, categoria, precio, cantidad} = req.body
    conectar.query("INSERT INTO productos (nombre, categoria, precio, cantidad) VALUES (?,?,?,?)", 
        [nombre, categoria, precio, cantidad],(error,resultado)=>{
            if(error){
                return res.json({"mensaje": "error al registrar el producto"})
            }
            else{
                return res.json({"mensaje": "producto registrado correctamente"})
            }
        });
});

app.get("/productos",(req,res)=>{
    conectar.query("SELECT * FROM productos",(error,resultado)=>{
        if (error){
            return res.json({"mensaje": "error al traer los datos de producto"})
        }
        else{
            return res.json(resultado)
        }
    });
});


app.listen(PORT,()=>{
    console.log("servidor en ejecucion"+PORT)
});