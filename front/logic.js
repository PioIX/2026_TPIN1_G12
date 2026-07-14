
/* // INFO PARA Botones Cambiar de página
// Seleccionamos el botón por su ID
const boton = document.getElementById("miBoton");
// Escuchamos el evento 'click'
boton.addEventListener("click", function() {
    // Cambiamos el archivo al que queremos redirigir
    window.location.href = "pagina2.html";
});
*/

/* // FUNCIONES A HACER:
pantalla 1:
 - verificar inicio de sesión
 - verificar registro
*/


// ----------------------GETS---------------------------------

let id_user = -1

function getNombre() {
    return document.getElementById("nombre").value;
}
function getUsuario() {
    return document.getElementById("usuario").value;

}
function getContra() {
    return document.getElementById("contra").value;
}

function getPregunta() {
    return document.getElementById("preguntanueva").value;
}

function getPalabra1() {
    return document.getElementById("pal1").value;
}

function getPalabra1() {
    return document.getElementById("pal1").value;
}

function getPalabra2() {
    return document.getElementById("pal2").value;
}

function getPalabra3() {
    return document.getElementById("pal3").value;
}

function getPalabra4() {
    return document.getElementById("pal4").value;
}

function getPalabra5() {
    return document.getElementById("pal5").value;
}

let id_pregunta_global = 0

// LOGIN --------------------------------------------------------------------------------------

