
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
 - o verificar registro

*/


// --------------------------------------------------------

let id_user = -1

// LOGIN --------------------------------------------------------------------------------------

//tengo q comprobar si el usuario y su contraseña están bien, y devolver el id_user x las dudas, y si anda mal, alert
// usar app.get de todos los usuarios para comparar uno a uno

// se supone que tiene que checar si ya existe el usuario
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
            window.location.href = "pantalla0.html";
        } else {
            alert("Usuario o contraseña incorrectos")
        }

    }
}

//  REGISTROO --------------------------------------------------------------------------------------

//usar app.post de usernuevo
// dudas sobre cómo incluir si es admin o no

async function Registrarse() {
    let usu = document.getElementById("usuario").value;
    console.log(usu)

    let contra = document.getElementById("contra").value;
    console.log(contra)

    let nom = document.getElementById("nombre").value;
    console.log(nom)

    let response = await fetch('http://localhost:4000/todousuarios', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    let res = await response.json()
    let usuExiste = false


    if (usu == "" || contra == "" || nom == "") {
        alert("Todos los campos deben estar completos")
    } else {
        for (let i = 0; i < res.length; i++) {
            if (res[i].usuario == usu) {
                console.log("usuario existe")
                console.log(res[i].usuario)
                usuExiste = true
            }
        }

        if (usuExiste) {
            alert("Este nombre de usuario ya existe, intente con otro")
        } else {

            // no recuerdo como mandarle los datos al post :P
            // supuestamente puede ser así:
            /*
            let data = {

                nombre_completo: nombre,
                usuario: usuario,
                contraseña: contra,

            }

            await fetch(
                "http://localhost:4000/usernuevo",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)

                }
            )
            */

            window.location.href = "pantalla0.html";
        }
    }


}













