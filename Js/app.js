
let listaDeProductos = []

fetch('data.json')
.then((resp) => resp.json())
.then((data) => listaDeProductos = data)

function mostrarProductos(){
    console.log(listaDeProductos)
    let productos = document.querySelector('.products')

        productos.innerHTML = ''
    for (const producto of listaDeProductos) {

        const {image, price, title} = producto;

        let contenedor = document.createElement("div");
        
        contenedor.innerHTML = `<div class="carts">
                                <div><img src=${image}/>
                                <p><span>${price}</span>$</p></div>
                                <p class="title">${title}</p>
                                <a href="" class="btn-add-cart" data-id="2">add to cart</a>
                                </div>`
    
        catalogo.appendChild(contenedor);
    }
}