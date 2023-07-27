const urlLocal = './storage.json';
fetch(urlLocal)
.then(res => res.json())
.then(data => renderizar(data))


function tiendaState () {
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
  Swal.fire({
    title: 'Compra finalizada!',
    text: 'Gracias por elegirnos!',
    icon: 'success',
    showConfirmButton: false,
    timer: 3000
  })
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
  Toastify({

    text: "Producto agregado correctamente",
    style: {
      background: "black"
    },
    duration: 3000
    
    }).showToast();
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



 

  
  
 