var R = {
  CONFIG : 0x00,
  SHUTDOWN : 0x0A,
  PICTUREFRAME : 0x01,
  AUDIOSYNC : 0x06,
  };
  var BANK_FUNCTION = 0x0B;
  var BANK_COMMAND = 0xFD;
  var COLOR_OFFSET = 0x24;
  var C = {
    PICTUREMODE : 0x00,
  };
  var addr = 0x74;
  var io;
  var buffer =[];
  var buff = [];
  var brightness =1;
  function connect(board) {
    board.io.i2cConfig();
    io = board.io;
    
    buffer = Array(25).fill([]);
    w(BANK_COMMAND, BANK_FUNCTION);
    w(R.SHUTDOWN, 0); // shutdown
    // wait 10ms
    w(R.SHUTDOWN, 1); // un-shutdown
    w(R.CONFIG, C.PICTUREMODE);
    w(R.PICTUREFRAME, 0); // display frame 0
    w(R.AUDIOSYNC, 0); // no audio sync
    // define graphics
    
    

  }

  var gamma_table = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2,
    2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5,
    6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 11, 11,
    11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
    19, 19, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 27, 28,
    29, 29, 30, 31, 31, 32, 33, 34, 34, 35, 36, 37, 37, 38, 39, 40,
    40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 88, 89,
    90, 91, 93, 94, 95, 96, 98, 99, 100, 102, 103, 104, 106, 107, 109, 110,
    111, 113, 114, 116, 117, 119, 120, 121, 123, 124, 126, 128, 129, 131, 132, 134,
    135, 137, 138, 140, 142, 143, 145, 146, 148, 150, 151, 153, 155, 157, 158, 160,
    162, 163, 165, 167, 169, 170, 172, 174, 176, 178, 179, 181, 183, 185, 187, 189,
    191, 193, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220,
    222, 224, 227, 229, 231, 233, 235, 237, 239, 241, 244, 246, 248, 250, 252, 255]

    function pixel_adder(x, rgb) {
      lookup = [
          [118, 69, 85],
          [117, 68, 101],
          [116, 84, 100],
          [115, 83, 99],
          [114, 82, 98],
          [113, 81, 97],
          [112, 80, 96],
          [134, 21, 37],
          [133, 20, 36],
          [132, 19, 35],
          [131, 18, 34],
          [130, 17, 50],
          [129, 33, 49],
          [128, 32, 48],
          [127, 47, 63],
          [121, 41, 57],
          [122, 25, 58],
          [123, 26, 42],
          [124, 27, 43],
          [125, 28, 44],
          [126, 29, 45],
          [15, 95, 111],
          [8, 89, 105],
          [9, 90, 106],
          [10, 91, 107],
          [11, 92, 108],
          [12, 76, 109],
          [13, 77, 93],
      ]
      if (rgb) {
          return lookup[x][rgb-1]
      } else {
          return lookup[x]
      }
  }

  

  function w(r,d) {io.i2cWrite(addr,r,d);}

  function clear(){
    var Abuffer = Array(5 * 5).fill([0, 0, 0, 1.0]);
    buff = Abuffer;
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      w(BANK_COMMAND, f);
      for (var i=0;i<18;i++) w(i, 0);
    }
  }

  function allOn2(){
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      w(BANK_COMMAND, f);
      for (var i=0;i<18;i++) {
        w(i, [255,255,255,1]);
      }
    }
  } 

  function allOn(){
    // Turn all LEDs on
    var count =0; 
    for (var f=0; f<5; f++) {
      for (var i=0;i<5;i++) {
        buff[pixel_addr(f,i)]=[255,255,255,1];
        
      }
    }
    //show();
    //console.log(buff.length);
    writeDisplay(addr);
  }

  function show() {
    //"""Show the buffer contents on the display."""
    console.log("starting show");
    output = new Array(144);
    output.fill(0, 0, 144);
    console.log(output.length);

    //console.log(buff);
    console.log("writing buffer");
    var checker =0;
    for (var x = 0; x < (5 * 5); x++) {
        console.log("buffer index "+x)
        
        r = buff[x][0]
        g = buff[x][1]
        b = buff[x][2]
        br = buff[x][3]
        
        //console.log(gamma_table)
        console.log(r+ "*"+ brightness +"*"+ br)
        r = gamma_table[parseInt(r * brightness * br)];
        g = gamma_table[parseInt(g * brightness * br)];
        b = gamma_table[parseInt(b * brightness * br)];
        //console.log(r)
        //console.log(g)
        //console.log(b)

        ir = parseInt(pixel_adder(x,1))
        ig = parseInt(pixel_adder(x,2))
        ib = parseInt(pixel_adder(x,3))
        console.log(ir+":"+r);
        console.log(ig+":"+g);
        console.log(ib+":"+b);

        output[ir] = r
        output[ig] = g
        output[ib] = b
        
        //console.log(output);
    }
    console.log("buffer created, banking");
    //console.log(output);
   // w(BANK_COMMAND, f);
    //console.log("banking complete");
    offset = 0
    //console.log("chunking");
    
    //var chunks = chunk(output, 32);
    //console.log("chunks created");
    //console.log("writing chunks");
    //var chunks = chunk(output, 32);
    console.log("chunks created");
    console.log("writing chunks");
    //for (var c = 0; c < chunks.length; c++) {
     //   io.i2cWrite(address, COLOR_OFFSET + offset, chunk)
      //  offset += 32;
    //}
    //console.log(output);
    count =0;
    for (var f=0; f<8; f++) {
      w(BANK_COMMAND, f);
      for (var i=0;i<18;i++) {
        
        w(i, 255);
        console.log(output[pixel_addr(f,i)]);
        count++;
        //console.log(count);
      }
    }
    //console.log("chunks writen");
    //console.log("framing");
    //frame(next_frame)
    console.log("show complete")
}
function pixel_addr(x, y) {
  console.log(x+","+y);
  return parseInt(x) + parseInt(y) * 5;
}
  function allColour(colour){
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      for (var i=0;i<18;i++) {
        buffer[f][i] = 255;
      }
    }
    writeDisplay(addr);
  }

  

  

  function led(x,y){
    // Turn all LEDs on
   
    
  }

  function writeDisplay(addr) {
    var bytes = [0x00];
    // always writes 8 rows (for 8x16, the values have already been rotated)
    for (var i = 0; i < 8; i++) {
      bytes.push(255 & 0xFF);
      bytes.push(255 >> 8);
    }
    io.i2cWrite(0x74, bytes);
  }

  module.exports = {
    connect,
    clear,
    allOn,
    allOn2,
    sleep,
    led, 
    allColour
  }

  function sleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }