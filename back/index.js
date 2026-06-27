var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

app.get ('/saludo', async function (req,res) {
    res.send({respuesta: "Hola"});
})







//         GETS GENERALES
app.get('/todousuarios', async function(req,res){
    let respuesta;
    
    respuesta = await realizarQuery("SELECT * FROM Usuarios");    
    res.send(respuesta);
})

app.get('/todopalabras', async function(req,res){
    let respuesta;
    
    respuesta = await realizarQuery("SELECT * FROM Palabras");    
    res.send(respuesta);
})

app.get('/todopreguntas', async function(req,res){
    let respuesta;
    respuesta = await realizarQuery("SELECT * FROM Preguntas");    
    res.send(respuesta);
})

app.get('/todopartidas', async function(req,res){
    let respuesta;
    
    respuesta = await realizarQuery("SELECT * FROM Partidas");    
    res.send(respuesta);
})

app.get('/todopreguntasporpartida', async function(req,res){
    let respuesta;
    
    respuesta = await realizarQuery("SELECT * FROM Preguntas_por_partida");    
    res.send(respuesta);
})


//          GETS ESPECIFICOS  (Pasar el parámetro como: localhost:3000/nombreDelPedido?parametro1=valor1)
app.get('/usuario', async function(req,res){
    let respuesta;
    if (req.query.usuario != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Usuarios WHERE Usuarios.usuario=${req.query.usuario}`)
    } else {
        respuesta = "Por favor especificar parámetro (usuario)"
    }    
    res.send(respuesta);
})




//       POSTS
app.post('/usernuevo', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta =  await realizarQuery(`
        Select  *  From Usuarios 
        Where usuario = "${req.body.usuario}"
        `)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Usuarios(usuario, contraseña, nombre, es_admin) VALUES 
        ("${req.body.usuario}","${req.body.contraseña}","${req.body.nombre}",${req.body.es_admin})
    `)
        res.send({mensaje: "Usuario agregado"}) 
    } else {
        res.send({mensaje: "Este dato ya existe"})
    }
    
})

app.post('/palabranueva', async function(req,res) { 
    console.log(req.body)
    let respuesta =  await realizarQuery(`
        Select  *  From Palabras 
        Where id_palabra = ${req.body.id_palabra}
        `)
    let respuesta2 =  await realizarQuery(`
        Select  *  From Preguntas 
        Where id_pregunta = ${req.body.id_pregunta}
        `)
    
    if (respuesta.length == 0 && respuesta2.length != 0 ) {
        realizarQuery(`
        INSERT INTO Palabras(id_palabra, palabra, puntaje, id_pregunta) VALUES
        (${req.body.id_palabra},"${req.body.palabra}",${req.body.puntaje},${req.body.id_pregunta})
    `)
        res.send({mensaje: "Palabra agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe o no hay FK"})
        res.send({respuesta2: respuesta2})
    }
    
})

app.post('/partidanueva', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  *  From Partidas 
        Where id_partida = ${req.body.id_partida}
        `)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Partidas(id_partida, puntaje_final, id_usuario) VALUES 
        (${req.body.id_partida},${req.body.puntaje_final},${req.body.id_usuario})
    `)
        res.send({mensaje: "Partida agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe"})
    }
    
})

app.post('/preguntanueva', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  *  From Preguntas 
        Where id_pregunta = ${req.body.id_pregunta}
        `)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Preguntas(id_pregunta, nombre) VALUES 
        (${req.body.id_pregunta},"${req.body.nombre}")
    `)
        res.send({mensaje: "Pregunta agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe"})
    }
    
})

app.post('/preporparnueva', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  *  From Preguntas_por_partida
        Where id_por_partida = ${req.body.id_por_partida}
        `)
    if (respuesta.length == 0) {
        realizarQuery(`
        INSERT INTO Preguntas_por_partida(id_por_partida, id_partida, id_pregunta, puntaje_pregunta) VALUES 
        (${req.body.id_por_partida},${req.body.id_partida},${req.body.id_pregunta},${req.body.puntaje_pregunta})
    `)
        res.send({mensaje: "Pregunta por partida agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe"})
    }
    
})





//     PUTS
app.put('/editarusuario', function(req,res) {
    console.log(req.body) 
    realizarQuery(`
    Update Usuarios 
    Set id_usuario = ${req.body.id_usuario}
    Set usuario = "${req.body.usuario}"
    Set contraseña = "${req.body.contraseña}"
    Set nombre = "${req.body.nombre}"
    Set es_admin = ${req.body.es_admin}
    Where id_usuario = ${req.body.id_usuario}
    `)
    res.send("Usuario editado")
})

app.put('/editarnombreempleado', function(req,res) {
    console.log(req.body) 
    realizarQuery(`
    Update Empleados 
    Set nombre = ${req.body.nombre}
    Where id_empleado = ${req.body.id_empleado}
    `)
    res.send("Empleado editado")
})








// Deletes 

app.delete('/borrarpais', function(req,res) {
    console.log(req.body) 
    realizarQuery(`
    Delete From Paises Where id_pais = ${req.body.id_pais}
    `)
    res.send("Pais eliminado")
})

app.delete('/borrarempresa', function(req,res) {
    console.log(req.body) 
    realizarQuery(`
    Delete From Empresas Where id_empresa = ${req.body.idEmpresa}
    `)
    res.send("Empresa eliminada")
})

app.delete('/borrarempleado', function(req,res) {
    console.log(req.body) 
    realizarQuery(`
    Delete From Paises Where id_empleado = ${req.body.id_empleado}
    `)
    res.send("Empleado eliminado")
})