async function inicioSesion() {
    let usu = getUsuario()
    console.log(usu)

    let contra = getContra()
    console.log(contra)

    let response = await fetch('http://localhost:4000/todousuarios', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    let res = await response.json()
    let usuarioCheck = false

    if (usu == "" || contra == "") {
        alert("Todos los campos deben estar completos")
    } else {
        for (let i = 0; i < res.length; i++) {
            if (res[i].usuario == usu) {
                console.log(res[i].usuario)

                if (res[i].contraseña == contra) {
                    usuarioCheck = true
                    id_user = res[i].id_usuario
                    localStorage.setItem("id_user", id_user)
                    break
                } else {
                    break
                }
            }
        }

        if (usuarioCheck) {
            window.location.href = "menu.html";
        } else {
            alert("Usuario o contraseña incorrectas")
        }

    }
}

//  REGISTROO --------------------------------------------------------------------------------------

async function usuPost(datos) {
    const resultado = await fetch("http://localhost:4000/usuarionuevo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let res = await resultado.json()
    console.log(res)
    if (res.ok == true) {
        id_user = res.id_user
        localStorage.setItem("id_user", id_user)
        window.location.href = "menu.html";
    } else {
        alert("error en el registro")
    }
}
async function Registrarse() {
    datos = {
        usuario: getUsuario(),
        contraseña: getContra(),
        nombre: getNombre(),
        es_admin: 0
    }
    let usu = getUsuario()
    let contra = getContra()

    let response = await fetch('http://localhost:4000/todousuarios', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    let res = await response.json()
    let usuarioCheck = false

    if (usu == "" || contra == "") {
        alert("Todos los campos deben estar completos")
    } else {
        usuPost(datos)
    }
}

//  Tabla de ranking --------------------------------------------------------------------------------------
async function getRanking() {
    let fetchDatos = await fetch("http://localhost:4000/ranking")
    let resultado = await fetchDatos.json()
    let elementosTabla = `<tr>
            <th>Posicion</th>
            <th>ID</th>
            <th>Usuario del jugador</th>
            <th>Puntaje final</th>
            <th>Partida</th>
        </tr>`
    console.log(resultado)
    for (i = 0; i < resultado.length; i++) {
        elementosTabla += `<tr>
        <td>${i + 1}</td>
        <td>${resultado[i].id_usuario}</td>
        <td>${resultado[i].usuario}</td>
        <td>${resultado[i].puntaje_final}</td>
        <td>${resultado[i].id_partida}</td>
        </tr>`
    }
    document.getElementById("tablaRanking").innerHTML = elementosTabla
}

// Ya logueado --------------------------------------------------------------------------------------
async function cargarUser() {
    id_user = localStorage.getItem("id_user")
    console.log(id_user)
    //let fetchDatos = await fetch("http://localhost:4000/usuarioespecifico?id_usuario="+ id_user)
    //let resultado = await fetchDatos.json()
    //document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + resultado[0].nombre

}


async function confirmarAdmin() {
    let fetchDatos = await fetch("http://localhost:4000/confirmar?id_usuario=" + id_user)
    let resultado = await fetchDatos.json()
    let botonAdmin = `<a href="menuAdmin.html"> 
    <button type="button">MENU DEL ADMINISTRADOR</button> 
    </a>`
    if (resultado[0].es_admin == 1) {
        document.getElementById("iralmenu").innerHTML = botonAdmin
    }
}

// LOG OUT

function cerrarSesion() {
    let confirmLogOut = confirm("¿Realmente quiere cerrar sesión?")
    if (confirmLogOut) {
        console.log("usu eligió SI cerrar ses")

        id_user = -1
        window.location.href = "loginRegistro.html";
    }
}

// MODPREGUNTAS --------------------------------------------------------------------------------------

async function tablaPreguntas() {
    let fetchDatos = await fetch("http://localhost:4000/todopreguntas")
    let resultado = await fetchDatos.json()
    let elementosTabla = `<tr>
            <th>ID</th>
            <th>Pregunta</th>
        </tr>`

    for (i = 0; i < resultado.length; i++) {
        elementosTabla += `<tr>
        <td>${resultado[i].id_pregunta}</td>
        <td>${resultado[i].pregunta}</td>
        </tr>`
    }
    document.getElementById("tabla-preguntas").innerHTML = elementosTabla
}

async function selectPreguntas() {
    let fetchDatos = await fetch("http://localhost:4000/todopreguntas")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_pregunta}>
        ${resultado[i].id_pregunta}///${resultado[i].pregunta}
        </option>`
    }
    document.getElementById("select-preguntas").innerHTML = elementosSelect

}

// ------------------------------------ MODS SELECT ADMIN

async function tablaPalabras() {
    let fetchDatos = await fetch("http://localhost:4000/todopalabras")
    let resultado = await fetchDatos.json()
    let elementosTabla = `<tr>
            <th>ID</th>
            <th>Palabra</th>
            <th>Puntaje</th>
            <th>Pertenece a pregunta</th>
        </tr>`

    for (i = 0; i < resultado.length; i++) {
        elementosTabla += `<tr>
        <td>${resultado[i].id_palabra}</td>
        <td>${resultado[i].palabra}</td>
        <td>${resultado[i].puntaje}</td>
        <td>${resultado[i].id_pregunta}</td>
        
        </tr>`
    }
    document.getElementById("tabla-palabras").innerHTML = elementosTabla
}

async function selectPalabra1() {
    let fetchDatos = await fetch("http://localhost:4000/palabra1")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_palabra}>
        ${resultado[i].id_palabra}///${resultado[i].palabra}///${resultado[i].puntaje}///${resultado[i].id_pregunta}
        </option>`
    }
    document.getElementById("selectpal1").innerHTML = elementosSelect
}

async function selectPalabra2() {
    let fetchDatos = await fetch("http://localhost:4000/palabra2")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_palabra}>
        ${resultado[i].id_palabra}///${resultado[i].palabra}///${resultado[i].puntaje}///${resultado[i].id_pregunta}
        </option>`
    }
    document.getElementById("selectpal2").innerHTML = elementosSelect
}

async function selectPalabra3() {
    let fetchDatos = await fetch("http://localhost:4000/palabra3")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_palabra}>
        ${resultado[i].id_palabra}///${resultado[i].palabra}///${resultado[i].puntaje}///${resultado[i].id_pregunta}
        </option>`
    }
    document.getElementById("selectpal3").innerHTML = elementosSelect
}

async function selectPalabra4() {
    let fetchDatos = await fetch("http://localhost:4000/palabra4")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_palabra}>
        ${resultado[i].id_palabra}///${resultado[i].palabra}///${resultado[i].puntaje}///${resultado[i].id_pregunta}
        </option>`
    }
    document.getElementById("selectpal4").innerHTML = elementosSelect
}

async function selectPalabra5() {
    let fetchDatos = await fetch("http://localhost:4000/palabra5")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_palabra}>
        ${resultado[i].id_palabra}///${resultado[i].palabra}///${resultado[i].puntaje}///${resultado[i].id_pregunta}
        </option>`
    }
    document.getElementById("selectpal5").innerHTML = elementosSelect
}

