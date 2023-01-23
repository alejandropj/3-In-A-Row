window.addEventListener("load", iniciar);
document.addEventListener("drop", ganar);
  

//Función que asigna a los jugadores.
function iniciar() {
  if (sessionStorage.getItem("nombre1") != null) {
    var n1 = document.getElementById("nombre1");
    n1.textContent = sessionStorage.getItem("nombre1");

    var n2 = document.getElementById("nombre2");
    n2.textContent = sessionStorage.getItem("nombre2");

    document.body.style.backgroundColor = sessionStorage.getItem("color");
    sessionStorage.turno=true;
  }
}
function allowDrop(ev) {
  //ev.stopPropagation();
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  //Si el drop ocurre en casilla
  if (ev.target.className == "casilla") {
    var piezaFlotante = document.getElementById(data);
    var piezaPuesta = ev.target.firstElementChild;
    //No hay pieza
    if (ev.target.children.length == 0 && turno(piezaFlotante)) {
      ev.target.appendChild(piezaFlotante);
      estiloPieza(piezaFlotante);
    }
    //Hay una pieza
    else if (ev.target.children.length == 1 && esValido(piezaPuesta, piezaFlotante) && turno(piezaFlotante)) {
      ev.target.insertBefore(piezaFlotante, piezaPuesta);
      estiloPieza(piezaFlotante);
    }
    //Hay dos piezas, comprobamos que sea de mayor tamaño y de diferente jugador
    else if(ev.target.children.length == 2 && ev.target.firstElementChild.id.substring(0, 1) == "M" && ev.target.firstElementChild.id.substring(1) != piezaFlotante.id.substring(1) && turno(piezaFlotante) ) {
      ev.target.insertBefore(piezaFlotante, piezaPuesta);
      estiloPieza(piezaFlotante);
    }
    //Impedimos
    else {
      document.getElementById("fallo").play();
      //alert("Movimiento no válido.");
    }
  }

  //Si el drop ocurre en pieza
  else if (ev.target.className == "pieza") {
    var piezaFlotante = document.getElementById(data);
    var piezaPuesta = ev.target.parentElement.firstElementChild;
    //Hay una pieza
    if (ev.target.parentElement.children.length == 1 && esValido(piezaPuesta, piezaFlotante) && turno(piezaFlotante)) {
      ev.target.parentElement.insertBefore(piezaFlotante, piezaPuesta);
      estiloPieza(piezaFlotante);
    }
    //Hay dos piezas, comprobamos que sea de mayor tamaño y de diferente jugador
    else if(ev.target.parentElement.children.length == 2 && ev.target.id.substring(0, 1) == "M" && ev.target.id.substring(1) != piezaFlotante.id.substring(1) && turno(piezaFlotante) ) {
      ev.target.parentElement.insertBefore(piezaFlotante, piezaPuesta);
      estiloPieza(piezaFlotante);
    }
    //Impedimos
    else{
      document.getElementById("fallo").play();
      //alert("Movimiento no válido.");
    }
  }
  ocultar();
}

//Función que suena un distinto sonido para el movimiento de ficha
function sonidoPieza(){
  var n = parseInt(Math.random() * 5)+1;
  switch (n){
    case 1:
      document.getElementById("madera1").play();
      break;
    case 2:
      document.getElementById("madera2").play();
      break;
    case 3:
      document.getElementById("madera3").play();
      break;
    case 4:
      document.getElementById("madera4").play();
      break;
    case 5:
      document.getElementById("madera5").play();
      break;
  }
}

//Función que da los estilos a las piezas colocadas
function estiloPieza(piezaFlotante){
  piezaFlotante.style.position = "absolute";
  piezaFlotante.style.top = "0";
  piezaFlotante.style.left = "0";
  piezaFlotante.style.right = "0";
  piezaFlotante.style.bottom = "0";
  piezaFlotante.style.margin = "auto";
  piezaFlotante.style.animationName = "ficha";
  piezaFlotante.style.animationDuration = "0.5s";
  sonidoPieza();
}

//Función que comprueba el tamaño de las piezas y si es el mismo jugador
function esValido(piezaPuesta, piezaFlotante) {
  var esValido = false;
  var tipoPuesta = piezaPuesta.id;
  var tipoFlotante = piezaFlotante.id;
  //comprobacion mismo jugador
  if (tipoPuesta.substring(1) == tipoFlotante.substring(1)) {
    document.getElementById("fallo").play();
    alert("No puedes acumular 2 de tus mismas fichas");
  }
  //comprobacion S, M y L(por char)
  else if (tipoPuesta.substring(0, 1) <= tipoFlotante.substring(0, 1)) {
    document.getElementById("fallo").play();
    alert("Posiciona una ficha de tamaño mayor.");
    
  } else {
    esValido = true;
  }
  return esValido;
}


