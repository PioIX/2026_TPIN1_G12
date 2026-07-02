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

app.get('/todopreporpar', async function(req,res){
    let respuesta;
    
    respuesta = await realizarQuery("SELECT * FROM Preguntas_por_partida");    
    res.send(respuesta);
})



//         PEDIDOS ESPECIFICOS  (Para get pasar el parámetro como: localhost:4000/nombreDelPedido?parametro1=valor1)
app.get('/idusuario', async function(req,res){
    let respuesta;
    if (req.query.usuario != undefined) {
        respuesta = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE usuario="${req.query.usuario}"`)
    } else {
        respuesta = "Por favor especificar parámetro (usuario)"
    }    
    res.send(respuesta);
})

app.get('/ranking', async function(req,res){
    let respuesta;
   
    respuesta = await realizarQuery(`SELECT Usuarios.id_usuario, usuario, puntaje_final, id_partida FROM Partidas 
        INNER JOIN Usuarios on Usuarios.id_usuario = Partidas.id_usuario
        ORDER BY puntaje_final DESC`)
    res.send(respuesta);
})

app.get('/confirmar', async function(req,res){
    let respuesta;
    if (req.query.id_usuario != undefined) {
    respuesta = await realizarQuery(`SELECT es_admin FROM Usuarios 
        WHERE id_usuario = ${req.query.id_usuario}`)
    } else {
        respuesta = "Por favor especificar parámetro id usuario"
    }
    res.send(respuesta);
})

app.get('/usuarioespecifico', async function(req,res){
    let respuesta;
    if (req.query.id_usuario != undefined) {
    respuesta = await realizarQuery(`SELECT * FROM Usuarios 
        WHERE id_usuario = ${req.query.id_usuario}`)
    } else {
        respuesta = "Por favor especificar parámetro id usuario"
    }
    res.send(respuesta);
})

app.put('/editarpuntaje', async function(req,res) {
    try {

        let respuesta =  await realizarQuery(`
            Select  *  From Partidas 
            Where id_partida = ${req.body.id_partida}
            `)

        if (respuesta.length != 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Partidas 
            Set puntaje_final = ${req.body.puntaje_final}
            Where id_partida = ${req.body.id_partida}
            `)
            res.send("Partida editada")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})




//       POSTS
app.post('/usuarionuevo', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta =  await realizarQuery(`
        Select  *  From Usuarios 
        Where usuario = "${req.body.usuario}"
        `)
    if (respuesta.length == 0) {
       await realizarQuery(`
        INSERT INTO Usuarios(usuario, contraseña, nombre, es_admin) VALUES 
        ("${req.body.usuario}","${req.body.contraseña}","${req.body.nombre}",${req.body.es_admin})
    `)
        let respuesta2 = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE usuario="${req.body.usuario}"`)
        res.send({mensaje: "Usuario agregado", ok: true, id_user: respuesta2[0].id_usuario}) 
    } else {
        res.send({mensaje: "Este dato ya existe", ok: false})
    }
    
})

app.post('/palabranueva', async function(req,res) { 
    try{
        console.log(req.body)

        let respuesta2 =  await realizarQuery(`
            Select  *  From Preguntas 
            Where id_pregunta = ${req.body.id_pregunta}
            `)
        
        if (respuesta2.length != 0 ) {
            await realizarQuery(`
            INSERT INTO Palabras(palabra, puntaje, id_pregunta) VALUES
            ("${req.body.palabra}",${req.body.puntaje},${req.body.id_pregunta})
        `)
            res.send({mensaje: "Palabra agregada"}) 
        }
    }
    catch {
        res.send({mensaje: "Este dato ya existe o no hay FK"})
        res.send({respuesta2: respuesta2})
    }
    
})

app.post('/partidanueva', async function(req,res) {
    console.log(req.body) 
  
    let respuesta2 =  await realizarQuery(`
        Select  *  From Usuarios 
        Where id_usuario = ${req.body.id_usuario}
        `)

    if (respuesta2.length != 0) {
        realizarQuery(`
        INSERT INTO Partidas(puntaje_final, id_usuario) VALUES 
        (${req.body.puntaje_final},${req.body.id_usuario})
    `)
        res.send({mensaje: "Partida agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe o no hay FK"})
    }
    
})

app.post('/preguntanueva', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  *  From Preguntas 
        Where pregunta = "${req.body.pregunta}"
        `)
    if (respuesta.length == 0) {
        await realizarQuery(`
        INSERT INTO Preguntas(pregunta) VALUES 
        ("${req.body.pregunta}")
    `)
        let respuesta2 = await realizarQuery(`SELECT id_pregunta FROM Preguntas WHERE pregunta="${req.body.pregunta}"`)
        console.log(respuesta2)
        res.send({mensaje: "Pregunta agregada", id_pregunta: respuesta2[0].id_pregunta}) 
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
    let respuesta2 =  await realizarQuery(`
        Select  *  From Partidas
        Where id_partida = ${req.body.id_partida}
    `)
    let respuesta3 =  await realizarQuery(`
        Select  *  From Preguntas
        Where id_pregunta = ${req.body.id_pregunta}
    `)

    if (respuesta.length == 0 && respuesta2.length != 0 && respuesta3.length != 0) {
        realizarQuery(`
        INSERT INTO Preguntas_por_partida(id_por_partida, id_partida, id_pregunta, puntaje_pregunta) VALUES 
        (${req.body.id_por_partida},${req.body.id_partida},${req.body.id_pregunta},${req.body.puntaje_pregunta})
    `)
        res.send({mensaje: "Pregunta por partida agregada"}) 
    } else {
        res.send({mensaje: "Este dato ya existe o falla alguna FK"})
    }
    
})





