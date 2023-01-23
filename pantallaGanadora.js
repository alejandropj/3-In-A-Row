window.addEventListener("load", iniciar);


function iniciar() {
  if (sessionStorage.hasGanado == "true") {
    var audio = document.getElementById("audio");
    if(audio.paused){
      audio.volume=1;
      audio.play();
    }
    //Animación de victoria
    document.getElementById("trofeo").style.animationName = "trofeo";
    document.getElementById("trofeo").style.animationDuration = "3s";
    document.getElementById("trofeo").style.animationIterationCount = "1";

    //Comprobación del ganador
    if (sessionStorage.ganador == 1) {
      document.getElementById("ganador").textContent = sessionStorage.nombre1;
      sessionStorage.puntNombre1 = parseInt(sessionStorage.puntNombre1) + 1;
    } else if (sessionStorage.ganador == 2) {
      document.getElementById("ganador").textContent = sessionStorage.nombre2;
      sessionStorage.puntNombre2 = parseInt(sessionStorage.puntNombre2) + 1;
    }
    ranking();
    
    sessionStorage.hasGanado = false;
  } else {
    alert("No has jugado.");
    window.location.href = "juego.html";
  }
}

function audio(){
  var audio = document.getElementById("audio");
  if(audio.paused){
    audio.volume=1;
    audio.play();
  }
  else{
    audio.pause();
  }
}



function ranking() {
  if(parseInt(sessionStorage.puntNombre1) > parseInt(sessionStorage.puntNombre2)){
    //Jugador 1
    var mitexto1 = sessionStorage.nombre1 + " - " + sessionStorage.puntNombre1;
    var miA1 = document.createElement("a");
    miA1.append(mitexto1);
    document.getElementById("ranking").append(miA1);

    //Jugador 2
    var mitexto2 = sessionStorage.nombre2 + " - " + sessionStorage.puntNombre2;
    var miA2 = document.createElement("a");
    miA2.append(mitexto2);
    document.getElementById("ranking").append(miA2);
  }
  else{
    //Jugador 2
    var mitexto1 = sessionStorage.nombre2 + " - " + sessionStorage.puntNombre2;
    var miA1 = document.createElement("a");
    miA1.append(mitexto1);
    document.getElementById("ranking").append(miA1);

    //Jugador 1
    var mitexto2 = sessionStorage.nombre1 + " - " + sessionStorage.puntNombre1;
    var miA2 = document.createElement("a");
    miA2.append(mitexto2);
    document.getElementById("ranking").append(miA2);
  }
  /*
  //Inicializamos LocalStorage
  if (localStorage.length == 0) {
    var arrayJugadores = [jug1, jug2];
    arrayJugadores.reverse();
    localStorage.setItem("jugadores", JSON.stringify(arrayJugadores));
  }

  //Leemos el LocalStorage
  else{
    var arrayJugadores = localStorage.getItem("jugadores");
    arrayJugadores = JSON.parse(arrayJugadores);
    var jugadoresPuntuacion=[];

    //Bucle que asigna los valores a nombre y punt
    for (let i = 0; i < arrayJugadores.length; i++) {
        jugadoresPuntuacion.push({nombre:arrayJugadores[i].split("—")[0], punt:arrayJugadores[i].split("—")[1]});
    }

    console.log(jugadoresPuntuacion);
    /*

    //Transformamos Array en Map para eliminar duplicados
    let jugadoresMap = jugadoresPuntuacion.map(item=>{return [item.nombre,item]});
    var jugadoresMapArr = new Map(jugadoresMap); // Pares de clave y valor
    let unicos = [...jugadoresMapArr.values()]; // Conversión a un array

    
    
    
    
    //Imprimimos el LocalStorage
    
    console.log(unicos);
    var arrayJugadoresOrd = [];
    for (let i = 0; i < unicos.length; i++) {
        arrayJugadoresOrd.push(unicos.nombre[i] + "—" + unicos.punt[i]);
        
    }
    localStorage.setItem("jugadores", JSON.stringify(unicos));

    arrayJugadores.forEach((element) => {
        console.log(element);
        var miA = document.createElement("a");
        var mitexto = document.createTextNode(element);
        miA.appendChild(mitexto);
        document.getElementById("ranking").appendChild(miA);
    });
*/
    
  }
