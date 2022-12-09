var gameState;
var cam;
var rover, rover_tex;
var bg;
var canvas3d;
var roverPositionX, roverPositionZ;
var controlsPanel;
var obst_z1, obst_z2, obst_z3, obst_z4, obst_z5, obst_z6, obst_z7, obst_z8, obst_z9, obst_z10;
var obst_model;
var obst_x1, obst_x2, obst_x3, obst_x4, obst_x5, obst_x6, obst_x7, obst_x8, obst_x9, obst_x10;
var terrain;
var textureImg;
var frameR;
var Tpos, Tpos2, Tpos3, Tpos4, Tpos5; 
var font_1, font_2;
var obst_x = [], obst_y = [], obst_z = [];
var obstacle, obst_texture;

function preload(){
  terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover_tex = loadImage("Assets/Image/rover.gif");
  bg = loadImage("Assets/Image/Ares.webp");
  textureImg = loadImage("Assets/Image/terr_texture.jpg");
  obst_texture = loadImage("Assets/Image/obst_texture.png");
  font_1 = loadFont("Assets/Text/Ares.otf");
  font_2 = loadFont("Assets/Text/Ares.ttf"); 
  controlsPanel = loadImage("Assets/Image/controls.jpg");
  obst_model = loadModel("Assets/3d Object/obstacle.obj");
}

function setup() {
  gameState = 0;
  canvas3d = createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera(0, 0, 0);   
  roverPosition = 21;
  frameR = 0;
  roverPositionZ = 21;
  roverPositionX = 0;
  AcknowledgeS = 0;
  Tpos = 0; Tpos2 = -200; Tpos3 = -400; Tpos4 = -600; Tpos5 = -800; 
  obst_z1 = 0; obst_x1 = 10;  obst_x2 = -8; obst_x3 = 3; obst_x4 = -16; obst_x5 = 10; obst_x6 = -10;  obst_x7 = 17; obst_x8 = 0; obst_x9 = 6; obst_x10 = -17;
  }

function draw() {  
  push();
  background("BLACK");
  pop();
  //Dashboard Screen
  if(gameState === 0){
    push();
    texture(bg);
    noStroke();
    plane(windowWidth, windowHeight);
    pop();
    mousePressed();
  }
  
  //GAME SCENE
  if(gameState === 1){
    smooth();
    orbitControl();
    cam_movements();
    createTerrains();
    text_display();
    interface();
    rover_define();
    spawnObstacles();
    //display
    rover.display();
    if(keyIsDown(UP_ARROW) && frameCount%1 === 0 && AcknowledgeS === 1){
      frameR++;
    }
  }
}

function mousePressed(){
    console.log("Pressed")
    gameState = 1;
}

function interface(){
   //Controls Panel
   if(keyIsDown(67)){  //"C" pressed
    noStroke();
    texture(controlsPanel);
    translate(0, 0, 300);
    plane(windowWidth/3, windowHeight/2.4);
  }
  //Full screen auto manoeuvre
  //resizeCanvas(displayWidth, displayHeight, WEBGL);
  //fullscreen(true);
}

function text_display(){
  //parent_text
  push();
  textFont(font_2);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("A  R  E  S", 0, -250);
  pop();
  //text1
  push();
  textFont(font_1);
  textAlign(CENTER, CENTER);
  textSize(34);
  fill(sin(frameCount*0.08) * 255);
  text("Hold on letter 'C' for controls", 0, -163);
  pop();
  //text2
  push();
  textFont(font_1);
  textAlign(CENTER, CENTER);
  textSize(34);
  fill(sin(frameCount*0.08) * 255);
  text("Press 'S' to start", 0, -125);
  pop();
}

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
       model(terrain);
       pop();

    //Terrain creation(BufferTerrain1) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos2);
       noStroke();
       //fill("RED");
       //stroke("BLACK");
       texture(textureImg);
       model(terrain);
       pop();

    //Terrain creation(BufferTerrain2) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos3);
       //fill("BLUE");
       //stroke("BLACK");
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain creation(BufferTerrain3) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos4);
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain creation(BufferTerrain4) - Properties.
       push();
       scale(15);
       translate(0,0,Tpos5);
       noStroke();
       fill(255, 102, 94);
       texture(textureImg);
       model(terrain);
       pop();
}

