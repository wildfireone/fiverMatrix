var five = require("johnny-five");
var board = new five.Board();
var fivefive = require("./fivefive-library.js");

board.on("ready", function() {

  var heart = [
    "01100",
    "10011",
    "10000",
    "10000",
    "01000"
  ];

  fivefive.init(board);
  fivefive.set_all(0,255,255);
  fivefive.show();
 
  //fivefive.clear();
count =0;
while(count<50){
  count++;
   for(var i=0; i<5;i++){
    fivefive.set_pixel(i,0,0,0,255);
    //fivefive.show();
  }
  for(var j=0; j<5;j++){
    fivefive.set_pixel(0,j,0,0,255);
    //fivefive.show();
  }
  for(var i=0; i<5;i++){
    fivefive.set_pixel(4,i,0,0,255);
    //fivefive.show();
  }
  for(var j=0; j<5;j++){
    fivefive.set_pixel(j,4,0,0,255);
    //fivefive.show();
  }
  fivefive.show();
  for(var i=1; i<4;i++){
    fivefive.set_pixel(i,1,255,255,0);
    //fivefive.show();
  }
  for(var j=1; j<4;j++){
    fivefive.set_pixel(1,j,255,255,0);
    //fivefive.show();
  }
  for(var i=1; i<4;i++){
    fivefive.set_pixel(3,i,255,255,0);
    //fivefive.show();
  }
  for(var j=1; j<4;j++){
    fivefive.set_pixel(j,3,255,255,0);
    //fivefive.show();
  }
  fivefive.show();
  
    fivefive.set_pixel(2,2,255,0,0);
    fivefive.show();
    
    for(var i=0; i<5;i++){
      fivefive.set_pixel(i,0,255,0,0);
      //fivefive.show();
    }
    for(var j=0; j<5;j++){
      fivefive.set_pixel(0,j,255,0,0);
      //fivefive.show();
    }
    for(var i=0; i<5;i++){
      fivefive.set_pixel(4,i,255,0,0);
      //fivefive.show();
    }
    for(var j=0; j<5;j++){
      fivefive.set_pixel(j,4,255,0,0);
      //fivefive.show();
    }
    fivefive.show();
    for(var i=1; i<4;i++){
      fivefive.set_pixel(i,1,0,0,255);
      //fivefive.show();
    }
    for(var j=1; j<4;j++){
      fivefive.set_pixel(1,j,0,0,255);
      //fivefive.show();
    }
    for(var i=1; i<4;i++){
      fivefive.set_pixel(3,i,0,0,255);
      //fivefive.show();
    }
    for(var j=1; j<4;j++){
      fivefive.set_pixel(j,3,0,0,255);
      //fivefive.show();
    }
    fivefive.show();
    
      fivefive.set_pixel(2,2,255,255,0);
      fivefive.show();

      for(var i=0; i<5;i++){
        fivefive.set_pixel(i,0,255,255,0);
        //fivefive.show();
      }
      for(var j=0; j<5;j++){
        fivefive.set_pixel(0,j,255,255,0);
        //fivefive.show();
      }
      for(var i=0; i<5;i++){
        fivefive.set_pixel(4,i,255,255,0);
        //fivefive.show();
      }
      for(var j=0; j<5;j++){
        fivefive.set_pixel(j,4,255,255,0);
        //fivefive.show();
      }
      fivefive.show();
      for(var i=1; i<4;i++){
        fivefive.set_pixel(i,1,255,0,0);
        //fivefive.show();
      }
      for(var j=1; j<4;j++){
        fivefive.set_pixel(1,j,255,0,0);
        //fivefive.show();
      }
      for(var i=1; i<4;i++){
        fivefive.set_pixel(3,i,255,0,0);
        //fivefive.show();
      }
      for(var j=1; j<4;j++){
        fivefive.set_pixel(j,3,255,0,0);
        //fivefive.show();
      }
      fivefive.show();
      
        fivefive.set_pixel(2,2,0,0,255);
        fivefive.show();
   
  
    }
  
  




});