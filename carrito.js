const productos = "productos.json";

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//generado de tarjetas de productos

const generarCards = () => {
    fetch(productos)
        .then(res => res.json())
        .then(datos => {
            datos.forEach((producto) => {
                const cards = document.createElement("div");
                let { id, nombre, precio, descripcion, img, cantidad } = producto
                cards.innerHTML = `<div class="cards">
    <img src="${img}" alt="${nombre}">
    <h2>${nombre}</h2>
    <p class="precio">$${precio}</p>
    <button class="btn" id="boton${id}">Comprar</button>
    </div>`
                const productoContainer = document.getElementById("productContainer");
                productoContainer.appendChild(cards);

                //añadir al carrito
                const btn = document.getElementById(`boton${id}`);
                btn.addEventListener("click", () => {
                    const buscarPr = carrito.some((prRepetido) => prRepetido.id === producto.id);

                    buscarPr === true ? carrito.map((prod) => {
                        if (prod.id === producto.id) {
                            prod.cantidad++;
                        }
                    }) : carrito.push({ id, img, nombre, precio, cantidad });
                    console.log(carrito);

                    //Toastify
                    Toastify({
                        text: "Producto agregado",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        destination: "https://www.google.com",
                        style: { background: "linear-gradient(to right,#9925be, #be2596)" },
                    }).showToast();

                    //LocalStorage
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                });
            });
        })

};


generarCards();

//generado de productos en carrito
const generarCarrito = () => {
    //titulo y total del carrito
    const total = carrito.reduce((a, e) => a + e.precio * e.cantidad, 0);
    const totalContainer = document.createElement("div");
    totalContainer.innerHTML = `<div class="totalContainer">
    <div class="misP"><p>Mis productos</p></div>
    <div><p>Total: $${total}</p></div>
    <div class="btn" id="vaciar"><p>Vaciar Carrito</p></div>
    <div class="btn" id="comprarCarrito"><p>Realizar compra</p></div>
    </div>`

    //productos agregados al carrito
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = "";
    carritoContainer.appendChild(totalContainer);
    carrito.forEach((item) => {
        const cardCarrito = document.createElement("div");
        let { id, nombre, precio, img, cantidad } = item
        cardCarrito.innerHTML = `<div class="cardsCarrito">
        <div><img src="${img}" alt="${nombre}"></div>
        <div class="info"><h2>${nombre}</h2>
        <p class="precio">$${precio}</p>
        <p class="cantidad">Unidades: ${cantidad}</p></div>
        <div class="eliminar" id="eliminar${id}"><img src="./img/eliminar.png" alt="Eliminar producto"></div>
        </div>`
        carritoContainer.appendChild(cardCarrito);

        //eliminar producto
        const eliminar = document.getElementById(`eliminar${id}`);
        eliminar.addEventListener("click", () => {
            eliminarProducto(item);
        });

        //vaciar carrito
        const vaciar = document.getElementById("vaciar");
        vaciar.addEventListener("click", () => {
            vaciarCarrito();
        });

        //comprar carrito
        //Sweet Alert
        const realizarCompra = document.getElementById("comprarCarrito");
        realizarCompra.addEventListener("click", () => {
            Swal.fire({
                title: "Compra realizada. Gracias por confiar en nosotros <3",
                icon: "success",
                confirmButtonColor: "#F22E58",
            });
            vaciarCarrito();
        });


    });
}

//funciones


//ver carrito
const verCarrito = document.getElementById("carritoIco");
carritoIco.addEventListener("click", () => {
    generarCarrito();
});

//eliminar producto 
const eliminarProducto = (item) => {

    for (let c = 0; c < carrito.length; c++) {
        (carrito[c] === item) &&
            carrito.splice(c, 1)
    }
    console.log(carrito)
    generarCarrito();

    //Toastify
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        gravity: "top",
        position: "right",
        destination: "https://www.google.com",
        style: { background: "linear-gradient(to right,#9925be, #be2596)" },
    }).showToast();

    //LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//vaciar carrito
const vaciarCarrito = () => {
    carrito = [];
    generarCarrito();

    //localStorage
    localStorage.clear();
}



