let numeroSecreto = 0; //variable numeroSecreto es de alcance global, por ello es mejor dejarlo al inicio y no dentro de una funcion
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//para automatizar document y no utilizarlo constantemente con cada elemento, se crea una funcion para recibir parametros y reducir lineas de codigo
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento); //document para conectar js con html, Selector para atribuir un OBJETO html a una variable
    elementoHTML.innerHTML = texto;
    return;
}

//declaracion de funcion, funcion es encapsulamiento de una accion que se quiere realizar
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) { //comparacion numero de usuario y numero secreto, === es para que el velor y el tipo de formato de valor sean iguales(numero y numero, no numero y string)
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilita el boton nuevo juego cuando el usuario acierta el numero secreto
    } else {
        //El usuario no acertó
        if (numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else{
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;//retornar es para devolver el valor
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; //signo # es para indicar que seleccionas el elemento segun el id
}

//funcion para generar número aleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //Si ya sorteamos todos los numeros, condicion de salida para finalizar recursividad y evitar problema
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles')
    } else{
        //si el numero generado está incluido en la lista, includes recorre el arreglo y verifica si existe devolviendo un booleano
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else{
            listaNumerosSorteados.push(numeroGenerado); //agregar numero al arreglo/lista
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    //genera numero aleatorio
    //inicializar el numero de intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}

//arrays = variable estructurada tipo arreglo/lista/vector que se representa con [], todos los arreglos incian con posición 0

condicionesIniciales();