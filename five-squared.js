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
  function connect(board) {
    board.io.i2cConfig();
    io = board.io;
    
    buffer = Array(18).fill([]);
    w(BANK_COMMAND, BANK_FUNCTION);
    w(R.SHUTDOWN, 0); // shutdown
    // wait 10ms
    w(R.SHUTDOWN, 1); // un-shutdown
    w(R.CONFIG, C.PICTUREMODE);
    w(R.PICTUREFRAME, 0); // display frame 0
    w(R.AUDIOSYNC, 0); // no audio sync
    // define graphics
    
    

  }

  

  function w(r,d) {io.i2cWrite(addr,r,d);}

  function clear(){
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      w(BANK_COMMAND, f);
      for (var i=0;i<18;i++) w(i, 0);
    }
  }

  function allOn(){
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      w(BANK_COMMAND, f);
      for (var i=0;i<18;i++) {
        w(i, 255);
      }
    }
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
      bytes.push(buffer[i] & 0xFF);
      bytes.push(buffer[i] >> 8);
    }
    io.i2cWrite(addr, bytes);
  }

  module.exports = {
    connect,
    clear,
    allOn,
    sleep,
    led, 
    allColour
  }

  function sleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }