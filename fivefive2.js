
_MODE_REGISTER = 0x00
_FRAME_REGISTER = 0x01
_AUTOPLAY1_REGISTER = 0x02
_AUTOPLAY2_REGISTER = 0x03
_BLINK_REGISTER = 0x05
_AUDIOSYNC_REGISTER = 0x06
_BREATH1_REGISTER = 0x08
_BREATH2_REGISTER = 0x09
_SHUTDOWN_REGISTER = 0x0a
_GAIN_REGISTER = 0x0b
_ADC_REGISTER = 0x0c

_CONFIG_BANK = 0x0b
_BANK_ADDRESS = 0xfd

_PICTURE_MODE = 0x00
_AUTOPLAY_MODE = 0x08
_AUDIOPLAY_MODE = 0x18

_ENABLE_OFFSET = 0x00
_BLINK_OFFSET = 0x12
_COLOR_OFFSET = 0x24



var LED_GAMMA = [
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




var width = 5
var height = 5
var gamma_table = LED_GAMMA;
var address = 0x74;
var io;
var current_frame = 0;
var buff;
var brightness;



function init(board) {
    

    board.io.i2cConfig();
    io = board.io;
    //self.i2c = i2c_dev
    //self.address = address
    //self._is_setup = False
    //self._clear_on_exit = True

    if (!gamma_table) {
        console.log("gamma reset");
        gamma_table = new Array(256);
    }

    brightness = 1.0
    console.log("init complete");
}

function setup() {
    console.log("starting setup");
    
    io.i2cWrite(address,_BANK_ADDRESS, _CONFIG_BANK);
    io.i2cWrite(address,_SHUTDOWN_REGISTER, 0); // shutdown
    // wait 10ms
    io.i2cWrite(address,_SHUTDOWN_REGISTER, 1); // un-shutdown
    io.i2cWrite(address,_CONFIG_BANK, _PICTURE_MODE);
    io.i2cWrite(address,_FRAME_REGISTER, 0); // display frame 0
    io.i2cWrite(address,_AUDIOSYNC_REGISTER, 0); // no audio sync

    

    clear();
    show();

    //Display initialization

    //Switch to configuration bank
    bank(_CONFIG_BANK)

    //Switch to Picture Mode
    io.i2cWrite(address, _MODE_REGISTER, _PICTURE_MODE);
    io.i2cWrite(address,_FRAME_REGISTER, 0); // display frame 0

    //Disable audio sync
    io.i2cWrite(address, _AUDIOSYNC_REGISTER, [0])

    enable_pattern = [
        0b00000000, 0b10111111,
        0b00111110, 0b00111110,
        0b00111111, 0b10111110,
        0b00000111, 0b10000110,
        0b00110000, 0b00110000,
        0b00111111, 0b10111110,
        0b00111111, 0b10111110,
        0b01111111, 0b11111110,
        0b01111111, 0b00000000,
    ]

    // Switch to bank 1 ( frame 1 )
    bank(1)

    //Enable LEDs
    io.i2cWrite(address, 0x00, enable_pattern)

    //Switch to bank 0 ( frame 0 )
    bank(0)

    //Enable LEDs
    io.i2cWrite(address, 0x00, enable_pattern)

    //atexit.register(self._exit)
}

/* def set_clear_on_exit(self, value=True):
        """Set whether LED SHIM should be cleared upon exit.
        By default LED SHIM will turn off the pixels on exit, but calling::
            scrollphathd.set_clear_on_exit(False)
        Will ensure that it does not.
        :param value: True or False (default True)
        """
        self._clear_on_exit = value

    def _exit(self):
        if self._clear_on_exit:
            self.clear()
            self.show()
 */

function ValueError(stringerror) {
    console.log(stringerror);
}

function set_gamma(gamma_table) {

    if (len(gamma_table) != 256) {
        ValueError('Gamma table must be a list with 256 values.')
    }

    gamma_table = gamma_table
}

function clear() {
    console.log("stating clear");
    //"""Clear the buffer.
    //You must call `show` after clearing the buffer to update the display.
    //"""
    current_frame = 0

    var Abuffer = Array(width * height).fill([0, 0, 0, 1.0]);
    buff = Abuffer
    //show();
    //console.log(Abuffer);

    //self.buf = [(0, 0, 0, 1.0) for x in range(self._width * self._height)]
}

function set_brightness(val) {
    //"""Set a global brightness value.
    //:param brightness: Brightness value from 0.0 to 1.0
    //"""
    brightness = val;
}

function set_all(r, g, b, brightval = 1.0) {
    //"""Set all pixels in the buffer.
    //:param r, g, b: Intensity of the pixel, from 0 to 255.
    //"""
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            set_pixel(x, y, r, g, b, brightval)
        }
    }
}

