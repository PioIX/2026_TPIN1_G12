//     esta es mi parte :P LINO

/* // INFO PARA Botones Cambiar de página
// Seleccionamos el botón por su ID
const boton = document.getElementById("miBoton");

// Escuchamos el evento 'click'
boton.addEventListener("click", function() {
    // Cambiamos el archivo al que queremos redirigir
    window.location.href = "pagina2.html";
});
*/


// FUNCIONES A HACER:
/*

pantalla 1:
 - verificar inicio de sesión
 - o verificar registro


*/



// --------------------------------------------------------

let id_user = -1

// LOGIN --------------------------------------------------------------------------------------
function login(username, password) {
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            if (password == users[i].password) {
                console.log("login, ta bien")
                id_user = users[i].id
                return users[i].id
            } else {
                console.log("login, contraseña mal")
                return 0
            }
        }
    }
    console.log("login, todo mal")
    return -1
}


// se supone que tiene que checar si ya existe el usuario
async function llamadoAlGet(datos) {
    const response = await fetch('http://localhost:4000/usuario',{
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })
    let res = await response.json(datos)

    // no sé 

    for (let usuario of res) {
        if (usuario == Usuarios.res) {
            if (contraseña == Usuarios) {
                console.log("login, ta bien")
                id_user = users[i].id
                return users[i].id
            } else {
                console.log("login, contraseña mal")
                return 0
            }
        }
    }
    console.log("login, todo mal")
    return -1
}
//se supone q lee el username ingresado, y luego va al llamadoAlGet()
function tomarDatos(){
    const datos={usuario:getUsuario()}
    console.log(datos)
    llamadoAlGet(datos)
}


















// HAMDLELOGIN -------------------------------------------
function handleLogin() {
    let username = ui.getEusername();
    let password = ui.getPassword();

    console.log("ingreso al handlelogin")
    console.log(username)
    console.log(password)

    let res = login(username, password);

    console.log("0 = contra, -1= td, <0 = id usu")
    console.log(res)


    if (username == "" || password == "") {
        console.log("holaa")
        ui.showModal("Error", "Debe completar ambos campos")
        return
    }

    if (res == 0) {
        ui.showModal("Error", "Contraseña incorrecta")
        return
    }

    if (res > 0) {
        showNotes(res)
        ui.setUser(users[res - 1].name)
        return
    }

    ui.showModal("Error", "Usuario no encontrado")
    return
}