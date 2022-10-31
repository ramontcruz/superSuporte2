var canvas = document.getElementById('canvas').getContext("2d");
var floor = new Floor(0, 590, 600, 100,"red");
var bg = new Bg(0,0,650,900, "assets/bg.png");
//var flower = new Flower(0,0,50,50, "assets/flower1.png")
var chamadoNormal = new ChamadoNormal(0,0,50,50, "blue");
var bg2 = new Bg(0,-900,650,900, "assets/bg.png")
var estagiario = new Estagiario(200,500,100,80, "assets/estagiario1.png");
var chamadoUrgente = new ChamadoUrgente(100,100,100,100, "assets/normal1.png");
var bgGameOver = new Bg(0,0,650,900, "assets/gameover.png");
var bgGameOver2 = new Bg(0,0,650,900, "assets/gameover2.png");

var text_points = new Text();
var text_lifes = new Text();
var gameover = new Text();

var play = true;
let vidas = "usuários tristes";
let pontos = "estrelas";


document.addEventListener("keydown", function(event){
  if (event.key === "a"){
    estagiario.dir = -3;
  }
  if (event.key === "d"){
    estagiario.dir = 3;
  }
});

document.addEventListener("keyup", function(event){
  if (event.key === "a"){
    estagiario.dir = 0;
  }
  if (event.key === "d"){
    estagiario.dir = 0;
  }
});

document.addEventListener("keydown", function(event){
  if (event.key === "w"){
    estagiario.up = -3;
  }
  if (event.key === "s"){
    estagiario.up = 3;
  }
});

document.addEventListener("keyup", function(event){
  if (event.key === "w"){
    estagiario.up = 0;
  }
  if (event.key === "s"){
    estagiario.up = 0;
  }
});


function collides() {
  if (estagiario.collide(chamadoUrgente)){
    chamadoUrgente.respaw();
    console.log("Apenas pontos "+estagiario.pts);
    estagiario.pts += (2+estagiario.sla);
    console.log("Urgente: pontos "+(estagiario.pts)+" sla "+estagiario.sla);
  }

  if (estagiario.collide(chamadoNormal)){
    chamadoNormal.respaw();
    console.log("Apenas pontos "+estagiario.pts);
    estagiario.pts += (1+estagiario.sla);
    console.log("Normal: pontos "+(estagiario.pts)+" sla "+estagiario.sla);
  }

  if  (floor.collide(chamadoNormal)){
    chamadoNormal.respaw();
    estagiario.lifes -= 1;
  }

  if  (floor.collide(chamadoUrgente)){
    chamadoUrgente.respaw();
    estagiario.lifes -= 1;
  }
}

function gameOver(){
  if(estagiario.lifes <= 0){
    play = false;
  }
}

function draw() {
  bg.draw();
  bg2.draw();
  floor.draw();
  if (play){
    estagiario.draw();
    chamadoUrgente.draw();
    chamadoNormal.draw();
    this.vidas = (10-estagiario.lifes)+" usuários tristes";
    this.pontos = estagiario.pts+" estrelas";
    text_points.draw(this.pontos, 515, 550, "gray");
    text_lifes.draw(this.vidas, 515, 580, "gray");
    
  } else {
   // bgGameOver2.draw();
    
    if (play==false && estagiario.pts>2) {
      bgGameOver2.draw();
    } else if (play==false && estagiario.pts<=2){
      //alterar para bg de campeao
      bgGameOver2.draw();
    }

    if (estagiario.pts<=5) {
      gameover.draw(estagiario.pts, 150,500, "black");
    } 
    else if (estagiario.pts<=60 && estagiario.pts>5){
      gameover.draw(estagiario.pts, 150,400, "black");
    } 
    else if (estagiario.pts<=100 && estagiario.pts>60){
      gameover.draw(estagiario.pts, 150,300, "black");
    } 
    else if (estagiario.pts<=340 && estagiario.pts>100){
      gameover.draw(estagiario.pts, 150,200, "black");
    }
    else gameover.draw(estagiario.pts, 150,50, "black");

    gameover.draw("GameOver", 150,450, "black");
 
  }
  
 
  
  
}

function update() {
  bg.move(3, 900, 0);
  bg2.move(3, 0, -900);
  if(play){
    estagiario.move();
    estagiario.animation("estagiario", 4);
    
    chamadoUrgente.move();
    var posChamadoUrgente = parseInt((600-chamadoUrgente.y)/100);
    if(posChamadoUrgente<6 && posChamadoUrgente>=5){
      chamadoUrgente.animation("normal1", 2);
    }else if (posChamadoUrgente<5 && posChamadoUrgente>=2){
      chamadoUrgente.animation("normal2", 2);
    } else chamadoUrgente.animation("normal3", 2);
    
    chamadoNormal.move();
    var posChamadoNormal = parseInt((600-chamadoNormal.y)/100);
    if(posChamadoNormal<6 && posChamadoNormal>=5){
      chamadoNormal.animation("normal1", 2);
    }else if (posChamadoNormal<5 && posChamadoNormal>=2){
      chamadoNormal.animation("normal2", 2);
    } else chamadoNormal.animation("normal3", 2);
    
    
    collides();
    gameOver();
  }

}

function main() {
  canvas.clearRect(0,0,500,900);
  update();
  draw();
}

setInterval(main, 10);
