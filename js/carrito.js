/*
Hay que programar un carrito de compra de fruta.

El cliente eligirá que fruta quiere haciendo click sobre la imagen.
Un mensaje emergente le preguntará qué cantidad quiere.

Esta información se mostrará a la derecha, bajo "Total carrito", 
en <p id="carrito"></p>, de esta forma:
 Kiwi 2 kg x 4,20€/kg = 8,40 €

El total se actualizará con cada compra
 Total Compra: 8,40€
 
Se dará la opción de añadir o no más productos que se mostrarán
a continuación de los anteriores, y se sumará todo en el total. 
Por ejemplo:  
 Kiwi 2 kg x 4, 20€/kg = 8, 40€
 Pomelo 1 kg x 2,50€/kg = 2,50€
 Total Compra: 10,90€

Puedes modificar el código facilitado si ello te ayuda con el ejercicio,
pero deberás justificarlo.

Recuerda la importancia comentar con detalle el código.

 Lo importante es el cálculo, no los estilos css
 */

 //SOLUCIÓN

 // Seleccionamos todos los div que se encuentran dentro de la sección con clase="productes"
 const productes= document.querySelectorAll(".productes div")

 // Creamos el nodo para el precio Total, que está envuelto en un span con id = "preuFinal"
 let preuFinal=document.querySelector("#preuFinal")

 // Creamos el nodo para el párrafo cuya clase = "carrito", y en la que se listarán una a una las frutas elegidas.
 let carrito=document.querySelector("#carrito")

 // Definimos la variable "totalAbsoluto" , que irá sumando los costos parciales con cada selección
 let totalAbsoluto=0

 // Definimos el array "listaMensajeUsuario" , inicialmente vacía,  que almacenará cada uno de los "mensajeUsuario".
 //  Esto será de utilidad cuando querramos borrar un elemento de la lista 
 let listaMensajeUsuario = []

 // Definimos el array "listaCostosParciales", inicialmente vacía, que almacenará cada uno de los costos parciales-
 // Esto será de utilidad cuando querramos borrar un elemento de la lista, y así poder actualizar el precio Total.
 let listaCostosParciales =[]

// Iteramos sobre cada uno de los div que pertenecen a la clase "productes"
// y le asignamos un evento de click
 for (let i = 0; i<productes.length; i++) {
    productes[i].addEventListener("click", () => {

        // Seleccionamos las imágenes y párrafos dentro de cada uno de los div
        let imatge= productes[i].querySelector("img")
        let precioFruta = productes[i].querySelector("p").textContent
        
        // Obtenemos el valor numérico del precio, para usarlo posteriormente en los cálculos
        precioFruta= precioFruta.split(': ')[1].trim()

        // Obtenemos la unidad de medida en la que se vende cada fruta( /kg ; /ud)
        let magnitud = precioFruta.split('€')[1]
        precioFruta= precioFruta.split('€')[0]
        
        // Obtenemos el nombre de la fruta a partir de su atributo "alt" 
        let nombreFruta = imatge.getAttribute("alt"); //Obtenemos el nombre de cada fruta
        
        // Preguntamos al usuario la cantidad (de la fruta seleccionada) que desea
        let preguntaCantidad = prompt(`¿Qué cantidad de ${nombreFruta} deseas?`)

        // Calculamos el precio a pagar por cada selección (costo parcial)
        // Usamos parseFloat porque "preguntaCantidad" y "precioFruta" son strings
        // y no necesariamente deben ser enteros (en tal caso se hubiera usado parseInt)
        let costoFruta = parseFloat(preguntaCantidad)*parseFloat(precioFruta)

        // Agregamos los costos parciales al array "listaCostosParciales"
        listaCostosParciales.push(costoFruta)

        // Sumamos los costos parciales al totalAbsoluto
        totalAbsoluto += costoFruta

        // Definimos la variable "mensajeUsuario", que contendrá  
        //  mensajes del tipo "(Fruta escogida) x kg * y €/kg = z €"
        // acompañado de la imagen de un basurero
        // que servirá para eliminar algún producto que ya no se quiera. 
        let mensajeUsuario = `<div id="mensajeFruta">

            <img  class ="basurero" src="img/basurero.png" alt="basurero"/>
            <p>${nombreFruta}:  ${preguntaCantidad} x ${precioFruta} ${magnitud} = ${costoFruta.toFixed(2)} </p>
        </div> `

        // Por cada selección, agregamos un nuevo elemento (mensajeUsuario) al array listaMensajeUsuario 
        listaMensajeUsuario.push(mensajeUsuario)  

        // Llamamos a la función que actualiza el carrito
        actualizarCarrito();

    })    
}

// Declaramos la función actualizarCarrito
function actualizarCarrito() {

        // El contenido de "carrito" es inicialmente vacío
        // En cada evento "click" el carrito se limpiará
        carrito.innerHTML = ""

        // Recorremos los elementos de la listaMensaje Usuario
        // y mostramos cada elemento en "carrito"
        for (mensajes of listaMensajeUsuario){
            carrito.innerHTML += mensajes
        }

        //Mostramos el precio final
        // .toFixed(2) para mostrar solo 2 cifras decimales
        preuFinal.innerHTML = totalAbsoluto.toFixed(2)
        
        // Selecciona todos los elementos con la clase "basurero"
        let basurero = document.querySelectorAll(".basurero")

        // Recorremos los elementos de "basurero"
        //  y les añadimos un evento "click"
        for (let i = 0; i<basurero.length;i++){
            basurero[i].addEventListener("click", () => {

                // Restamos el costo del producto eliminado del total absoluto
                totalAbsoluto -= listaCostosParciales[i] 

            
                // Eliminamos el mensaje del usuario y el costo correspondiente en los arrays.
                //splice(i,1) elimina 1 elemento de los arrays, comenzando en el índice i.
                listaMensajeUsuario.splice(i,1);
                listaCostosParciales.splice(i,1)

                // Llamamos a la función que actualiza el carrito
                actualizarCarrito()
               
    })
}
}

