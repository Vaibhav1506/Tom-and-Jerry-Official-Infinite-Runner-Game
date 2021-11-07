var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Tom, Tom_running, Tom_collided;

var Jerry, Jerry_running;

var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg;

var jumpSound , checkPointSound, dieSound;

function preload(){
  
  Tom_running = loadImage("Tom_2.png");
  
  Tom_collided = loadImage("Tom_screaming.png");
  
  Jerry_running = loadImage("Jerry_1.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  cloudImage = loadImage("cloud.png");
  
  backgroundMusic = loadSound("Tom and Jerry Theme song.mp3");
  
  dieSound = loadSound("toms-screams.mp3"); 
}

function setup() {
  createCanvas(600, 200);
  
  Tom = createSprite(50,160,20,50);
  Tom.addAnimation("running", Tom_running);
  Tom.addAnimation("collided", Tom_collided);
  Tom.scale = 0.08;
  
  Jerry = createSprite(200,160,20,50);
  Jerry.addImage("running",Jerry_running);
  Jerry.scale = 0.167; 
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  backgroundMusic.loop();
  
  Tom.setCollider("rectangle",0,0,Tom.width,Tom.height);
  
  score = 0;
  
}

function draw() {
  
  background("white");

  text("Score: "+ score, 500,50);
  text("Score: "+ score, 500,50);
  text("Score: "+ score, 500,50);
  text("Score: "+ score, 500,50);
  
  text("Tom and Jerry Official Infinite Runner Game",200,40);
  text("Tom and Jerry Official Infinite Runner Game",200,40);
  text("Tom and Jerry Official Infinite Runner Game",200,40);
  text("Tom and Jerry Official Infinite Runner Game",200,40);

  text("Help Tom to catch Jerry",250,50);
  text("Help Tom to catch Jerry",250,50);
  text("Help Tom to catch Jerry",250,50);
  text("Help Tom to catch Jerry",250,50);
  
  text("Made by Vaibhav Bakshi",1,40);
  text("Made by Vaibhav Bakshi",1,40);
  text("Made by Vaibhav Bakshi",1,40);
  text("Made by Vaibhav Bakshi",1,40);
  
  text("Official creator : Fred Quimby",1,55);
  text("Official creator : Fred Quimby",1,55);
  text("Official creator : Fred Quimby",1,55);
  text("Official creator : Fred Quimby",1,55);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if (obstaclesGroup.isTouching(Jerry)){
     Jerry.velocityY=-12;
   }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& Tom.y > 156) {
        Tom.velocityY = -12;
    }
        
    Tom.velocityY = Tom.velocityY + 0.8
    Jerry.velocityY = Jerry.velocityY + 0.8;
    
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(Tom)){
        gameState = END;
        dieSound.play();
        backgroundMusic.stop();      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
       
      Tom.changeAnimation("collided", Tom_collided);
     
      ground.velocityX = 0;
      Tom.velocityY = 0;
      Jerry.x = 200;
     
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0); 
      cloudsGroup.setLifetimeEach(-1);
     
    if(mousePressedOver(restart)) {
      reset();
    }
   }

  Tom.collide(invisibleGround);
  Jerry.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;  
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  backgroundMusic.loop();
  Tom.changeAnimation("running",Tom_running);  
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
 }
  }

function spawnClouds() {
   if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    
    cloud.depth = Tom.depth;
    Tom.depth = Tom.depth + 1;
  
    cloud.depth = Jerry.depth;
    Jerry.depth = Jerry.depth + 1;
     
    cloudsGroup.add(cloud);
  }
}


