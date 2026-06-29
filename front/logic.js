
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


// --------------------------------------------------------

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
function cargarUser() {
    id_user = localStorage.getItem("id_user")
    console.log(id_user)
}