    const Engine = Matter.Engine;
    const World= Matter.World;
    const Bodies = Matter.Bodies;
    const Constraint = Matter.Constraint;

    var engine, world;

    var player;
    var playerAnimation;
    var playerJump;
    var playerAttack;
    var ground,groundImage;
    var heart, heart2 , heart3 , heartImage;
    var Enemey1Group;
    var Enemey2Group;
    var luckyBlockGroup;
    var fireballGroup;
    var lives = 2;
    var gameState = "start";
    var mortallity = true;
    var luckyblockframeCount;
    var score = 0;
    var chestImage;
    var chestAppear = 0;
    var standingPlayerImage;
    var restartButtonImage;
    var playButtonImage;
    var gameOver;
    function preload(){

    playerAnimation = loadAnimation("images/animated 1.png" , "images/animated 2.png" , "images/animated 3.png" , "images/animated 4.png" , "images/animated 5.png" ,  "images/animated 6.png")
    playerJump = loadAnimation("images/jump1.png" , "images/jump2.png")
    playerAttack = loadAnimation("images/attack1.png" , "images/attack2.png");
    groundImage = loadImage("images/Background.jpg");
    heartImage = loadImage("images/heart.png");
    enemeyImage = loadImage("images/Enemy 3.gif"); 
    enemey2Image = loadImage("images/Enemy 2.gif");
    luckyblockImage = loadImage("images/Lucky block.png");
    fireballImage = loadImage("images/fire ball.png");
    gameoverImage = loadImage("images/Gameover.png");
    sheildImage = loadImage("images/sheild.png");
    chestImage = loadImage("images/chest.png");
    youwinImage = loadImage("images/You win.png");
    standingPlayerImage = loadAnimation("images/animated 4.png");
    restartButtonImage = loadImage("images/Restart.png");
    playButtonImage = loadImage("images/Start button.png");
    
    }

    function setup(){
        var canvas = createCanvas(700,800);
        
        
        ground = createSprite(1500,350,200,100);
        
        

        player = createSprite(90,600,50,50);
        player.addAnimation("running" , playerAnimation);
        player.addAnimation("jumping" , playerJump);
        player.addAnimation("standing" , standingPlayerImage);
        player.scale = 1;
        player.setCollider("rectangle" , 0,0,70,70)
        player.debug = false;

        ground.addImage(groundImage);
        ground.scale = 1.5;
        ground.x = ground.width/2;

        invisibleGround = createSprite(300,630,1000000000000,10);
        invisibleGround.visible = false;
        invisibleGround.debug = false;

        heart = createSprite(75,120,50,50);
        heart.addImage(heartImage);
        heart.scale = 0.07;

        heart2 = createSprite(120,120,50,50);
        heart2.addImage(heartImage);
        heart2.scale = 0.07;

        heart3 = createSprite(165,120,50,50);
        heart3.addImage(heartImage);
        heart3.scale = 0.07;

        sheild = createSprite(670,150,50,50);
        sheild.addImage(sheildImage);
        sheild.scale = 0.5;
        sheild.visible = false;

        chest = createSprite(670,600,50,50);
        chest.addImage(chestImage);
        chest.scale = 0.5;
        chest.debug = false;
        chest.visible = false;

        playButton = createSprite(360,600,50,50);
        playButton.addImage(playButtonImage);
        playButton.scale = 2;
        playButton.scale=0.6;

        restartButton = createSprite(350,350,50,50);
        restartButton.addImage(restartButtonImage);
        restartButton.scale = 0.3;
        restartButton.visible = false;

        gameOver = createSprite(350,200 , 50 , 50);
        gameOver.scale = 0.5;
        gameOver.addImage(gameoverImage);
        gameOver.visible = false;

        Enemey1Group = new Group();
        Enemey2Group = new Group();
        luckyBlockGroup = new Group();
        fireballGroup = new Group();
        
        }

    function draw(){
      background("lightblue");
        
        
        console.log(gameState)

        if (gameState === "start"){

         player.visible = true;
         player.changeAnimation("standing",standingPlayerImage);
         heart.visible = true;
         heart2.visible = true;
         heart3.visible = true;
         playButton.visible = true;
         lives = 2;
         score = 0;
         player.collide(invisibleGround);

        }
        if (gameState === "start" && mousePressedOver(playButton)){

           playButton.visible = false;
           gameState = "play";

        }
        

        if (gameState === "play"){

           ground.velocityX = -9;
     
           if (fireballGroup.isTouching(Enemey1Group)){

       Enemey1Group.destroyEach();
       fireballGroup.destroyEach(); 
       score = score + 10; 
          

      }

      if (fireballGroup.isTouching(Enemey2Group)){

        Enemey2Group.destroyEach();
        fireballGroup.destroyEach();     
        score = score + 10;
 
       }

       if ((Enemey1Group.isTouching(player) || Enemey2Group.isTouching(player)) && mortallity === true){
       
        
        if (Enemey1Group.isTouching(player)){

        Enemey1Group.destroyEach();

        }

        if (Enemey2Group.isTouching(player)){

          Enemey2Group.destroyEach();
  
          }

          
       console.log(lives);
       if (lives === 2){
         heart3.visible = false;
         
         lives = lives-1;
       }
       else if (lives === 1){
       heart2.visible = false;
       
       lives = lives-1;
      }

      else if (lives === 0){
        heart.visible = false;
      
        lives = lives-1;
        gameState = "end";
      }


       }

      
      

      if (player.isTouching(luckyBlockGroup)){
  
        luckyblockframeCount = frameCount
        luckyBlockGroup.destroyEach();
        mortallity = false;
        sheild.visible = true;
        ground.velocityX = -20;

      }

      if (luckyblockframeCount + 500 === frameCount){
 
      mortallity = true;
      sheild.visible = false;
      ground.velocityX = -9;

      }

      if (frameCount === 4000){

     chest.visible = true;
     chestAppear = 1;
    

      }

      if (chestAppear === 1){

        chest.velocityX = -1
        Enemey1Group.setVelocityXEach(0);
        Enemey2Group.setVelocityXEach(0);
        luckyBlockGroup.setVelocityXEach(0);
        luckyBlockGroup.destroyEach();
        Enemey1Group.destroyEach();
        Enemey2Group.destroyEach();

      }

     
      if (player.isTouching(chest)){

      gameState = "win";


      }
   
     // Enemey2Group.setVelocityYEach(random(300,500));
        if(keyDown("space") & player.y >= 400){
       player.velocityY = -10;
       player.changeAnimation("jumping" , playerJump);
       }

       player.changeAnimation("running" , playerAnimation);
       
     player.velocityY = player.velocityY + 0.8;
     player.collide(invisibleGround);
       
        if(ground.x < 0){

      ground.x = ground.width/2;

        }

        if (keyDown("s")){
          shootFireball();
        }
       
        console.log(frameCount);
 
        
       
       
       
        if(player.y > 600){

       player.y = 600;
       player.collide(invisibleGround);

        }

        Enemey1();
        Enemey2();
        SpawnluckyBlock();
        


      }

      drawSprites();
    fill("black");
    textSize(30);
    text("Score : " + score , 350,120);



    if (gameState === "end"){

      //background (255);
      ground.velocityX = 0;
      player.visible = false;
      Enemey1Group.setVelocityXEach(0);
      Enemey2Group.setVelocityXEach(0);
      gameOver.visible = true;  
      luckyBlockGroup.setVelocityXEach(0);
      restartButton.visible = true;
     
    
       if (mousePressedOver(restartButton)){
        
      gameState = "start";
      playButton.visible = true;
      gameOver.visible=false;
      restartButton.visible=false;
    
   } 
    }

     
   

      

    if (gameState === "win"){
     
      ground.velocityX = 0;
      Enemey1Group.setVelocityXEach(0);
      Enemey2Group.setVelocityXEach(0);
      youwin = createSprite(350,300,50,50);
      youwin.scale = 0.5;
      youwin.addImage(youwinImage);
      chest.velocityX = 0;
      luckyBlockGroup.setVelocityXEach(0);
      player.changeAnimation("standing" , standingPlayerImage);

    }

     
   
    }


   