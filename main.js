const carrito = [];

const menorMayor = () => {
    productos.sort((a,b)=> a.precio - b.precio);
    listaOrdenada();
}

const listaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' - $'+producto.precio
    });
    alert('Bienvenido!\n\nLista de precios:\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}

const comprarProductos = (listaProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt ('¿Que producto quiere comprar?'+'\n\n'+listaProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos quiere comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto ingresado es incorrecto.')
        }

        otroProducto = confirm('Quiere agregar otro producto?');
    } while (otroProducto)

    confirmarCompra()
};

const agregarCarrito = (producto, productoId, productoCantidad) => {
    const repetido = carrito.find(producto => producto.id === productoId)
    if (!repetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        repetido.cantidad += productoCantidad;
    }
    console.log(carrito)
}

const eliminarProducto = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad+' | $'+producto.cantidad * producto.precio
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nPresione "Aceptar" para continuar o "Cancelar" para eliminar un producto.'
    )

    if (confirmar) {
        calcularEnvio(listaCarrito)
    } else {
        const productoEliminar = prompt(listaCarrito.join('\n')+'\n\nIngrese el producto que quiere eliminar:')
        eliminarProducto(productoEliminar)
    }
};

const calcularEnvio = (listaCarrito) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    let precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    let envio = 0
    const conEnvio = confirm('¿Quiere envío a domicilio?\n\nCon su compra mayor a $20000 es gratis')

    if (conEnvio && precioTotal >= 200000) {
        alert('Tiene envío gratis.')
    } else {
        envio = 2000
        precioTotal += 2000
        alert('El envío cuesta $2000.')
    }

    alert('Detalle de su compra:'
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEnvio: $'+envio
        +'\n\nEl total a pagar de su compra es: $'+precioTotal
        +'\n\nGracias por su compra!'
    )
};

menorMayor()