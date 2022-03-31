/*const allContainerCart = document.querySelector('.products');*/
/*const containerBuyCart = document.querySelector('.card-items');*/
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch('data.json')
        const data = await res.json()
        pintarCards(data)
    } catch (error){
       /* console.log(error)*/
    }
}

let containerProducto = document.getElementsByClassName("products")

const pintarCards = data =>{
    data.forEach(producto => {
        containerProducto.innerHTML = `<div>
                                    <img src="./image/Producto-1.jpeg" alt="">
                                    <p><span>3000</span>$</p>
                                    </div>
                                    <p class="title">Placer Fundido</p>
                                    <a href="" data-id="1" class="btn-add-cart">add to cart</a>
                                    </div>`



const clone = allContainerCart.cloneNode(true)

fragment.appendChild(clone)
})
containerBuyCart.appendChild(fragment)
}