function spawnObstacles(){
  obst_z1 = Tpos - 20;
  obst_z2 = Tpos - 60;
  obst_z3 = Tpos - 150;
  obst_z4 = Tpos - 240;
  obst_z5 = Tpos - 330;
  obst_z6 = Tpos - 420;
  obst_z7 = Tpos - 510;
  obst_z8 = Tpos - 600;
  obst_z9 = Tpos - 690;
  obst_z10 = Tpos - 780; 

  if(frameR>0 && (frameR-100)%330 === 0){
    obst_x1 = (random(5, 12)); 
    obst_x2 = (random(-16, -8));
    obst_x3 = (random(-5, 5));
    obst_x4 = (random(-15, -11));
    obst_x5 = (random(0, 6));
    obst_x6 = (random(15, 17)); 
    obst_x7 = (random(-17 ,17));
    obst_x8 = (random(-17, 17));
    obst_x9 = (random(-17, 17));
    obst_x10 = (random(-17, 17));
  }

  obst_x = [obst_x1, obst_x2, obst_x3, obst_x4, obst_x5, obst_x6, obst_x7, obst_x8, obst_x9, obst_x10];
  obst_y = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
  obst_z = [obst_z1, obst_z2, obst_z3, obst_z4, obst_z5, obst_z6, obst_z7, obst_z8, obst_z9, obst_z10];
  
 for(var i = 0; i<10; i++){
  obstacle = new Obstacle(obst_x[i], obst_y[i], obst_z[i], 15, obst_texture, obst_model);
  obstacle.display();
  rover.collision(obst_x[i], obst_y[i], obst_z[i], 7.5, 10, 2);
 }
}

function cam_movements(){
  if(keyIsDown(83) && AcknowledgeS === 0){
    cam.setPosition(0, 65, [-(frameR*15)]);
  }
  if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
    cam.setPosition(0, 65, [-(frameR*15)]);
  }
}

function rover_define(){
  //Initiating movement
  if(keyIsDown(83) && AcknowledgeS === 0){
    roverPositionZ = (-16);
    AcknowledgeS = 1;
  }
  //movements
  if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
    roverPositionZ = (roverPositionZ) - 1;
  }
  if(keyIsDown(DOWN_ARROW) && AcknowledgeS === 1){
    roverPositionZ = (roverPositionZ) + 1;
  }
  if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX<15){
    roverPositionX = roverPositionX + 0.1; //Right movement
  }
  if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX>(-15)){
    roverPositionX = roverPositionX - 0.1; //Left movement
  }
  //define
  rover = new Rover(roverPositionX, 6, roverPositionZ, 6.4, 5.4, 15, rover_tex);
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
  // //terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();

    // //terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();

    // //terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();
    //   //terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(terrain);
    // pop();
  

    /////
    // //terrainD2 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-200);
    // stroke("Yellow");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();

    // //terrain3 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-400);
    // stroke("BLUE");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();

    // //terrain4 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-600);
    // stroke("Green");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();

    // //terrain5 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-800);
    // stroke("RED");
    // fill(255, 102, 94);
    // model(terrain);
    // pop();
    // //terrain6 - Properties of terrain
    // push();
    // scale(6);
    // translate(0,0,-1000);
    // stroke(0);
    // fill(255, 102, 94);
    // model(terrain);
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
       //terrain(n) - Properties of terrain(n) - BufferTerrain5..
       //push();
       //scale(15);
       //translate(0,0,Tpos6);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(terrain);
       //pop(); 
//
       ////Terrain creation(BufferTerrain6)
       ////terrain(n) - Properties of terrain(n) - BufferTerrain6..
       //push();
       //scale(15);
       //translate(0,0,Tpos7);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////terrain(n) - Properties of terrain(n) - BufferTerrain7..
       //push();
       //scale(15);
       //translate(0,0,Tpos8);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain7)
       ////terrain(n) - Properties of terrain(n) - BufferTerrain8..
       //push();
       //scale(15);
       //translate(0,0,Tpos9);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(terrain);
       //pop();
//
       ////Terrain creation(BufferTerrain9)
       ////terrain(n) - Properties of terrain(n) - BufferTerrain9..
       //push();
       //scale(15);
       //translate(0,0,Tpos10);
       //noStroke();
       //fill(255, 102, 94);
       //texture(textureImg);
       //model(terrain);
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