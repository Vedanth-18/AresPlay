//Obstacles, Sounnd, Booster
//Game variables
var gameState; //Gamestate is to change the initial 2d dashboard to 3d environment and back to 2d plane at game end
var cam; //Creating camera for the 3d workspace
var rover; //Var to load rover GIF.
var bg; //Var to load dashboard background GIF.
var canvas3d; //Var to create the 3d WEBGL canvas
var roverPositionZ; //Var to assign rover position over Z axis
var roverPositionX; //Var to assign rover position over X axis
var controlsPanel; //Var to load the controls icon image
var ob1; //Position of obstacles
var ob2; //Position of obstacles
var ob3; //Position of obstacles
var ob4; //Position of obstacles
var ob5; //Position of obstacles
var ob6; //Position of obstacles
var ob7; //Position of obstacles
var ob8; //Position of obstacles
var ob9; //Position of obstacles
var ob10; //Position of obstacles
var model2; //Var to load obstacle model
var mx1; //Var to assign X position of obstacles
var mx2; //Var to assign X position of obstacles
var mx3; //Var to assign X position of obstacles
var mx4; //Var to assign X position of obstacles
var mx5; //Var to assign X position of obstacles
var mx6; //Var to assign X position of obstacles
var mx7; //Var to assign X position of obstacles
var mx8; //Var to assign X position of obstacles
var mx9; //Var to assign X position of obstacles
var mx10; //Var to assign X position of obstacles
//Terrain Assests - Vars
var M_Terrain; //Var to import 3d terrain model as obj object
var textureImg; //Var to aplly texture for the terrain
var textureImg2;
//Terrain Creation - Vars
var frameR; //Specialised Counting system for creating terrain synchronously with regard frameCount..
var Tpos; //Var to calculate terrain position(z-axis) of successive terrains
var Tpos2 = -200; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos3 = -400; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos4 = -600; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
var Tpos5 = -800; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
//Texts - Var
var GenralT_1; 
var ARESfont;
/////
var Rov_D_Obs; //Variable to calculate distance between obstacle and rover
var status;

function preload(){
  M_Terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover = loadImage("Assets/Image/rover.gif");
  bg = loadImage("Assets/Image/Ares.webp");
  textureImg = loadImage("Assets/Image/terr_texture.jpg");
  textureImg2 = loadImage("Assets/Image/obst_texture.png");
  GenralT_1 = loadFont("Assets/Text/Ares.otf")  //Free commercial license
  ARESfont = loadFont("Assets/Text/Ares.ttf");  //Free commercial license
  controlsPanel = loadImage("Assets/Image/controls.jpg");
  model2 = loadModel("Assets/3d Object/obstacle.obj");
  //model2 = loadModel("Assets/3d Object/T2.obj");
}

function setup() {
  //Initialiasing gamestate
  gameState = 0;
  //CreatingCanvas - WEBGL Mode
  canvas3d = createCanvas(windowWidth, windowHeight, WEBGL);
  //Cam
  cam = createCamera(0, 0, 0);   
  //Initializing value of rover position
  roverPosition = 21;
  //Initialising frameR
  frameR = 0;
  //Initialising roverPositionZ
  roverPositionZ = 21;
  //Initialising roverPositionX
  roverPositionX = 0;
  //Initialising AcknowledgeS to 0[Meaning - game didn't start]
  AcknowledgeS = 0;
  //Initialising object position
  ob1 = 0;
  //Initialising X positions of the obstacles
  mx1 = 10; 
  mx2 = -8;
  mx3 = 3;
  mx4 = -16;
  mx5 = 10;
  mx6 = -10; 
  mx7 = 17;
  mx8 = 0;
  mx9 = 6;
  mx10 = -17;
  //Defining Terrain Position
  Tpos = 0;
}

