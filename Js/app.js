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

const pintarCards = data =>{
    data.forEach(producto => {
        allContainerCart.querySelector('div img').src,
        allContainerCart.querySelector('.title').textContent,
        allContainerCart.querySelector('div p span').textContent,
        allContainerCart.querySelector('a').getAttribute('data-id')

        const clone = allContainerCart.cloneNode(true)
        fragment.appendChild(clone)
    })
    containerBuyCart.appendChild(fragment)
}
