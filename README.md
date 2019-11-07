# fiverMatrix
This is a [Johnny-Five](http://johnny-five.io/) compatable library for the Pimironi 5x5 multicolour LED matrix. You can buy one [here](https://shop.pimoroni.com/products/5x5-rgb-matrix-breakout).

## Why?
When I write this I couldn't find a library that worked with the Johnny-Five framework. There was a library for Python [here] (https://github.com/pimoroni/rgbmatrix5x5-python) but it obviously that didn't work with JS based Johnny-Five.

## Wiring
the board should be wired to the ardunio pins  

3-5v -> 3.3v or 5v
SCL -> A5
SDA -> A4
SPARE PIN
GND -> GND



## Usage
```javascript
    var five = require("johnny-five"); // require johnny-five
    var fivefive = require("./fivefive-library.js"); //require this library
    var board = new five.Board(); //create your johnny-=five board
    
    fivefive.init(board); //initilise the board 
```
    
    
 ### clearing the matrix
 
 ```javascript
 fivefive.clear(); //clears the matrix
 fivefive.show(); //renders the LEDS
 ```
 
 ### setting an led
 you can set any led using the set pixel command. 
 It takes five parameters row (0-4), column(0-4), red (0-255), green (0-255), blue (0-255)
 ```javascript
 fivefive.set_pixel(2,2,255,255,255); //this would set the centre pixel white
 ```
 
 ### setting all leds
 ```javascript
 fivefive.set_all(0,255,255); //sets all to yellow
 fivefive.show(); //renders on LEDS
 ```
    

