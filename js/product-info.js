//Defino array vacio de comentarios. Primero agrego los comentarios con el fecth.
//Luego creo funcion que haga push del comentario nuevo a al array
let comentarios = []
let fechaActual = new Date();

//Defino funcion que hace el fetch del producto e inserta el contenido.
//En el caso de las imagenes, itero con un for para agregar al carrousel que obtuve de bootstrap.
/* Dado que el carrousel requiere que la primer imagen tenga una clase distinta,  
pongo una condicion para el primer valor del array y luego un continue para que siga la ejecucion*/
var obtenerDetalle = () => {
    fetch(PRODUCT_INFO_URL)
        .then(data => data.json())
        .then(details => {
            document.getElementById("tituloProducto").innerHTML = details.name;
            document.getElementById("precioProducto").innerHTML += details.currency + `  ` + details.cost;
            document.getElementById("descripcion").innerHTML = details.description;
            document.getElementById("categoria").innerHTML = details.category;
            document.getElementById("cantidadVendidos").innerHTML = details.soldCount;
            document.getElementById("tituloProducto").innerHTML = details.name;
            let img = details.images;
            let htmlContentToAppend = "";
            for (let i = 0; i < img.length; i++){
                let imgSrc = img[i];
                if (i === 0){
                    htmlContentToAppend += `
                    <div class="carousel-item active">
                              <img class="d-block w-100" src=`+imgSrc+`>
                    </div>`
                    continue;
                }
                htmlContentToAppend += `
                <div class="carousel-item">
                          <img class="d-block w-100" src=`+imgSrc+`>
                </div>`
                document.getElementById("galeria").innerHTML = htmlContentToAppend;
            }
            obtenerComentarios()
        })
    }

obtenerDetalle()

//Funcion que hace el fetch para obtener el json con los comentarios
//Llamo a la funcion que muestra los comentarios para agregarlos al html
function obtenerComentarios(){
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(data => data.json())
    .then(result => {
        for(let i = 0; i < result.length; i++){
            let resultcomments = result[i];
            comentarios.push(resultcomments);
            mostrarComentarios()
        }
    })
}


//Funcion que agrega los comentarios al HTML
function mostrarComentarios(){
            let htmlContentToAppend = "";
            for (let i = 0; i < comentarios.length; i++){
                let comentario = comentarios[i];
                htmlContentToAppend +=`<div class="list-group-item list-group-item-action">
				<div class="row">
					<div class="col-1 d-flex align-items-center">
                    <i class="fas fa-user-circle iconoComentario"></i>
					</div>
					<div class="col">
						<div class="d-flex w-100 justify-content-between">
							<div class="mb-1">
								<h6 class="font-weight-bold margin-score">`+ comentario.user + puntuacion(parseInt(comentario.score)) +` </h6>
								<p>` + comentario.description + `</p>
							</div>
							<small class="text-muted">` + comentario.dateTime + `</small>
						</div>
					</div>
				</div>
        	</div>`
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;
            }
        }

//Declaro funcion que toma el valor de score. y pinta las estrellas menores a la puntuacion.
//El resto de las estrellas, las deja en gris.
//En el style.css defini las clases star-fill y star-unfill
function puntuacion(score){
        let puntos = "";
        for (var i = 0; i < score; i++) {
            puntos += `
                <span class="star-fill">★</span>`;
        }
        for (var x = score; x < 5; x++) {
            puntos += `
            <span class="star-unfill" >★</span>`;
        }
        return puntos;
}
//Defino funcion que toma los datos del text area y el radio con el nuevo comentario.
//Tomar el usuario del local storage y la fecha actual
//Agrega el comentario al array con los demas comentarios y vuelve a llamar la funcion mostrarcomentarios
function nuevoComentario(){
    let comentarioParaAgregar = document.getElementById("nuevoComentario").value;
	let nuevaPuntuacion = document.getElementsByName("puntos");
	let usuarioComentario = localStorage.getItem('Usuario');
	let nuevoComentario = {
		"description": comentarioParaAgregar,
		"user": usuarioComentario,
		"dateTime": fechaActual
	};
	for (let value of nuevaPuntuacion) {
		if (value.checked) {
			nuevoComentario.score = value.value;
		}
	}
	comentarios.push(nuevoComentario);
	mostrarComentarios();
}
//Defino accion del boton enviar comentario. El mismo ejecuta nuevocomentario
//Muestro un alerta agradeciendo al usuario por su comentario
//Se reinicia el valor de los campos
//Atencion! No pude hacer que reinicie las estrellitas a cero.
document.getElementById(id="enviarComentario").addEventListener("click", function(e){
    nuevoComentario();
    alert(`Gracias ` + localStorage.getItem('Usuario')+ ` por dejarnos tu comentario!`);
    document.getElementById("nuevoComentario").value = "";
})

document.addEventListener("DOMContentLoaded", function(e){


obtenerProductos()


})