function draw() {  
  //console.log("roverPositionX: " + roverPositionX);
  //console.log("roverPositionZ: " + roverPositionZ);
  //Setting background - Colour
  background("BLACK");
  //Dashboard Screen
  if(gameState === 0){
    push();
    texture(bg);
    noStroke();
    plane(windowWidth, windowHeight);
    pop();
  }
  //GAME SCENE
  if(gameState === 1){
    //Smooth
    smooth();
    //orbitControl
    orbitControl();
    //Calling spawnObstacles() function to spawn the obstacles on the terrain
    spawnObstacles();
    //Calling createTerrains() function to create the terrains in the game
    createTerrains();
    //Text
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(100 + sin(frameCount*0.06) * 255);
    text("Hold on letter 'C' for controls", 0, -163);
    pop();
    //Text2
    push();
    textFont(GenralT_1);
    textAlign(CENTER, CENTER);
    textSize(34);
    fill(50 + sin(frameCount*0.06) * 255);
    text("Press 'S' to start", 0, -125);
    pop();
    //MainText
    push();
    textFont(ARESfont);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("A  R  E  S", 0, -250);
    pop();

    //collision(roverPositionX, mx2,);
    //dist function and collision detection
    //.                Rover               obstacle
    //X - pos -    roverPositionX            mx2
    //Y - pos -    23                         7
    //Z - pos -    roverPositionZ            ob2
    Rov_D_Obs = dist(roverPositionX, mx3, 6, 6, -roverPositionZ, -ob3);
    //console.log("RoverX: " + Math.round(roverPositionX) + " RoverZ: " + Math.round(roverPositionZ));
    //console.log("ObstX: " + Math.round(mx3) + "ObstZ: " + Math.round(ob3));
    //console.log("dist: " + Math.round(Rov_D_Obs));
    //Defining frameR
    if(keyIsDown(UP_ARROW) && frameCount%1 === 0 && AcknowledgeS === 1){
      frameR++;
    }
    //console.log("FrameR: " + frameR);
    //Camera movement
    //Initialising movement when  key "S" is pressed[Aligining camera relative to rover's position]
    if(keyIsDown(83) && AcknowledgeS === 0){
      cam.setPosition(0, 65, [-(frameR*15)]);
    }
    //Movement of camera when Up Arrow key is pressed
    if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
      cam.setPosition(0, 65, [-(frameR*15)]);
    }
    //MarsRover     
    push();
    //Starting the game and changing rover position to its beginning when letter "S" is pressed[Aligigning rover to the  initial camera movement/position]
    if(keyIsDown(83) && AcknowledgeS === 0){
      //roverPositionZ = 0;
      roverPositionZ = (-16);
      AcknowledgeS = 1;
    }
    push();
    if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
      roverPositionZ = (roverPositionZ) - 1;
    }
    //////////////////////////////////////
    if(keyIsDown(DOWN_ARROW) && AcknowledgeS === 1){
      roverPositionZ = (roverPositionZ) + 1;
    }
    //////////////////////////////////////
    if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX<15){
      roverPositionX = roverPositionX + 0.1; //Right movement
    }
    if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX>(-15)){
      roverPositionX = roverPositionX - 0.1; //Left movement
    }
    //console.log("Tpos: " + Tpos);
    scale(15);
    texture(rover);
    noStroke();
    translate(roverPositionX, 6.0, roverPositionZ);
    plane(6.4, 5.4);
    pop();
    pop();      
    }
    //Movement Controls - Panel
    if(keyIsDown(67)){  //Shows up when the key "C" is pressed
    noStroke();
    texture(controlsPanel);
    translate(0, 0, 300);
    plane(windowWidth/3, windowHeight/2.4);
    }
}

//MousePressed function - Change gameState
function mousePressed(){
    console.log("Pressed")
    gameState = 1;
    //Resizing the canvas to full screen
    //resizeCanvas(displayWidth, displayHeight, WEBGL);
    //Switching to full screen mode  to fit the altered canvas dimensiosn and setting parameter to true(so when clicked again, it does't exit full screen mode)
    //fullscreen(true);
}

//Terrain creation function - Called in main();
function createTerrains(){
  //Calculating terrain positions
  if(frameR > 0 && frameR%350 === 0){
    //Calculating Tposition
    Tpos =  Tpos  - 340;
    //console.log("Tpos: " + Tpos);
    Tpos2 = Tpos  - 200;
    Tpos3 = Tpos2 - 200;
    Tpos4 = Tpos3 - 200;
    Tpos5 = Tpos4 - 200;
 }

 //Terrain creation(MainTerrain) - Properties.
       push();
       //Describing the size of the terrain
       scale(15);
       //Assigning position to the terrain(z-axis position) - To appear like being continous
       translate(0,0,Tpos);
       //Removing strokes on the terrain to make it look plain
       //fill("YELLOW");
       //stroke("BLACK");
       noStroke();
       //Applying mars like texture to the 3d model
       texture(textureImg);
       //Loading terrain model..
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain1) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos2);
       noStroke();
       //fill("RED");
       //stroke("BLACK");
       texture(textureImg);
       model(M_Terrain);
       pop();

    //Terrain creation(BufferTerrain2) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos3);
       //fill("BLUE");
       //stroke("BLACK");
       noStroke();
       texture(textureImg);
       model(M_Terrain);
       pop();
    //Terrain creation(BufferTerrain3) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos4);
       noStroke();
       texture(textureImg);
       model(M_Terrain);
       pop();
    //Terrain creation(BufferTerrain4) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos5);
       noStroke();
       fill(255, 102, 94);
       texture(textureImg);
       model(M_Terrain);
       pop();
}