// ------------------------------------

async function añadirPregunta(datos) {
    const resultado = await fetch("http://localhost:4000/preguntanueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
    if (respuesta.ok == true) {
        id_pregunta_global = respuesta.id_pregunta
        console.log(id_pregunta_global)
        await palDatos1()
        await palDatos2()
        await palDatos3()
        await palDatos4()
        await palDatos5()
        window.location.reload()
    } else {
        alert("pregunta ya existe")
    }
}

function preguntaDatos() {

    datos = {
        pregunta: getPregunta()
    }
    let getpregunta = getPregunta()
    let verpal1 = getPalabra1()
    let verpal2 = getPalabra2()
    let verpal3 = getPalabra3()
    let verpal4 = getPalabra4()
    let verpal5 = getPalabra5()
    if (getpregunta == "" || verpal1 == "" || verpal2 == "" || verpal3 == "" || verpal4 == "" || verpal5 == "") {
        alert("todos los campos deben completarse")
    } else {
        añadirPregunta(datos)
    }

}



// ------------------------------------

async function añadirPalabra1(datos) {
    const resultado = await fetch("http://localhost:4000/palabranueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function palDatos1() {
    datos = {
        palabra: getPalabra1(),
        puntaje: 5,
        id_pregunta: id_pregunta_global
    }
    console.log(datos)
    añadirPalabra1(datos)
}

async function añadirPalabra2(datos) {
    const resultado = await fetch("http://localhost:4000/palabranueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function palDatos2() {
    datos = {
        palabra: getPalabra2(),
        puntaje: 4,
        id_pregunta: id_pregunta_global
    }
    console.log(datos)
    añadirPalabra2(datos)
}

async function añadirPalabra3(datos) {
    const resultado = await fetch("http://localhost:4000/palabranueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function palDatos3() {
    datos = {
        palabra: getPalabra3(),
        puntaje: 3,
        id_pregunta: id_pregunta_global
    }
    console.log(datos)
    añadirPalabra3(datos)
}

async function añadirPalabra4(datos) {
    const resultado = await fetch("http://localhost:4000/palabranueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function palDatos4() {
    datos = {
        palabra: getPalabra4(),
        puntaje: 2,
        id_pregunta: id_pregunta_global
    }
    console.log(datos)
    añadirPalabra4(datos)
}

async function añadirPalabra5(datos) {
    const resultado = await fetch("http://localhost:4000/palabranueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function palDatos5() {
    datos = {
        palabra: getPalabra5(),
        puntaje: 1,
        id_pregunta: id_pregunta_global
    }
    console.log(datos)
    añadirPalabra5(datos)
}

async function cambiarCosas() {
    let id_pregunta = document.getElementById("select-preguntas").value
    let id_pal1 = document.getElementById("selectpal1").value
    let id_pal2 = document.getElementById("selectpal2").value
    let id_pal3 = document.getElementById("selectpal3").value
    let id_pal4 = document.getElementById("selectpal4").value
    let id_pal5 = document.getElementById("selectpal5").value

    const resultado = await fetch("http://localhost:4000/editarpregunta", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pregunta: getPregunta(),
            id_pregunta: id_pregunta
        })
    })
    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)

    const resulpal1 = await fetch("http://localhost:4000/editarpalabra", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            palabra: getPalabra1(),
            id_palabra: id_pal1
        })
    })
    console.log(resulpal1)
    let respal1 = await resulpal1.json()
    console.log(respal1)

    const resulpal2 = await fetch("http://localhost:4000/editarpalabra", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            palabra: getPalabra2(),
            id_palabra: id_pal2
        })
    })
    console.log(resulpal2)
    let respal2 = await resulpal2.json()
    console.log(respal2)

    const resulpal3 = await fetch("http://localhost:4000/editarpalabra", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            palabra: getPalabra3(),
            id_palabra: id_pal3
        })
    })
    console.log(resulpal3)
    let respal3 = await resulpal3.json()
    console.log(respal3)

    const resulpal4 = await fetch("http://localhost:4000/editarpalabra", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            palabra: getPalabra4(),
            id_palabra: id_pal4
        })
    })
    console.log(resulpal4)
    let respal4 = await resulpal4.json()
    console.log(respal4)

    const resulpal5 = await fetch("http://localhost:4000/editarpalabra", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            palabra: getPalabra5(),
            id_palabra: id_pal5
        })
    })
    console.log(resulpal5)
    let respal5 = await resulpal5.json()
    console.log(respal5)
    window.location.reload()
}

