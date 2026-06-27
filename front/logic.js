
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
                id_user = res[i].id_usuario

                if (res[i].contraseña == contra) {
                    usuarioCheck = true
                    break

                } else {
                    alert("Contraseña incorrecta")
                    break
                }
            } else {
                alert("Usuario incorrecto")
                break
            }
        }

        if (usuarioCheck) {
            window.location.href = "menu.html";
        }

    }
}

//  REGISTROO --------------------------------------------------------------------------------------

async function usuPost(datos) {
    const resultado = await fetch("http://localhost:4000/usernuevo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })

    console.log(resultado)
    let res = await resultado.json()
    console.log(res)
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
        for (let i = 0; i < res.length; i++) {
            if (res[i].usuario != usu) {
                console.log(res[i].usuario)
                id_user = res[i].id_usuario
                usuarioCheck = true

            } else {
                alert("Usuario ya existe")
                break
            }
        }
    }

    if (usuarioCheck) {
        usuPost(datos)
    }

    
}
