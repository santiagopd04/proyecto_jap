//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    document.getElementById(id="loginbtn").addEventListener("click", function(e){
        let mail = document.getElementById("inputEmail").value;
        let fin = mail.indexOf("@");
        let usuario = mail.substring(0, fin);
        localStorage.setItem("Usuario", usuario);

    })
});

