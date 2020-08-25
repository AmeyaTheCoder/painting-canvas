var user;
var database;
var form;


var drawing = [];
var currentPath = [];

var gameState = 0;

var colorPicker;
var colorPicker2;

var sel;

var eraser

function preload() {
  backgroundImg = loadImage("lionart.png");
}

function setup(){
  var canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  
   colorPicker = createColorPicker(255)
   colorPicker.position(displayWidth-90,200);

   colorPicker2 = createColorPicker(0)
   colorPicker2.position(displayWidth-90,300);
 
   sel  = createSelect();
   sel.position(displayWidth-80,400)
   sel.option('1')
   sel.option('2')
   sel.option('3')
   sel.option('4')
   sel.option('5')
   sel.option('6')
   sel.option('7')
   sel.option('8')
   sel.option('9')
   sel.option('10')

 
  user = new User();
  form = new Form();

  canvas.parent('canvascontainer');
  canvas.mousePressed(startPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

 
}

function startPath() {
  currentPath = [];
  drawing.push(currentPath);
}

function mouseDragged() {

  var point = {
      x: mouseX,
      y: mouseY
  }
  currentPath.push(point);
}


function draw(){
  if(gameState === 1){
    background(colorPicker.color());
    stroke(colorPicker2.color()); 
  
  }

  strokeWeight(sel.value());
  noFill();
  form.display();

 /*if(gameState === 2){
    erase()
  }*/

   for (var i = 0; i < drawing.length; i++) {
       var path = drawing[i];
       beginShape();
   
  for(var j = 0; j < path.length; j++) {
           vertex(path[j].x, path[j].y);
       }

       endShape();
      }
   
   textSize(12)
   fill(0)
   noStroke()
   text("Background Picker",displayWidth-130,180)

   textSize(12)
   fill(0)
   noStroke()
   text("Stroke Picker",displayWidth-120,280)

   textSize(12)
   fill(0)
   noStroke()
   text("Stroke Size",displayWidth-110,380)
  
}

function saveDrawing() {
  var drawingRef = database.ref('drawing')

  var data={
      name: user.name,
      drawing :drawing
  }
 
  drawingRef.push(data);
}

function clearDrawing() {

  drawing=[];
  
  var ref = database.ref('drawing');
  ref.remove();

  background("red");
}

function gotData(data) {
var drawings = data.val();
var keys = object.keys(drawings);
for(var i =0;i<keys.length;i++){
  var key = keys[i];
  var li = createElement('li','')
  var  ahref = createA('#',key);
  ahref.mousePressed(showDrawing);
  ahref.parent(li);
  li.parent('drawingList')

 }

}

function showDrawing() {
  console.log(this.html())
}