function botonCambio() {
    let getpregunta = getPregunta()
    let verpal1 = getPalabra1()
    let verpal2 = getPalabra2()
    let verpal3 = getPalabra3()
    let verpal4 = getPalabra4()
    let verpal5 = getPalabra5()
    if (getpregunta == "" || verpal1 == "" || verpal2 == "" || verpal3 == "" || verpal4 == "" || verpal5 == "") {
        alert("todos los campos deben completarse")
    } else {
        cambiarCosas()
    }
}

async function borrarPalabras() {
    let id_pregunta = document.getElementById("select-preguntas").value
    const resultado = await fetch("http://localhost:4000/borrarpalabrasdepregunta", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pregunta: id_pregunta })
    })
    console.log(resultado)
    if (resultado.ok == true) {
        return true
    }

}

async function borrarPregunta() {
    let id_pregunta = document.getElementById("select-preguntas").value
    const resultado2 = await fetch("http://localhost:4000/borrarpregunta", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pregunta: id_pregunta })
    })
    console.log(resultado2)
    if (resultado2.ok == true) {
        return true
    }
}

async function botonBorrar() {
    let palabras = await borrarPalabras()
    console.log(palabras)
    if (palabras == true) {
        let pregunta = await borrarPregunta()
        console.log(pregunta)
        if (pregunta == true) {
            window.location.reload()
        }
    }
}













// MODUSUARIOS --------------------------------------------------------------------------------------

async function tablaUsuarios() {
    let fetchDatos = await fetch("http://localhost:4000/todousuarios")
    let resultado = await fetchDatos.json()
    let elementosTabla = `<tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Nombre</th>
            <th>¿Es administrador?</th>
        </tr>`

    for (i = 0; i < resultado.length; i++) {
        elementosTabla += `<tr>
        <td>${resultado[i].id_usuario}</td>
        <td>${resultado[i].usuario}</td>
        <td>${resultado[i].contraseña}</td>
        <td>${resultado[i].nombre}</td>
        <td>${resultado[i].es_admin}</td>
        
        </tr>`
    }
    document.getElementById("tabla-usuarios").innerHTML = elementosTabla
}

