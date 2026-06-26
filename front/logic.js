
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

// LOGIN --------------------------------------------------------------------------------------

async function inicioSesion() {
    let usu = document.getElementById("usuario").value;
    console.log(usu)

    let contra = document.getElementById("contra").value;
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
                console.log("usuario encontrado :DD")
                console.log(res[i].usuario)
                id_user = res[i].id_usuario

                if (res[i].contraseña == contra) {
                    console.log("contra del usu está bien :D")
                    usuarioCheck = true
                    break

                } else {
                    console.log("contraseña incorrecta")
                    break
                }
            }
        }

        if (usuarioCheck) {
            window.location.href = "menu.html";
        } else {
            alert("Usuario o contraseña incorrectos")
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

function Registrarse() {
    datos = {
        usu: getUsuario(),
        contra: getContra(),
        nom: getNombre(),
        es_admin: 0
    }

    let usuExiste = false

    if (datos.usu == "" || datos.contra == "" || datos.nom == "") {
        alert("Todos los campos deben estar completos")
        return
    } else {
        for (let i = 0; i < res.length; i++) {
            if (res[i].usuario == datos.usu) {
                console.log("usuario existe")
                console.log(res[i].usuario)
                usuExiste = true
            }
        }

        if (usuExiste) {
            alert("Este nombre de usuario ya existe, intente con otro")
        } else {
            await usuPost(datos)
            window.location.href = "menu.html";
        }
    }
}









