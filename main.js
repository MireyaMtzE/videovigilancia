
objetos = [];
estado = "";

function preload(){
  video = createVideo('video.mp4');
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start()
{
  detector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
  console.log("¡Modelo cargado!");
  estado = true;
  video.loop();
  video.speed(1);
  video.volume(0); //tiene que ir en un rango de 0 a 1
}

function gotResult(error, resultados) {
  if (error) {
    console.log(error);
  }
  console.log(resultados);
  objetos = resultados;
}


function draw() {
  image(video, 0, 0, 480, 380);
  if(estado != "")
  {
    detector.detect(video, gotResult);
    for (i = 0; i < objetos.length; i++) {
      document.getElementById("status").innerHTML = "Estado: objeto detectado";
      document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ objetos.length;

      fill("#FF0000");
      porcentaje = floor(objetos[i].confidence * 100);
      text(objetos[i].label + " " + porcentaje + "%", objetos[i].x + 15, objetos[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
    }
  }
}
