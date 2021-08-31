document.addEventListener("DOMContentLoaded", function (e) {
    
    fetch(PRODUCTS_URL)
        .then(data => data.json())
        .then(products => {
            for(let i = 0; i < products.length; i++){
                let productInfo = products[i];
                document.getElementById("products-list").innerHTML += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + productInfo.imgSrc + `" alt="`+ productInfo.description +   `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ productInfo.name +`</h4>
                                <small class="text-muted">` + productInfo.currency +` `+ productInfo.cost + `</small>
                                
                            </div>
                            <p class="mb-1">` + productInfo.description + `</p>
                            <small class="text-muted">Vendidos:` + productInfo.soldCount + `</small>
                        </div>
                    </div>
                </a>`
            }
        });
});