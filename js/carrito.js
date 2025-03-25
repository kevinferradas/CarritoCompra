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

 // Creamos el nodo para el párrafo cuya clase es "carrito", y en la que se listarán una a una las frutas elegidas.
 let carrito=document.querySelector("#carrito")

 // Definimos la variable "totalAbsoluto" , que irá sumando los costos parciales con cada selección
 let totalAbsoluto=0

 // Definimos el array "listaMensajeUsuario" , inicialmente vacía,  que almacenará cada uno de los "mensajeUsuario".
 //  Esto será de utilidad cuando querramo eliminar alguna selección. 
 let listaMensajeUsuario = []

 // Definimos el array "listaCostosParciales", inicialmente vacía, que almacenará cada uno de los costos parciales-
 // Esto será de utilidad cuando querramos eliminar alguna selección, y así poder actualizar el precio Total.
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
        
        // Declaramos la variable preguntaCantidad
        let preguntaCantidad= ""

        // Validación de la cantidad insertada por el cliente
        // Se muestra un mensaje de alerta,si :
        // -- el usuario no insertada nada ( null)
        // -- el usuario ingresa un o varios espacios
        // -- el usuario ingresa un caracter no numérico
        while (true){

        preguntaCantidad = prompt(`¿Qué cantidad de ${nombreFruta} deseas?`) // Preguntamos al usuario la cantidad (de la fruta seleccionada) que desea
        if (preguntaCantidad === null || preguntaCantidad.trim() === "" || isNaN(preguntaCantidad) ) 
        {alert("Debes insertar una cantidad numérica!")}
        else{ break}
        }

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

            <img onclick="borrarFruta(${listaMensajeUsuario.length})" src="img/basurero.png" alt="basurero"/> 
            <p>${nombreFruta}:  ${preguntaCantidad} x ${precioFruta} ${magnitud} = ${costoFruta.toFixed(2)} </p>
        </div> `
        // borrarFruta(${listaMensajeUsuario.length}) permite asignar el índice correcto a cada basurero.
        

        // Por cada selección, agregamos un nuevo elemento (mensajeUsuario) al array listaMensajeUsuario 
        listaMensajeUsuario.push(mensajeUsuario)  

        // El contenido de "carrito" es inicialmente vacío
        // En cada evento "click" el carrito se actualizará
        actualizarCarrito()
        

    })    
}

// Declaramos la función borrarFruta
// Eliminará la línea correspondiente al basurero en el que se ha hecho click
// Actualiza el contenido de carrito y el precio total
function borrarFruta(j) {

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajeUsuario.length;i++){

        // Si el índice 'i' coincide con el que índice 'j' del div dentro del cual se encuentra el basurero clickado
        // entonces se ejecutará el siguiente código
        if (i==j){ 
        
            // Restamos el costo del producto eliminado del total absoluto
            totalAbsoluto -= listaCostosParciales[i] 

            // Reemplazamos los elementos de lista correspondiente por strings vacíos
            listaMensajeUsuario[i]= ""
            listaCostosParciales[i]=""
        }
    }

    // actualizamos el contenido de carrito y el precio total
    actualizarCarrito()

}

// Declaramos la función actualizarCarrito
function actualizarCarrito() {

    // Limpiamos el carrito
    carrito.innerHTML = ""

    // Recorremos los elementos de la listaMensajeUsuario
    // y mostramos cada elemento en "carrito"
    for (mensajes of listaMensajeUsuario){
        if(mensajes !="") // Solo se mostraran los mensajes que no sean strings vacíos
        {carrito.innerHTML += mensajes}
    }

    //Mostramos el precio final
    // .toFixed(2) para mostrar solo 2 cifras decimales
    preuFinal.innerHTML = totalAbsoluto.toFixed(2)
}

