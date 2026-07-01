
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

function getNombre(){
    return document.getElementById("nombre").value;
}  
function getUsuario(){
    return document.getElementById("usuario").value;

}
function getContra(){
    return document.getElementById("contra").value;
}

function getPregunta() {
    return document.getElementById("pregunta").value;
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
        } else{
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
    if (res.ok == true){
        id_user = res.id_user
        localStorage.setItem("id_user", id_user)  
        window.location.href = "menu.html";
    } else{
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
async function getRanking(){
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
    for (i = 0; i < resultado.length; i++){
        elementosTabla += `<tr>
        <td>${i+1}</td>
        <td>${resultado[i].id_usuario}</td>
        <td>${resultado[i].usuario}</td>
        <td>${resultado[i].puntaje_final}</td>
        <td>${resultado[i].id_partida}</td>
        </tr>`
    }
    document.getElementById("tablaRanking").innerHTML = elementosTabla
}
async function cargarUser() {
    id_user = localStorage.getItem("id_user")
    console.log(id_user)
    let fetchDatos = await fetch("http://localhost:4000/usuarioespecifico?id_usuario="+ id_user)
    let resultado = await fetchDatos.json()
    document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + resultado[0].nombre
    
}


async function confirmarAdmin(){
    let fetchDatos = await fetch("http://localhost:4000/confirmar?id_usuario="+ id_user)
    let resultado = await fetchDatos.json()
    let botonAdmin = `<a href="menuAdmin.html"> 
    <button type="button">MENU DEL ADMINISTRADOR</button> 
    </a>`
    if (resultado[0].es_admin == 1) {
        document.getElementById("iralmenu").innerHTML = botonAdmin
    }
}


async function añadirPregunta(datos){
    const resultado = await fetch("http://localhost:4000/preguntanueva",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let respuesta = await resultado.json()
    console.log(respuesta)
}

function preguntaDatos(){
    datos = {pregunta: getNombre(), 
        rubro: getRubro(), 
        cant_empleados: getCant_empleados(), 
        id_pais: getId_pais()
    }
    postEj2(datos)
}