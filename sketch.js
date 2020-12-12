var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground;
var back,backImage;
var bananaGroup,bananaImage;
var obstacleGroup,obstacleImage;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg")
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(400,300);

ground = createSprite(400,257,900,10);  
  
monkey=createSprite(60,220,10,10);  
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;

back=createSprite(200,30,50,50);  
back.velocityX=-4;  
back.addImage("back",backImage);
back.scale=1.1;
  
bananaGroup = createGroup();
obstacleGroup = createGroup();

monkey.setCollider("circle",0,0,100); 
monkey.debug=false;  
}

function draw() {  
  
if (back.x < 0){
back.x = back.width/2;
}  
  
if (ground.x < 0){
ground.x = ground.width/2;
}
  
spawnbananas();
  
spawnObstacles();
  
if(keyDown("space")){
  monkey.velocityY=-12
}  

if(bananaGroup.isTouching(monkey)){
  score=score+2;
  bananaGroup.destroyEach();
}  
 
if(obstacleGroup.isTouching(monkey)){
  monkey.scale=0.1;
}  
  
monkey.velocityY = monkey.velocityY + 0.8
  
monkey.collide(ground); 
    
drawSprites();
  
stroke("white");
textSize(20);
fill("white");
text("Score: "+ score,170,80);  
  
}

function spawnbananas(){
  if(frameCount % 60===0){
 var banana=createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    var score=Math.round(random(10,40));
    switch(score){
      case 10:monkey.scale=0.12;
        break;
      case 20:monkey.scale=0.14;
        break;
        case 30:monkey.scale=0.16;
        break;
        case 40:monkey.scale=0.18;
        break;
        default: break;
    }
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);   
  }
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(900,230,10,40);
   obstacle.velocityX = -6;
   obstacle.x = Math.round(random(600,200));
   obstacle.addImage(obstacleImage);  
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   
   obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

  
