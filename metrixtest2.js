/* var five = require("johnny-five");
var board = new five.Board();
const scrollController = require('./five-squared')


board.on("ready", function() {
    scrollController.connect(board);
  
    scrollController.clear();
    //scrollController.led();
    scrollController.allVal(1);
//
//scrollController.clear();
// make an array of 0-255 pixels
// let arr = []

// for(var i = 0; i < 119; i++){
//     arr[i] = 255;
// }

// // scrollController will drop messages it receives before the display is init'ed
// // so we wait 100ms and then call display with our pixel array.
// setTimeout(()=>{
//     scrollController.display(arr)
// },100)


}); */

var five = require("johnny-five");
var board = new five.Board();
const scrollController = require('./fivefive')


board.on("ready", function() {
    scrollController.connect(board);
    scrollController.clear();
    //scrollController.pixel(3,3,255,1,0);
    //scrollController.fill(255,0,0);
    scrollController.fill(255);
    //scrollController.allColour(200);
//
//scrollController.clear();
// make an array of 0-255 pixels
// let arr = []

// for(var i = 0; i < 119; i++){
//     arr[i] = 255;
// }

// // scrollController will drop messages it receives before the display is init'ed
// // so we wait 100ms and then call display with our pixel array.
// setTimeout(()=>{
//     scrollController.display(arr)
// },100)


});