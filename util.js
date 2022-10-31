class Obj{

  frame = 1;
  timer = 0;
  sla = 0;
  lifes = 0;

  constructor(x, y, width, height, color){
    this.x  = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
 
 draw() {
    var img = new Image();
    img.src = this.color;
    canvas.drawImage(img, this.x, this.y, this.width, this.height);
  }


animation(nome, limit){
    this.timer += 1;
    if (this.timer > 10){
      this.timer = 0;
      this.frame += 1;
    }
    if (this.frame > limit){
      this.frame = 1;
    }
    this.color = "assets/" + nome + this.frame + ".png";
  }

  collide(){

  }

}

class Estagiario extends Obj{
  dir = 0;
  up = 0;
  lifes = 10;
  pts = 0;
  

  move(){
    this.x += this.dir;
    this.y += this.up;
  }

  collide(obj){
    
    if (this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.y + this.height > obj.y)
        {
          this.sla = parseInt((600-this.y)/100);
          return true;
        }else {
          return false;
        }
  }

}

class ChamadoUrgente extends Obj{
  //spider
  move(){
    this.y += 4;
    if (this.y > 900){
      this.y = -50;
      this.x = Math.random() * (400 - 0);
    }
  }

  respaw(){
    this.y = -300;
    this.x = Math.random() * (400 - 0);
  }
}

class Bg extends Obj{

  move(speed, limit, pos){
    this.y += speed;

    if(this.y > limit){
      this.y = pos;
    }
  }

}

class Floor extends Obj{
  draw() {
    canvas.fillRect(0, 590, 600, 100);
    canvas.fillStyle = this.color;
  }

  collide(obj){ 
    if (this.y < obj.y)
        {
         console.log("SLA Estourado!!");
          return true;
        }else {
          return false;
        }
  }
}

class ChamadoNormal extends ChamadoUrgente{
  respaw(){
    this.y = -300;
    this.x = Math.random() * (400 - 0);
  }
  
}

class Text{

  draw(text, x, y, color){
    canvas.font = "15px Arial";
    canvas.fillStyle = color;
    canvas.fillText(text, x, y);
  }
}