async function selectUsuarios() {
    let fetchDatos = await fetch("http://localhost:4000/todousuarios")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``

    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_usuario}>
        ${resultado[i].id_usuario}///${resultado[i].usuario}///${resultado[i].contraseña}///${resultado[i].nombre}///${resultado[i].es_admin}
        </option>`
    }
    document.getElementById("select-usuarios").innerHTML = elementosSelect

}

// ------------------------------------

async function tablaPartidas() {
    let fetchDatos = await fetch("http://localhost:4000/todopartidas")
    let resultado = await fetchDatos.json()
    let elementosTabla = `<tr>
            <th>ID</th>
            <th>Puntaje final</th>
            <th>La jugó el usuario</th>
        </tr>`

    for (i = 0; i < resultado.length; i++) {
        elementosTabla += `<tr>
        <td>${resultado[i].id_partida}</td>
        <td>${resultado[i].puntaje_final}</td>
        <td>${resultado[i].id_usuario}</td>
        
        </tr>`
    }
    document.getElementById("tabla-partidas").innerHTML = elementosTabla
}

async function selectPartidas() {
    let fetchDatos = await fetch("http://localhost:4000/todopartidas")
    let resultado = await fetchDatos.json()
    let elementosSelect = ``
    for (i = 0; i < resultado.length; i++) {
        elementosSelect += `<option value=${resultado[i].id_partida}>
        ${resultado[i].id_partida}///${resultado[i].puntaje_final}///${resultado[i].id_usuario}
        </option>`
    }
    document.getElementById("select-partidas").innerHTML = elementosSelect
}

async function borrarUsuario() {
    let id_usuario = document.getElementById("select-usuarios").value
    const resultado = await fetch("http://localhost:4000/borrarusuario", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_usuario: id_usuario })
    })
    console.log(resultado)
    window.location.reload()
}

async function borrarPartida() {
    let id_partida = document.getElementById("select-partidas").value
    const resultado = await fetch("http://localhost:4000/borrarpartida", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_partida: id_partida })
    })
    console.log(resultado)
    window.location.reload()
}




async function darAdmin() {
    let id_usuario = document.getElementById("select-usuarios").value

    const resultado = await fetch("http://localhost:4000/daradmin", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_usuario: id_usuario
        })
    })
    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)

    if (respuesta.ok == true) {
        return true
    } else {
        alert("usuario ya es admin")
    }
}

async function quitarAdmin() {
    let id_usuario = document.getElementById("select-usuarios").value

    const resultado = await fetch("http://localhost:4000/quitaradmin", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_usuario: id_usuario
        })
    })
    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)

    if (respuesta.ok == true) {
        return true
    } else {
        alert("usuario no es admin")
    }
}

async function botonDar() {
    let dar = await darAdmin()
    console.log(dar)
    if (dar == true) {
        setTimeout(() => window.location.reload(), 500)
    }
}

async function botonQuitar() {
    let quit = await quitarAdmin()
    console.log(quit)
    if (quit == true) {
        console.log("anda")
        const tiempo = setTimeout(() => window.location.reload(), 500)
    }
}


















///////////////////////////// JUEGO: PARTIDA
let partidaActual = -1
let preguntaActual = 0
let listaPreguntasPartida = []



async function postPartida() {

    let datos = {
        id_usuario: id_user
    }

    const resultado = await fetch("http://localhost:4000/partidanueva", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    console.log(resultado)

    let respuesta = await resultado.json()
    console.log(respuesta)
    partidaActual = respuesta.id_partida
    console.log(partidaActual)
    let partidaString = JSON.stringify(partidaActual)
    localStorage.setItem("partida", partidaString)
    
}




function crearListaPreguntas() {

    while (listaPreguntasPartida.length < 4) {
        pregunta = Math.floor((Math.random() * 16) + 1)
        if (listaPreguntasPartida.includes(pregunta) == false) {
            listaPreguntasPartida.push(pregunta)
        }
    }

    console.log("LISTA HECHA DE PREGUNTAS RANDOM: ")
    console.log(listaPreguntasPartida)
    let listaString = JSON.stringify(listaPreguntasPartida)
    localStorage.setItem("listaPreguntasPartida", listaString)
}

async function postPreporpars() {
    for (let i = 0; i < listaPreguntasPartida.length; i++){
        
        let datos = {
            id_partida: partidaActual,
            id_pregunta: listaPreguntasPartida[i],
            puntaje_pregunta: 0
        }

        const resultado = await fetch("http://localhost:4000/preporparnueva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        console.log(resultado)

        let respuesta = await resultado.json()
        console.log(respuesta)
    }
}

async function empezarPartida() {
    postPartida()
    crearListaPreguntas()
    const tiempo = setTimeout(() => empezarPartida2(), 3000)
    document.getElementById("cargando").innerHTML = "Cargando..."
}

function empezarPartida2() {
    postPreporpars()
    setTimeout(() => window.location.href = "juego.html", 5500)
}

function cargarLista(){
    let listaString2 = localStorage.getItem("listaPreguntasPartida")
    listaPreguntasPartida = JSON.parse(listaString2)
    console.log(listaPreguntasPartida)
    console.log(listaPreguntasPartida[0])
   preguntaActual = listaPreguntasPartida[0]
}

// setTimeout(() => {alert("Se terminó el tiempo");console.log("ou nou");window.location.reload();}, 500);

function cargarPartida(){
    let partidaString2 = localStorage.getItem("partida")
    partidaActual = JSON.parse(partidaString2)
    console.log("partida actual: " + partidaActual)
}





// valores de pregunta y opciones ------------------------------
let pregunta = {
    titulo: "",
    opciones: ["", "", "", "", ""]
}

let opciones = [
    document.getElementById("p1_juego"),
    document.getElementById("p2_juego"),
    document.getElementById("p3_juego"),
    document.getElementById("p4_juego"),
    document.getElementById("p5_juego")
]

let titulo = document.getElementById("pregunta_juego")



async function getPregJuego() {
    let fetchDatos = await fetch("http://localhost:4000/preguntajuego?id_partida=" + partidaActual + "&id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.titulo = resultado.pregunta
    titulo.textContent = pregunta.titulo
    titulo.value = pregunta.titulo
    console.log("getpregjuego")
}

async function getPunt1() {
    let fetchDatos = await fetch("http://localhost:4000/palabraspreguntap1?id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.opciones[0] = resultado.res
    opciones[0].value = pregunta.opciones[0]
    opciones[0].textContent = "1"
}

async function getPunt2() {
    let fetchDatos = await fetch("http://localhost:4000/palabraspreguntap2?id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.opciones[1] = resultado.res
    opciones[1].value = pregunta.opciones[1]
    opciones[1].textContent = "2"
}

async function getPunt3() {
    let fetchDatos = await fetch("http://localhost:4000/palabraspreguntap3?id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.opciones[2] = resultado.res
    opciones[2].value = pregunta.opciones[2]
    opciones[2].textContent = "3"
}

async function getPunt4() {
    let fetchDatos = await fetch("http://localhost:4000/palabraspreguntap4?id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.opciones[3] = resultado.res
    opciones[3].value = pregunta.opciones[3]
    opciones[3].textContent = "4"
}

async function getPunt5() {
    let fetchDatos = await fetch("http://localhost:4000/palabraspreguntap5?id_pregunta=" + preguntaActual)
    let resultado = await fetchDatos.json()
    pregunta.opciones[4] = resultado.res
    opciones[4].value = pregunta.opciones[4]
    opciones[4].textContent = "5"
}


let contador = 0
let puntos = 0

function Validar() {
    let respuesta = document.getElementById("inputRespuesta").value;
    console.log(respuesta)

    for (let i = 0; i < opciones.length; i++) {
        if (respuesta == opciones[i].value) {
            if (opciones[i].textContent == opciones[i].value) {
                console.log("ya esta puesto")
            } else {
                opciones[i].textContent = opciones[i].value;
                contador ++
                puntos += i + 1
                console.log("puntos: "+ puntos)
                console.log(contador)
                if (contador == 5){
                    titulo.textContent= "ganaste esta pregunta"
                }
            }
        }
    }
}

let i = 0
let cont2 = 0

async function loopJuego(){
    do {
        await tiempo2(i)
        i++
   }
   while (i<5)
}

function tiempo2(i){
    const tiempo = setTimeout(function(){
        sig = confirm("¿Listo para la siguiente pregunta?")
        if (sig){
            contador = 0
            console.log("contador: "+ contador)
            console.log("iteracion: "+ i)
            preguntaActual = listaPreguntasPartida[i]
            console.log("preg act: " + preguntaActual)
            getPregJuego()
            getPunt1()
            getPunt2()
            getPunt3()
            getPunt4()
            getPunt5()
            cont2++
            console.log(cont2)
            if (cont2 > 4) {
                alert("no hay más preguntas")
                localStorage.setItem("puntosDePartida", puntos)
                window.location.href = "fin.html"
            } 
        }
        
    }, 100500 * i)
}



let puntos_partida = -1

function cargarPuntos(){
    puntos_partida = JSON.parse(localStorage.getItem("puntosDePartida"))
    console.log(puntos_partida)
    putPuntajePartida()
}

async function putPuntajePartida(){
    console.log(puntos_partida)
    console.log(partidaActual)
    document.getElementById("tu-puntaje").innerHTML = "Tu puntaje: " + partidaActual

    const resultado = await fetch("http://localhost:4000/asignarpuntaje", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            puntaje_final: puntos_partida,
            id_partida: partidaActual
        })
    })
    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)

    if (respuesta.ok == true) {
        return true
        
    } else {
        alert("error")
    }
}