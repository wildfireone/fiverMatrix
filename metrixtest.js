var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var heart = [
    "01100",
    "10011",
    "10000",
    "10000",
    "01000"
  ];

  var matrix = new five.Led.Matrix({
    addresses: [0x74],
    address: 0x74,
    controller: "ISFL",
    dims:{rows:5,columns:5},
    isBicolor:true

  });

 matrix.draw(heart);




});