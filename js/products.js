//Defino e inicializo array vacío: primero le voy a cargar los datos desde el fetch. 
// defino e inicializo variables de las condiciones. las de orden, las inicializo con nombre. 
//Las de filtro con valor a considerar inicialmente.
var arrayProductos = []
var precioAsc = "$>"
var precioDes= "$<"
var vendidosDes = "Cant. <"
var precioMin = undefined
var precioMax = undefined



//Defino una funcion async que ejectura el fetch, espera su respuesta, captura la respuesta y lo pushea a arrayProductos
// IDEA espere tambien filtrado, y luego invoque el mostrar productos
var obtenerProductos = () => {
    fetch(PRODUCTS_URL)
        .then(data => data.json())
        .then(products => {
         for(let i = 0; i < products.length; i++){
            let productInfo = products[i];
            arrayProductos.push(productInfo);
            mostrarProductos(arrayProductos)
        }});
}



//Declaro funcion que agrega productos al HTML.
// Debe esperar a que obtenerproductos (que es async porque tiene un fetch) termine su ejecucion. (La invoco dentro del fetch?)
// El filtrado debe comenzar en opcion ALL, para que de entrada muestre todos los productos, como vienen. Aca puedo agregar el filtrado
// precioMin y precioMax tiene que actualizarse al hacer clic en el boton filtrar.
function mostrarProductos (array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
    let productInfo  = array[i];
    htmlContentToAppend += `
    <div class="col-md-6">
    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
      <img class="bd-placeholder-img card-img-top"  src="` + productInfo.imgSrc + `" alt="`+ productInfo.description +   `" >
      <h3 class="m-3">`+ productInfo.name +`</h3>
      <small class="m-3">` + productInfo.currency +` `+ productInfo.cost + `</small>
      <small class="m-3">Vendidos:` + productInfo.soldCount + `</small>
      <div class="card-body">
        <p class="card-text">` + productInfo.description + `</p>
      </div>
    </a>
  </div>`
  
   document.getElementById("products-list").innerHTML = htmlContentToAppend; 
    }    
}


//Declaro funcion que aplica filtro y devuelve resultado en nuevo array
function filtrar(precioMin, precioMax){
    precioMin = document.getElementById("precioMin").value;
    precioMax = document.getElementById("precioMax").value;
    let a = arrayProductos.filter((producto => {
        return (producto.cost >= precioMin & producto.cost <= precioMax);}))
        return a
}

//declaro funcion que ordena arrayProductos segun funcion de cada uno de los botones
//la funcion devuelve el array ordenado. tengo que actualizar productosArray = llamarfuncion
function ordenarProductos(criterio, array){
    let result = [];
    if (criterio === precioAsc)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === precioDes){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === vendidosDes){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result
}


//Defino función que cargue todo al cargar DOM y aplique el órden al hacer clic en los botones
// Las de filtro las defino aparte, ya que hay que manipular el array primero, y luego mostrar
document.addEventListener("DOMContentLoaded", function(e){  
//Defino accion de los botones para ordenar    
    document.getElementById("precioAsc").addEventListener("click", function(){
        arrayProductos = ordenarProductos(precioAsc, arrayProductos);
        mostrarProductos(arrayProductos)
    });

    document.getElementById("precioDes").addEventListener("click", function(){
        arrayProductos = ordenarProductos(precioDes, arrayProductos);
        mostrarProductos(arrayProductos);
    });

    document.getElementById("vendidosDes").addEventListener("click", function(){
        arrayProductos = ordenarProductos(vendidosDes, arrayProductos);
        mostrarProductos(arrayProductos);
    });

//Defino accion de botones de filtrado.
//Llamo funcion mostrar y le paso como parametro funcion filtrar (que devuelve nuevo array filtrado)
    document.getElementById("aplicarFiltro").addEventListener("click", function(){  
        mostrarProductos(filtrar(precioMin, precioMax));
    })

//Boton limpiar filtro, borra datos de los inbox y reinicia el precioMin y precioMax.
    document.getElementById("limpiarFiltro").addEventListener("click", function(){
        document.getElementById("precioMin").value = "";
        document.getElementById("precioMax").value = "";
        precioMin = undefined
        precioMax = undefined
        mostrarProductos(arrayProductos);
    })
});

obtenerProductos()
