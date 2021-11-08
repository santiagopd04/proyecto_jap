//Inicio un array vacio para cargar el carrito al hacer el fetch, 
//y por defecto el porcentaje del envio express que es el que estará marcado al inicio
let productosCarrito = [];
let cantidadSeleccionada = 0;
let precioUnitario = 0;
let porcentajeEnvio = 0.05;
let subtotalCarrito = 0;
let costoEnvio = 0;
let totalOrden = 0;


//Funcion que obtiene el carrito
function obtenerCarrito() {
    fetch(CART_INFO_URL)
        .then(data => data.json())
        .then(details => {
            productosCarrito.push(details.articles[0]);
            cantidadSeleccionada = details.articles[0].count
            mostrarCarrito();
            actualizarPrecios ()
            console.log(cantidadSeleccionada)
        })}


//Función que actualiza los valores en el HTML
function actualizarPrecios() {
    let subtotalInicial = document.getElementById("subtotal");
    let envioInicial = document.getElementById("gastoenvio");
    let totalInicial = document.getElementById("totalorden");
    
    let subtotalNew = cantidadSeleccionada * precioUnitario;
    let envioNew = Math.round(subtotalNew * porcentajeEnvio)
    let totalNew = subtotalNew + envioNew;

    subtotalInicial.innerHTML = subtotalNew;
    envioInicial.innerHTML = envioNew;
    totalInicial.innerHTML = totalNew;

}


//Funcion que muestra el carrito en el HTML
var mostrarCarrito = () => {
    let htmlContentToAppend = "";
    for (let i = 0; i < productosCarrito.length; i++){
        let producto = productosCarrito[i];
        cantidadSeleccionada = producto.count;
        precioUnitario = producto.unitCost;
        subtotalCarrito = (producto.count * producto.unitCost);
        htmlContentToAppend +=
        `<div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-2 d-flex align-items-center">
            <i><img src="`+ producto.src+`" height="150"></i>
            </div>
            <div class="col-6">
                    <h6 class="font-weight-bold margin-score">Producto: `+ producto.name +` </h6>
                    <p>Precio unitario: `+ producto.currency +` <span id="precioUnidad">` + producto.unitCost + `</span></p>
            </div>
            <div class="col-1"><p>Cantidad:
            <input type="number" class="form-control" id="cantidad" placeholder="" required="" value="`+ cantidadSeleccionada +`" min="0"></p>
            </div>
            <div class="col-2"><h6 class="font-weight-bold margin-score">Subtotal: UYU <span id=subtotal>`+subtotalCarrito+`</span>
        </div>
    </div>`

    document.getElementById("detalleCarrito").innerHTML = htmlContentToAppend;
    
    document.getElementById("cantidad").addEventListener('change', function(){
      cantidadSeleccionada = this.value;
      console.log(cantidadSeleccionada)
      actualizarPrecios()
    })
    }
}

obtenerCarrito()
//HASTA ACA OBTENGO EL CARRITO Y LO MUESTRO

//AHORA TENGO QUE ACTUALIZAR LA INFO CUANDO MODIFICO LA CANTIDAD
