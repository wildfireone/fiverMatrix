var five = require("johnny-five");
var board = new five.Board();
const scrollController = require('five-squared')

board.on("ready", function() {
  // get a reference to scrollcontroller


// make an array of 0-255 pixels
let arr = []

for(var i = 0; i < 119; i++){
    arr[i] = i%2 == 0 ? 255 : 0
}

// scrollController will drop messages it receives before the display is init'ed
// so we wait 100ms and then call display with our pixel array.
setTimeout(()=>{
    scrollController.display(arr)
},100)


});