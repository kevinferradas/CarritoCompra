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

 // Creamos los nodos
 const productes= document.querySelectorAll(".productes div")

 let preuFinal=document.querySelector("#preuFinal")

 let carrito=document.querySelector("#carrito")


 let mensajeUsuario=""
 let totalAbsoluto=0
 for (let i = 0; i<productes.length; i++) {
    productes[i].addEventListener("click", () => {

        // Creamos los nodos para las imágene y párrafos dentro de cada uno de los div
        let imatge= productes[i].querySelector("img")
        let precioFruta = productes[i].querySelector("p").textContent
        
        precioFruta= precioFruta.split(': ')[1].trim()
        let magnitud = precioFruta.split('€')[1]
        precioFruta= precioFruta.split('€')[0]
        
        
        let nombreFruta = imatge.getAttribute("alt"); //Obtenemos el nombre de cada fruta
        // alert(precioFruta)
        // alert(nombreFruta)
        // alert(magnitud)
        
        let preguntaCantidad = prompt(`¿Qué cantidad de ${nombreFruta} deseas?`)

        let costoFruta = parseFloat(preguntaCantidad)*parseFloat(precioFruta)
        totalAbsoluto += costoFruta

        mensajeUsuario += `<div id="mensajeFruta">

            <img id="basurero" src="img/basurero.png" alt="basurero"/>
            <p>${nombreFruta}:  ${preguntaCantidad} x ${precioFruta} ${magnitud} = ${costoFruta.toFixed(2)} </p>
        </div> `

        carrito.innerHTML = mensajeUsuario 
        preuFinal.innerHTML = totalAbsoluto.toFixed(2)
        
    })
}

let basurero = document.querySelectorAll("#basurero")

for (let i = 0; i<basurero.length;i++){
    basurero[i].addEventListener("click", () => {


    })
}

sfunct