function turno(piezaFlotante){
  var esValido=false;


  //Valor true será el jugador 1, falso el 2.
  if(sessionStorage.turno=="true"){

    if(piezaFlotante.id.substring(1)==1){
      esValido=true;
      sessionStorage.turno=false;
    }else{
      alert("Turno de "+sessionStorage.nombre1);
    }

  }else if(sessionStorage.turno=="false"){
    if(piezaFlotante.id.substring(1)==2){
      esValido=true;
      sessionStorage.turno=true;
    }else{
      alert("Turno de "+sessionStorage.nombre2);
    }
  }

  
  var fichas = document.getElementsByClassName("pieza");
  for (let i = 0; i < fichas.length; i++) {
    if(sessionStorage.turno=="true" && fichas[i].id.substring(1)!=1){
      fichas[i].style.animationName="suTurno";
      fichas[i].style.animationDuration = "1s";
      fichas[i].style.opacity=0.5;
      
    } else if(sessionStorage.turno=="false" && fichas[i].id.substring(1)!=2){
      fichas[i].style.animationName="suTurno";
      fichas[i].style.animationDuration = "1s";
      fichas[i].style.opacity=0.5;

    } else if(sessionStorage.turno=="true" && fichas[i].id.substring(1)==1){
      fichas[i].style.animationName="tuTurno";
      fichas[i].style.animationDuration = "1s";
      fichas[i].style.opacity=1;

    } else if(sessionStorage.turno=="false" && fichas[i].id.substring(1)==2){
      fichas[i].style.animationName="tuTurno";
      fichas[i].style.animationDuration = "1s";
      fichas[i].style.opacity=1;
    }

  }

  return esValido;
}



//Función que comprueba la lógica del 3 en raya
function ganar() {  
  var casillas = document.getElementsByClassName("casilla");

  //Horizontales 0-2
  if(casillas[0].childElementCount != 0 && casillas[1].childElementCount != 0 && casillas[2].childElementCount != 0){
    if( casillas[0].firstElementChild.id.substring(1) == casillas[1].firstElementChild.id.substring(1) && casillas[1].firstElementChild.id.substring(1) == casillas[2].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[0].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html"; sessionStorage.hasGanado=true}, 1000);
    }
}
  //Horizontales 3-5
  if(casillas[3].childElementCount != 0 && casillas[4].childElementCount != 0 && casillas[5].childElementCount != 0){
    if( casillas[3].firstElementChild.id.substring(1) == casillas[4].firstElementChild.id.substring(1) && casillas[4].firstElementChild.id.substring(1) == casillas[5].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[3].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    } 
  }
  //Horizontales 6-8
  if(casillas[6].childElementCount != 0 && casillas[7].childElementCount != 0 && casillas[8].childElementCount != 0){
    if( casillas[6].firstElementChild.id.substring(1) == casillas[7].firstElementChild.id.substring(1) && casillas[7].firstElementChild.id.substring(1) == casillas[8].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[6].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    } 
  }
  //Verticales 0 3 6
  if(casillas[0].childElementCount != 0 && casillas[3].childElementCount != 0 && casillas[6].childElementCount != 0){
    if( casillas[0].firstElementChild.id.substring(1) == casillas[3].firstElementChild.id.substring(1) && casillas[3].firstElementChild.id.substring(1) == casillas[6].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[0].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    }
  }
  //Verticales 1 4 7
  if(casillas[1].childElementCount != 0 && casillas[4].childElementCount != 0 && casillas[7].childElementCount != 0){
    if( casillas[1].firstElementChild.id.substring(1) == casillas[4].firstElementChild.id.substring(1) && casillas[4].firstElementChild.id.substring(1) == casillas[7].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[1].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    }
  }
  //Verticales 2 5 8
  else if(casillas[2].childElementCount != 0 && casillas[5].childElementCount != 0 && casillas[8].childElementCount != 0){
    if( casillas[2].firstElementChild.id.substring(1) == casillas[5].firstElementChild.id.substring(1) && casillas[5].firstElementChild.id.substring(1) == casillas[8].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[2].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    }
  }
  //Diagonales 0 4 8
  if(casillas[0].childElementCount != 0 && casillas[4].childElementCount != 0 && casillas[8].childElementCount != 0){
    if( casillas[0].firstElementChild.id.substring(1) == casillas[4].firstElementChild.id.substring(1) && casillas[4].firstElementChild.id.substring(1) == casillas[8].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[0].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    }
  }
  //Diagonales 2 4 6
  if(casillas[2].childElementCount != 0 && casillas[4].childElementCount != 0 && casillas[6].childElementCount != 0){
    if( casillas[2].firstElementChild.id.substring(1) == casillas[4].firstElementChild.id.substring(1) && casillas[4].firstElementChild.id.substring(1) == casillas[6].firstElementChild.id.substring(1) ){
      sessionStorage.ganador=casillas[2].firstElementChild.id.substring(1);
      setTimeout(function () {window.location.href = "pantallaGanadora.html";sessionStorage.hasGanado=true}, 1000);
    }
  }
}


//Función que oculta las piezas sobrelapadas
function ocultar(){
  var casillas = document.getElementsByClassName("casilla");
  for (let i = 0; i < casillas.length; i++) {
    if(casillas[i].childElementCount==2){
      casillas[i].children[0].style.visibility="visible";
      casillas[i].children[1].style.visibility="hidden";
    } else if(casillas[i].childElementCount==3){
      casillas[i].children[0].style.visibility="visible";
      casillas[i].children[1].style.visibility="hidden";
      casillas[i].children[2].style.visibility="hidden";
    }
    else if(casillas[i].childElementCount==1){
      casillas[i].firstElementChild.style.visibility = "visible";
    }
  }
}
