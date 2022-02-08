const productos = document.getElementById(id = "muestra-productos");
const contenedor = document.getElementById("muestra-carrito");
const decisiones = document.getElementById(id="eventos-carrito")

productos.addEventListener('click', (e) => { comprarProducto(e) });
contenedor.addEventListener('click', (e) => {eliminar_producto(e)});
decisiones.addEventListener('click', (e) => { decision_carrito(e) });



function comprarProducto(e) {
    e.preventDefault();
    //Delegado para agregar al carrito
    if (e.target.classList.contains('btn')) {
        const producto = e.target.parentElement.parentElement;
        //Enviamos el producto seleccionado para tomar sus datos
        obtener_datos(producto);
        actualizar_precio();

    }
}

function obtener_datos(producto) {
    const ruta_img = producto.querySelector('img').src;
    //const precio = producto.querySelector('.producto h1').textContent;
    const nombre = producto.querySelector('.producto h4').textContent
    const precio = Number(producto.querySelector('span').textContent)
    const id = producto.querySelector('button').getAttribute("id");


    agregar_a_contenedor(nombre, precio, ruta_img, id);


}

function agregar_a_contenedor(name, price, image, id) {
    const id_cantidad = id + "-cantidad";
    const cantidad = 1;

    const nombres_celulares = contenedor.getElementsByClassName("producto nombre celular");

    for(let i = 0; i < nombres_celulares.length; i++){
        if(nombres_celulares[i].textContent === name){
            var new_etiqueta = document.getElementById(id_cantidad);
            new_etiqueta.innerHTML = Number(new_etiqueta.textContent) + 1;
            return
        }
    }

    const etiqueta = document.createElement('a');
    etiqueta.classList = "dropdown-item"
    etiqueta.innerHTML = `
    <a>
        <table id="lista-carrito" class="table">
            <tr>
              <td style="vertical-align: middle;"><img src=${image} width="60" height="100"></td>
              <td style="vertical-align: middle;"><div class="producto nombre celular">${name}</div></td>
              <td style="vertical-align: middle;"><h4 class="precionuevoproducto hprecio" id="${id}">${price}</h4></td>
              <td style="vertical-align: middle;"><h5 class="cantidad productocarrito">x <span class="mostrar cantidad" id=${id_cantidad}>${cantidad}</span></h5></td>
              <td style="vertical-align: middle;"><button class="btn btn-danger">X</button></td>
            </tr>
      </table>
    </a>
    `;


    contenedor.prepend(etiqueta);
    

}

function decision_carrito(e) {
    e.preventDefault();
    if (e.target.id === "btn-comprar") {
        alert("Procedimiento de pago.")
    } else if (e.target.id === "btn-limpiar") {
        vaciar_carrito();
        actualizar_precio();
    } else {
        console.log("VALIO MADRE");
    }

}

function vaciar_carrito(){
    while(contenedor.childElementCount > 2){
        contenedor.removeChild(contenedor.firstChild);
    }
}

function eliminar_producto(e){
    if(e.target.classList.contains('btn-danger')){
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        actualizar_precio();
    }

}

function actualizar_precio(){
    var total = 0;


    const objeto_carro = document.getElementsByClassName("precionuevoproducto hprecio");
    const objeto_carro_cantidad = document.getElementsByClassName("mostrar cantidad")
    
    for(var i = 0; i < objeto_carro.length; i++){
        const temporal = Number(objeto_carro[i].textContent)
        const cant_tmp = Number(objeto_carro_cantidad[i].textContent)
        
        total = total + temporal*cant_tmp;
    }
    escribir_precio(total);
    
}

function escribir_precio(precio){
    document.getElementById("idprecio-total").innerHTML = precio;
}






