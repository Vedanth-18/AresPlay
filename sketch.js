var gameState;
var cam;
var rover, rover_tex;
var dashboard, exitboard;
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
var collison_state = 'False';
var function_state = 'True';

function preload(){
  terrain = loadModel("Assets/3d Object/terrain.obj", true);
  rover_tex = loadImage("Assets/Image/rover.gif");
  dashboard = loadImage("Assets/Image/dashboard.png");
  exitboard = loadImage("Assets/Image/exitboard.png");
  textureImg = loadImage("Assets/Image/terr_texture.jpg");
  obst_texture = loadImage("Assets/Image/obst_texture.png");
  font_1 = loadFont("Assets/Text/Ares.otf");
  font_2 = loadFont("Assets/Text/Ares.ttf"); 
  controlsPanel = loadImage("Assets/Image/controls.jpg");
  obst_model = loadModel("Assets/3d Object/obstacle.obj");
}

function setup() {
  gameState = 1;
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
  background("BLACK");
  smooth();
  if(gameState === 1){
    push();
    texture(dashboard);
    noStroke();
    plane(windowWidth, windowHeight);
    pop();
    resizeCanvas(displayWidth, displayHeight, WEBGL);
  }
  if(gameState === 2){
       fullscreen(true);
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
  gameState = 2;
}

function interface(){
   //Controls Panel
   if(keyIsDown(67)){  //"C" pressed
    noStroke();
    texture(controlsPanel);
    translate(0, 0, 300);
    plane(windowWidth/3, windowHeight/2.4);
  }
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
  if(frameR > 0 && frameR%350 === 0){
    Tpos =  Tpos  - 340;
    Tpos2 = Tpos  - 200;
    Tpos3 = Tpos2 - 200;
    Tpos4 = Tpos3 - 200;
    Tpos5 = Tpos4 - 200;
 }
    //Terrain
       push();
       scale(15);
       translate(0,0,Tpos);
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain2
       push();
       scale(15);
       translate(0,0,Tpos2);
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain3
       push();
       scale(15);
       translate(0,0,Tpos3);
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain4
       push();
       scale(15);
       translate(0,0,Tpos4);
       noStroke();
       texture(textureImg);
       model(terrain);
       pop();
    //Terrain5
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

  if(collison_state == 'False' && function_state == 'True'){
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
  }  

  obst_x = [obst_x1, obst_x2, obst_x3, obst_x4, obst_x5, obst_x6, obst_x7, obst_x8, obst_x9, obst_x10];
  obst_y = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
  obst_z = [obst_z1, obst_z2, obst_z3, obst_z4, obst_z5, obst_z6, obst_z7, obst_z8, obst_z9, obst_z10];
  
 for(var i = 0; i<10; i++){
  obstacle = new Obstacle(obst_x[i], obst_y[i], obst_z[i], 15, obst_texture, obst_model);
  obstacle.display();
  rover.collision(obst_x[i], obst_y[i], obst_z[i], 7, 10, 2.1);
  if(collison_state === 'True'){
      const zAtc = obst_z[i];
      if(collison_state === 'True'){
        push();
        scale(15);
        texture(exitboard);
        translate(0, 4, zAtc+12)
        noStroke();
        plane(windowWidth/110, windowHeight/98)
        pop();
      collison_state = 'False';
     }
  }
 }
}

function cam_movements(){
  if(collison_state == 'False' && function_state == 'True'){
    if(keyIsDown(83) && AcknowledgeS === 0){
       cam.setPosition(0, 65, [-(frameR*15)]);
    }
    if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
       cam.setPosition(0, 65, [-(frameR*15)]);
    }
  }
}

function rover_define(){
  //Initiating movement
  if(keyIsDown(83) && AcknowledgeS === 0){
    roverPositionZ = (-16);
    AcknowledgeS = 1;
  }
  //movements
  if(collison_state == 'False' && function_state == 'True'){
     if(keyIsDown(UP_ARROW) && AcknowledgeS === 1){
       roverPositionZ = (roverPositionZ) - 1;
     }
     if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX<15){
       roverPositionX = roverPositionX + 0.1; //Right movement
     }
     if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW) && AcknowledgeS === 1 && roverPositionX>(-15)){
       roverPositionX = roverPositionX - 0.1; //Left movement
     }
    }
  //define
  rover = new Rover(roverPositionX, 6, roverPositionZ, 6.4, 5.4, 15, rover_tex);
}