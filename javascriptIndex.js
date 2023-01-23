document.addEventListener("submit", juego);
document.addEventListener("submit", (e) => e.preventDefault());


function juego() {
  sessionStorage.puntNombre1=0;
  sessionStorage.puntNombre2=0;
  sessionStorage.turno=true;

  var n1 = document.getElementById("nombre1").value;
  var n2 = document.getElementById("nombre2").value;
  if(n1.length > 10 || n2.length > 10){
    document.getElementById("error").textContent="Introduce un alias menor a 10 caracteres";
  } else if(n1.length==0 || n2.length == 0){
    document.getElementById("error").textContent="Introduce los alias de los jugadores";
  } 
  else{
    sessionStorage.setItem("nombre1", n1);
    sessionStorage.setItem("nombre2", n2);
    sessionStorage.setItem("color", document.getElementById("color").value);
    window.location.href = "juego.html";
  }
  
}
