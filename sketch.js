var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var ground
var gameover,gameoverImage,restrt, restrtImage
var survivalTime=0;

function preload()
{
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameoverImage=loadImage("gameOver.png");
  restrtImage=loadImage("restart.png");
 
}



function setup()
{
  createCanvas(600,600);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  //creating scrolling ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2
  
  gameover=createSprite(300,160);
  gameover.addImage(gameoverImage)
  gameover.scale=0.5;
  gameover.visible=false;
  
  restrt=createSprite(300,200);
  restrt.addImage(restrtImage);
  restrt.scale=0.4;
  restrt.visible=false;
  
  //declaring new groups
  foodGroup=new Group();
  obstacleGroup=new Group();
  
}


function draw() 
{
   background("white");
  
  //displaying text
   text("Score: "+ score, 500,50);
  
  //displaying survival time
   textSize(20);
   fill("black");
   text("Survival Time:"+survivalTime,100,50);
  
    if (gameState===PLAY)
    {
      //creating scrolling effect
       if (ground.x < 0)
       {
        ground.x = ground.width/2;
       }
       
      //giving framecount to survival time
      survivalTime = survivalTime+Math.round(getFrameRate()/60);
      
      //increasing the speed of ground after a certain surval time
      ground.velocityX = -(6 + 3*survivalTime/100);
      
      //if space is pressed monkey will jump
      if(keyDown("space") && monkey.y >= 250)
      {
        monkey.velocityY = -10;  
      }  
      
      //giving gravity to the monkey
       monkey.velocityY = monkey.velocityY + 0.8
      

      //colliding the monkey with ground
       monkey.collide(ground);
      
       food();
       obstacles();
      
      
       //if food group is touching monkey then increase the cscore
       if(foodGroup.isTouching(monkey))
        {
          score=score+1;
          foodGroup.destroyEach();
        }
         
       //if the rock are touching monkey the gamestate end
       if(obstacleGroup.isTouching(monkey))
        {
          gameState = END;
        } 
    }
  
   else if (gameState === END) 
   {
     gameover.visible=true;
     restrt.visible=true;
     
      //set velcity of each game object to 0
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
     
     //setting lifetime
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     
     //restart function
     if(mousePressedOver(restrt)) {
      reset();
     }
  
   }
  
  //to display the sprites
  drawSprites();
}


 function food()
 {
   if (frameCount % 80 === 0) 
   {
    banana=createSprite(600,100,10,10)
    banana.y = Math.round(random(150,220));
    banana.addImage(bananaImage);
    banana.scale = 0.1  ;
    banana.velocityX = -(6 + 3*survivalTime/100);
     
     //assign lifetime to the variable
     banana.lifetime = 200;
     
     //adjusting the depth
     banana.depth = restrt.depth;
     restrt.depth = restrt.depth + 1;
     
     //adjusting the depth
     banana.depth = gameover.depth;
     gameover.depth = gameover.depth + 1;
     
     //adding banana to group 
     foodGroup.add(banana)
   }
   
 }

function obstacles()
{
     if (frameCount % 150 === 0) 
   {
    obstacle=createSprite(400,330,10,10)
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.1  ;
    obstacle.velocityX = -(6 + 3*survivalTime/120);
    
     //assign lifetime to the variable
     obstacle.lifetime = 200;
     
     //ading obstacle to group
     obstacleGroup.add(obstacle)
   }

}

function reset()
{
  //resetting the game
  gameState = PLAY;
  gameover.visible = false;
  restrt.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  score=0;
  survivalTime=0;
}