//Function for Spawing the obstacles around on the terrain
function spawnObstacles(){
 if(frameR > 0){
   //Calculating object position
   ob1 = Tpos - 20;
 }
   ob2 = Tpos - 60 ;
   ob3 = Tpos - 150;
   ob4 = Tpos - 240;
   ob5 = Tpos - 330;
   ob6 = Tpos- 420;
   ob7 = Tpos- 510;
   ob8 = Tpos- 600;
   ob9 = Tpos- 690;
   ob10 = Tpos- 780;
  
 if(frameR>0 && (frameR-100)%320 === 0){
   mx1 = (random(5, 12)); 
   mx2 = (random(-16, -8));
   mx3 = (random(-5, 5));
   mx4 = (random(-15, -11));
   mx5 = (random(0, 6));
   mx6 = (random(15, 17)); 
   mx7 = (random(-17 ,17));
   mx8 = (random(-17, 17));
   mx9 = (random(-17, 17));
   mx10 = (random(-17, 17));
 }
 push();
 scale(15);
 fill("WHITE");
 translate(mx1, 7, ob1);
 noStroke();
 texture(textureImg2);
 model(model2);
 pop();
 
 push();
 scale(15);
 fill("WHITE");
 translate(mx2, 7, ob2);
 noStroke();
 texture(textureImg2);
 model(model2);
 pop();
 
 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx3, 7, ob3);
 texture(textureImg2);
 model(model2);
 pop();
 
 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx4, 7, ob4);
 texture(textureImg2);
 model(model2);
 pop();
 
 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx5, 7, ob5);
 texture(textureImg2);
 model(model2);
 pop();

 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx6, 7, ob6);
 texture(textureImg2);
 model(model2);
 pop();

 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx7, 7, ob7);
 texture(textureImg2);
 model(model2);
 pop();

 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx8, 7, ob8);
 texture(textureImg2);
 model(model2);
 pop();

 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx9, 7, ob9);
 texture(textureImg2);
 model(model2);
 pop();

 push();
 scale(15);
 fill("WHITE");
 noStroke();
 translate(mx10, 7, ob10);
 texture(textureImg2);
 model(model2);
 pop();
}

function collision(xa, xb, ya, yb, za, zb, la, lb, ba, bb, ha, hb){
  if((abs(xa) - abs(xb)) < (abs(la/2) + abs(lb/2)) && (abs(xb)- abs(xa)) < (abs(la/2) + abs(lb/2))
  && (abs(ya) - abs(yb)) < (abs(ba/2) + abs(bb/2)) && (abs(yb) - abs(ya)) < (abs(ba/2) + abs(bb/2))
  && (abs(za) - abs(zb)) < (abs(ha/2) + abs(hb/2)) && (abs(zb) - abs(za)) < (abs(ha/2) + abs(hb/2)))
  {
    status = "Touching";
  }
  else{
    status = "Not touching"
  }
}


