//     PUTS
app.put('/editarusuario', async function(req,res) {
    try {
        let respuesta =  await realizarQuery(`
        Select  *  From Usuarios 
        Where id_usuario = ${req.body.id_usuario}
        `)
        if (respuesta.length == 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Usuarios 
            Set id_usuario = ${req.body.id_usuario},
            usuario = "${req.body.usuario}",
            contraseña = "${req.body.contraseña}",
            nombre = "${req.body.nombre}",
            es_admin = ${req.body.es_admin}
            Where id_usuario = ${req.body.id_usuario2}
            `)
            res.send("Usuario editado")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})

app.put('/editarpalabra', async function(req,res) {
    try {

        let respuesta =  await realizarQuery(`
            Select  *  From Palabras 
            Where id_palabra = ${req.body.id_palabra}
        `)
        let respuesta2 =  await realizarQuery(`
            Select  *  From Preguntas 
            Where id_pregunta = ${req.body.id_pregunta}
        `)

        if (respuesta.length == 0 && respuesta2.length != 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Palabras 
            Set id_palabra = ${req.body.id_palabra},
            palabra = "${req.body.palabra}",
            puntaje = ${req.body.palabra},
            id_pregunta = "${req.body.id_pregunta}"
            Where id_palabra = ${req.body.id_palabra2}
            `)
            res.send("Palabra editada")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})

app.put('/editarpartida', async function(req,res) {
    try {

        let respuesta =  await realizarQuery(`
            Select  *  From Partidas 
            Where id_partida = ${req.body.id_partida}
            `)
        let respuesta2 =  await realizarQuery(`
            Select  *  From Usuarios 
            Where id_usuario = ${req.body.id_usuario}
        `)
        if (respuesta.length == 0 && respuesta2.length != 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Partidas 
            Set id_partida = ${req.body.id_partida},
            puntaje_final = ${req.body.puntaje_final},
            id_usuario = ${req.body.id_usuario}
            Where id_partida = ${req.body.id_partida2}
            `)
            res.send("Partida editada")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})

app.put('/editarpregunta', async function(req,res) {
    try {
        let respuesta =  await realizarQuery(`
        Select  *  From Preguntas 
        Where id_pregunta = ${req.body.id_pregunta}
        `)
        if (respuesta.length == 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Preguntas 
            Set id_pregunta = ${req.body.id_pregunta},
            pregunta = "${req.body.pregunta}"
            Where id_pregunta = ${req.body.id_pregunta2}
            `)
            res.send("Pregunta editada")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})

app.put('/editarpreporpar', async function(req,res) {
    try {
        let respuesta =  await realizarQuery(`
        Select  *  From Preguntas_por_partida
        Where id_por_partida = ${req.body.id_por_partida}
        `)
        let respuesta2 =  await realizarQuery(`
        Select  *  From Partidas
        Where id_partida = ${req.body.id_partida}
        `)
        let respuesta3 =  await realizarQuery(`
        Select  *  From Preguntas
        Where id_pregunta = ${req.body.id_pregunta}
        `)

        if (respuesta.length == 0 && respuesta2.length != 0 && respuesta3.length != 0) {
            console.log(req.body) 
            realizarQuery(`
            Update Preguntas_por_partida 
            Set id_por_partida = ${req.body.id_por_partida},
            id_partida = ${req.body.id_partida},
            id_pregunta = ${req.body.id_pregunta},
            puntaje_pregunta = ${req.body.puntaje_pregunta}
            Where id_por_partida = ${req.body.id_por_partida2}
            `)
            res.send("Pregunta por partida editada")
        } else {
            res.send({mensaje: "Error"})
        }
    } catch{
        res.send({error: "error del try"})
    }
})




// Deletes 

app.delete('/borrarusuario', function(req,res) {
    try{
    console.log(req.body) 
    realizarQuery(`
    Delete From Usuarios Where id_usuario = ${req.body.id_usuario}
    `)
    res.send("Usuario eliminado")
    } catch{
        res.send({error: "error del try"})
    }
})

app.delete('/borrarpalabra', function(req,res) {
    try{
    console.log(req.body) 
    realizarQuery(`
    Delete From Palabras Where id_palabra = ${req.body.id_palabra}
    `)
    res.send("Palabra eliminada")
     } catch{
        res.send({error: "error del try"})
    }
})

app.delete('/borrarpartida', function(req,res) {
    try{
    console.log(req.body) 
    realizarQuery(`
    Delete From Partidas Where id_partida = ${req.body.id_partida}
    `)
    res.send("Partida eliminada")
     } catch{
        res.send({error: "error del try"})
    }
})

app.delete('/borrarpregunta', function(req,res) {
    try{
    console.log(req.body) 
    realizarQuery(`
    Delete From Preguntas Where id_pregunta = ${req.body.id_pregunta}
    `)
    res.send("Pregunta eliminada")
     } catch{
        res.send({error: "error del try"})
    }
})

app.delete('/borrarpreporpar', function(req,res) {
    try{
    console.log(req.body) 
    realizarQuery(`
    Delete From Preguntas_por_partida Where id_por_partida = ${req.body.id_por_partida}
    `)
    res.send("Pregunta por partida eliminada")
     } catch{
        res.send({error: "error del try"})
    }
})