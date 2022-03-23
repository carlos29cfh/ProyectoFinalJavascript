//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let CantidadProduct = document.querySelector('.count-product');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//Evento Listeners
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);//Evento agregar producto

    containerBuyCart.addEventListener('click', deleteProduct);//Evento borrar producto

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);//Evento vaciar carrito
}

//funciones agregar productos al carrito
function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }

//Se agrego una alerta "Producto agregado al carrito"
    const Toast = Swal.mixin({
        toast: true,
        background: 'yellow',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito'
      })
}

//funciones quitar productos carrito (boton X, productos individuales)
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.Cantidad);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        countProduct--;
        if (countProduct === 0) {   //si no hay productos en el carrito se limpia el precio total y el total de productos
            document.querySelector('.price-total').innerHTML = 0;//borra precio total
            document.querySelector('.count-product').innerHTML = 0;//restable contador de prodcutos
        }
    }
    loadHtml();
}


// borra el carrito del DOM y la lógica
const cleanCart = () => {
    document.querySelector('.price-total').innerHTML = 0; //se limpia el precio total del carrito al confirmar en el DOM
    document.querySelector('.count-product').innerHTML = 0; //se limpia el total de producto en el carrito al confirmar en el DOM
    buyThings = []; //se limpia el array de productos al confirmar en la lógica
    totalCard = 0; //se limpia el precio total del carrito al confirmar en la lógica
    countProduct = 0; //se limpie el total de productos en el carrito en la lógica
}
//Vaciar Carrito
function vaciarCarrito(){
    while(containerBuyCart.firstChild){
        containerBuyCart.removeChild(containerBuyCart.firstChild);

//Se agrego una alerta "Si desea vaciar el carrito".
        Swal.fire({
            title: 'Vaciar Carrito',
            text: "¿Estás seguro/a de que querés vaciar el carrito de compras?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                cleanCart();//Limpiar carrito
              Swal.fire(
                'Borrado!',
                'Tu carrito se encuentra vacío.',
                'success'
              )
            }
          })
    }
    return false;
}

//Funcion para mostrar informacion del producto + funcion añadir/concatenar producto al carrito + contador productos distintos
function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        Cantidad: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.Cantidad++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

//Funcion para crear productos
function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, Cantidad, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${Cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        CantidadProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
}