//............Tested codes............///
  // perspective(PI / 2.0, width /height);
  //camX = map(mouseX, 0, width/10, -200, 200);
  //camera((Xpos) +30 , -height/8, 0);
  //camera((Xpos) +30 , -height/8, 0, width, height/6,0,0,1,0);
  // cam.move(delta, 0, 0);
  // if (frameCount % 10 === 0) {
  //   delta *= 2;
  // }
  // if (delta===2 || delta > 2.2) {
  //   delta =2;
  // }
  // perspective(PI / 2.0, width /height);
  //camX = map(mouseX, 0, width/10, -200, 200);
  //camera((Xpos) +30 , -height/8, 0);
  //camera((Xpos) +30 , -height/8, 0, width, height/6,0,0,1,0);
  //translate(0, 0, mouseX);
  //console.log(modelX);
  //box(85);
  //rotateY(90);
  //rotateZ(90);
  //rotate(180);
  //  if(frameCount%1===0){
  //    if(Xpos<0){
  //      Xpos+=6;
  //    }
  //    if(Xpos===0){
  //      Xpos= -600;
  //    }
  //  }, (height/2) / tan(PI/6),width/2, height/2, 100, 0,1,0
  //  if(Xpos>200){
  //    Xpos = -width/2;
  //  }
  // if(frameCount%1===0){
  //   Xpos=Xpos+10;
  // }
  //modelX(0,0,0);
  // cam.setPosition(sin(frameCount / 60) * 200, 0, 100);
  // perspective();
  // X = sliderGroup[0].value();
  // Y = sliderGroup[1].value();
  // Z = sliderGroup[2].value();
  // centerX = sliderGroup[3].value();
  // centerY = sliderGroup[4].value();
  // centerZ = sliderGroup[5].value();
  //camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  // for (var i = 0; i < 6; i++) {
  //   if (i === 2) {
  //     sliderGroup[i] = createSlider(10, 400, 200);
  //   } else {
  //     sliderGroup[i] = createSlider(-400, 400, 0);
  //   }
  //   h = map(i, 0, 6, 5, 85);
  //   sliderGroup[i].position(10, height + h);
  //   sliderGroup[i].style('width', '80px');
  // }
  //BG
  //image(bgImg, displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  //BG_END
  //cam.setPosition(0,0,0);
  // function keyPressed(){
  //   if(keyCode === 38){
  //     cam.move(0, 0, +5);
  //     //cam.setPosition(0, 0, captureframeCount*4);
  //   }
  //   loop();
  // }

  // function keyReleased(){
  //   if(keyCode === 38){
  //     return false;
  //   }
  //}
  // //M_Terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
    //   //M_Terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
  

    /////
    // //M_TerrainD2 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-200);
    // stroke("Yellow");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    // //M_Terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();
    // //M_Terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(M_Terrain);
    // pop();

    //DebugModeON
  //debugMode(2100, 10,0 ,0, 0, 200, 0, 0, 0);
  //Camera movement

  //Spawning boosters
// function boosterSpawn(){
//   if(AcknowledgeS === 1){
//     translate(random(-55, 55), random(Tpos, Tpos3), 0);
//     plane(100, 100);
//   }
// }
// function trial(){
//   ob1 = -200;
//   ob2 = ob1 - 250;
//   ob3 = ob2 - 250;
//   ob4 = ob3 - 250;
//   ob5 = ob4 - 250;
//   //
//   push();
//   translate(0, -20, ob1);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob2);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob3);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob4);
//   fill("WHITE");
//   plane(25, 19);
//   pop();

//   push();
//   translate(0, -20, ob5);
//   fill("WHITE");
//   plane(25, 19);
//   pop();
  
// }
  




///.....................EXTRA TERRAINS........................//
//Terrain creation(BufferTerrain5)
       //M_Terrain(n) - Properties of terrain(n) - BufferTerrain5..
       //push();
       //scale(15);
       //translate(0,0,Tpos6);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop(); 
//
       ////Terrain creation(BufferTerrain6)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain6..
       //push();
       //scale(15);
       //translate(0,0,Tpos7);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain7..
       //push();
       //scale(15);
       //translate(0,0,Tpos8);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain8..
       //push();
       //scale(15);
       //translate(0,0,Tpos9);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain9)
       ////M_Terrain(n) - Properties of terrain(n) - BufferTerrain9..
       //push();
       //scale(15);
       //translate(0,0,Tpos10);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(M_Terrain);
       //pop();
       ////////////INITIALISATION CODE...........
       //Tpos6 = Tpos5 - 200;
    //Tpos7 = Tpos6 - 200;
    //Tpos8 = Tpos7 - 200;
    //Tpos9 = Tpos + 200;
    //Tpos10 = Tpos9 + 200;
    ////
    // var Tpos6 = -1000; //Var to calculate buffer terrain position(z-axis) of successive buffer terrains
// var Tpos7 = -1200;
// var Tpos8 = -1400;
// var Tpos9 = 200;
// var Tpos10 = 400;
///////////////.........................../////////////////////////