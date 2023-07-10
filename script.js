function tiendaState () {
  let productos = [
    { id: 2, nombre: "Remera Contrastes negra", categoria: "remeras", stock: 2, precio: 7200, rutaImagen: "RemeraContrastesNegra.webp" },
    { id: 3, nombre: "Remera Contraste Blanco", categoria: "remeras", stock: 5, precio: 7200, rutaImagen: "RemeraContrastesBlanca.webp" },
    { id: 5, nombre: "Jean Artista", categoria: "pantalones", stock: 7, precio: 18000, rutaImagen: "JeanArtista.webp" },
    { id: 7, nombre: "Jean Womans Heart", categoria: "pantalones", stock: 4, precio: 17000, rutaImagen: "JeanWomensHeart.webp" },
    { id: 9, nombre: "Falda Patchwork", categoria: "pantalones", stock: 1, precio: 16500, rutaImagen: "FaldaPatchwork.webp" },
    { id: 12, nombre: "Remera Manifiesto", categoria: "remeras", stock: 3, precio: 8900, rutaImagen: "RemeraManifiesto.webp" },
    { id: 15, nombre: "Totebag Corazon", categoria: "bolsos", stock: 8, precio: 2900, rutaImagen: "TotebagCorazon.webp" },
    { id: 17, nombre: "Hoodie Porteño Azul", categoria: "hoodies", stock: 7, precio: 20000, rutaImagen: "HoodiePorteñoAzul.webp" },
    { id: 19, nombre: "Hoodie Porteño Celeste", categoria: "hoodies", stock: 3, precio: 20000, rutaImagen: "HoodiePorteñoCeleste.webp" },
  ]

 
  
  let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
  let carrito = carritoJSON ? carritoJSON : []

  let contenedor = document.getElementById("productos")
  renderizar(productos, contenedor, carrito)
  renderizarCarrito(carrito)

  let botonFinalizarCompra = document.getElementById("finalizarCompra")
  botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))

  let buscador = document.getElementById("buscador")
  buscador.addEventListener("input", () => filtrar(productos, contenedor))


}

tiendaState ()


function filtrar(elementos, contenedor) {
  let arrayFiltrado = elementos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value) || producto.categoria.includes(buscador.value))
  renderizar(arrayFiltrado, contenedor)
}


function finalizarCompra(carrito) {
  let carritoFisico = document.getElementById("carrito")
  carritoFisico.innerHTML = ""
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito([])
}
  

function renderizar(arrayDeElementos, contenedor, carrito) {

  contenedor.innerHTML = ""

  arrayDeElementos.forEach(({ nombre, rutaImagen, stock, id }) => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.classList.add("tarjetaProducto")
    tarjetaProducto.innerHTML = `
      <h2>${nombre}</h2>
      <img class="imagen" src=./IMG/${rutaImagen}>
      <p>Quedan ${stock} unidades</p>
      <button id=${id}>Agregar al carrito</button>
    `
    contenedor.appendChild(tarjetaProducto)
    let botonAgregarAlCarrito = document.getElementById(id)
    botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(arrayDeElementos, id, carrito))
  })
}

function agregarAlCarrito(arrayDeElementos, id, carrito) {
  let productoBuscado = arrayDeElementos.find(producto => producto.id === id)
  let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === id)

  if (posicionProductoEnCarrito !== -1) {
    carrito[posicionProductoEnCarrito].unidades++
    carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].unidades * carrito[posicionProductoEnCarrito].precioUnitario
  } else {
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      precioUnitario: productoBuscado.precio,
      unidades: 1,
      imagen: productoBuscado.rutaImagen,
      subtotal: productoBuscado.precio
    })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  renderizarCarrito(carrito)
}

function renderizarCarrito(carritoJSON) {
  let carritoFisico = document.getElementById("carrito")
  carritoFisico.innerHTML = `
    <div id=encabezadoCarrito>
      <p>Carrito</p>
    </div>
  `

  carritoJSON.forEach(({ nombre, precioUnitario, unidades, imagen, subtotal }) => {
    let elementoDelCarrito = document.createElement("div")
    elementoDelCarrito.classList.add("elementoDelCarrito")
    elementoDelCarrito.innerHTML = `
      <h2 class:"nombre">${nombre}</h2>
      <img class:"imagen" src=./IMG/${imagen}>
      <p>$${precioUnitario}</p>
      <p>${unidades}</p>
      <p>$${subtotal}</p>
      
    `
    carritoFisico.appendChild(elementoDelCarrito)
  })
}

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)

function mostrarOcultar() {
  let padreContenedor = document.getElementById("productos")
  let carrito = document.getElementById("contenedorCarrito")
  padreContenedor.classList.toggle("oculto")
  carrito.classList.toggle("oculto")
}


 

  
  
 