function set_pixel( x, y, r, g, b, brightval = 1.0) {
    //"""Set a single pixel in the buffer.
    //:param x: Position of pixel from left
    //:param y: Position fo pixel from top
    //:param r, g, b: Intensity of the pixel, from 0 to 255.
    //"""
    //r, g, b = [int(c) for c in (r, g, b)]

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw "Value out of range. RGB values should be between 0 and 1";
    }



    if (x % 2 == 1) {
        y = 4 - y
    }
    buff[y + (x * 5)] = [r, g, b, brightval];
    

}

// def set_multiple_pixels(self, indexes, from_colour, to_colour=None):
//     """Set multiple pixels to a range of colours sweeping from from_colour to to_colour.
//     :param from_colour: A tuple with 3 values representing the red, green and blue of the first colour
//     :param to_colour: A tuple with 3 values representing the red, green and blue of the second colour
//     """
//     if to_colour is None:
//         to_colour = from_colour

//     length = float(len(indexes))
//     step = 0
//     from_r, from_g, from_b = from_colour
//     to_r, to_g, to_b = to_colour
//     step_r, step_g, step_b = to_r - from_r, to_g - from_g, to_b - from_b
//     step_r /= length
//     step_g /= length
//     step_b /= length

//     for index in indexes:
//         if type(index) == int:
//             y = index // 5
//             x = index % 5
//         else:
//             x, y = index
//         self.set_pixel(x, y, from_r + (step_r * step), from_g + (step_g * step), from_b + (step_b * step))
//         step += 1

// def get_shape(self):
//     """Get the size/shape of the display.
//     Returns a tuple containing the width and height of the display,
//     after applying rotation.
//     """
//     return (self._width, self._height)

function show() {
    //"""Show the buffer contents on the display."""
    console.log("starting show");
    //setup()
    //if (current_frame == 1) {
    //    next_frame = 0;
    //} else {
     //   next_frame = 1;
    //}
    //next_frame = 0 if self._current_frame == 1 else 0
    output = new Array(144);;
    output.fill(0, 0, 144);
    console.log(output);

    //console.log(buff);
     console.log("writing buffer");
     for (var x = 0; x < (width * height); x++) {
        console.log("buffer index "+x)
        
        r = buff[x][0]
        g = buff[x][1]
        b = buff[x][2]
        br = buff[x][3]
        
        //console.log(gamma_table)
        console.log(r+ "*"+ brightness+" *"+ br)
        r = gamma_table[parseInt(r * brightness * br)];
        g = gamma_table[parseInt(g * brightness * br)];
        b = gamma_table[parseInt(b * brightness * br)];
        console.log(r)
        console.log(g)
        console.log(b)

        ir = pixel_adder(x,1)
        ig = pixel_adder(x,2)
        ib = pixel_adder(x,3)

        output[ir] = r
        output[ig] = g
        output[ib] = b
        
    }  
    console.log("buffer created, banking");
    console.log(output);
    bank(0)
    console.log("banking complete");
    offset = 0
    console.log("chunking");
    
    var chunks = chunk(output, 32);
    console.log("chunks created");
    console.log("writing chunks");
    for (var c = 0; c < output.length; c++) {
        io.i2cWrite(address, _COLOR_OFFSET+c, parseInt(output[c]))
        //offset += 32;
    }
    console.log("chunks writen");
    console.log("framing");
    //frame(next_frame)
    console.log("show complete")
}

function reset() {
    self.sleep(true)
    time.sleep(0.00001)
    self.sleep(False)
}

function sleep(value) {
    return register(_CONFIG_BANK, _SHUTDOWN_REGISTER, null)
}

function frame(frame = null, show = true) {
    if (!frame) {
        return current_frame
    }

    if (0 > frame || frame > 8) {
        console.log('Frame out of range: 0-8')
    }

    current_frame = frame

    if (show) {
        register(_CONFIG_BANK, _FRAME_REGISTER, frame)
    }
}

function bank(tobank = null) {

    //if (!bank) {
    //    return io.i2(address, _BANK_ADDRESS, 1)[0]
    //}
    //console.log(tobank);
    io.i2cWrite(address, _BANK_ADDRESS, [tobank])
}

function register(tobank, register, value = None) {

    bank(tobank)

    if (!value) {
        return i2creadfrom_mem(address, register, 1)[0]
    }
    //console.log(value);
    io.i2cWrite(address, register, [value])
}

function chunk(l, n) {
    var out = [];
    for (var i = 0; i < l.length + 1; i =i+ n) {
        out.push(l.slice(i, i + n));
    }
    return out;
}


function pixel_addr(x, y) {
    console.log(x+","+y);
    return parseInt(x) + parseInt(y) * 5;
}





    function pixel_adder(x, rgb = null) {
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


    module.exports ={
        init, 
        setup,
        set_gamma,
        clear, 
        set_brightness, 
        set_all,
        set_pixel,
        show
    }