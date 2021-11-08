//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("guardar").addEventListener("click", function(e){


        let name = document.getElementById("nombre").value;
        let age = document.getElementById("edad").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("contacto").value;
        let user = {
            name: name,
            age: age,
            email: email,
            contacto: phone
        }
       
        let datosuser = JSON.stringify(user);
        localStorage.setItem("datosusuario", datosuser);
        window.location.href = "my-profile.html";


    }); 

    let usuarioguardado = JSON.parse(localStorage.getItem("datosusuario"));
  
    document.getElementById("nombre").value = usuarioguardado.name;
    document.getElementById("edad").value = usuarioguardado.age;
    document.getElementById("email").value = usuarioguardado.email;
    document.getElementById("contacto").value = usuarioguardado.contacto;
})
