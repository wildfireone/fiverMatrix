

const _MODE_REGISTER = 0x00;
const _FRAME_REGISTER = 0x01;
const _AUTOPLAY1_REGISTER = 0x02;
const _AUTOPLAY2_REGISTER = 0x03;
const _BLINK_REGISTER = 0x05;
const _AUDIOSYNC_REGISTER = 0x06;
const _BREATH1_REGISTER = 0x08;
const _BREATH2_REGISTER = 0x09;
const _SHUTDOWN_REGISTER = 0x0a;
const _GAIN_REGISTER = 0x0b;
const _ADC_REGISTER = 0x0c;

const _CONFIG_BANK = 0x0b;
const _BANK_ADDRESS = 0xfd;

const _PICTURE_MODE = 0x00;
const _AUTOPLAY_MODE = 0x08;
const _AUDIOPLAY_MODE = 0x18;

const _ENABLE_OFFSET = 0x00;
const _BLINK_OFFSET = 0x12;
const _COLOR_OFFSET = 0x24;


    var width = 16;
    var height = 9;
    var address = 0x74;
    var io;

    function connect(board){
        board.io.i2cConfig();
        io = board.io;
        init();
        //reset();
    }

   

    function i2c_write_reg(reg, data){
        //Write a buffer of data (byte array) to the specified I2C register
        // addres
        io.i2cWrite(address, reg, data);
    }

    function w(r,d) {io.i2cWrite(address,r,d);}
    

    function fbank(bank){
    
        bank = new ArrayBuffer(bank);
        i2c_write_reg(_BANK_ADDRESS, bank);

    }


    function register(bank, register, value){
        fbank(bank);
        value = new ArrayBuffer(value);
        i2c_write_reg(register, value)
    }

    function mode(mode){
        register(_CONFIG_BANK, _MODE_REGISTER, mode)
    }

    function init(){
        w(_BANK_ADDRESS, _CONFIG_BANK);
        w(_SHUTDOWN_REGISTER, 0); // shutdown
        // wait 10ms
        w(_SHUTDOWN_REGISTER, 1); // un-shutdown
        w(_MODE_REGISTER, _PICTURE_MODE);
        w(_FRAME_REGISTER, 0); // display frame 0
        w(_AUDIOSYNC_REGISTER, 0); // no audio sync
    }


function reset(){
        
        sleep(true);
        sleep(0.01);
        sleep(false);
    }


function sleep(value){
        register(_CONFIG_BANK, _SHUTDOWN_REGISTER, value)
}


function autoplay(delay, loops, frames){

    
        if ( !(0 <= loops && loops <= 7)){
            console.log("Loops out of range")
        }
        if( !(0 <= frames && frames <= 7)){
            console.log("Frames out of range")
        }
        if( !(1 <= delay && delay <= 64)){
            console.log("Delay out of range")
        }
        register(_CONFIG_BANK, _AUTOPLAY1_REGISTER, loops << 4 | frames)
        register(_CONFIG_BANK, _AUTOPLAY2_REGISTER, delay % 64)
        mode(_AUTOPLAY_MODE | frame)
}



// [docs]    def fade(self, fade_in=None, fade_out=None, pause=0):
//         """
//         Start and stop the fade feature.  If both fade_in and fade_out are None (the
//         default), the breath feature is used for fading.  if fade_in is None, then
//         fade_in = fade_out.  If fade_out is None, then fade_out = fade_in

//         :param fade_in: positive number; 0->100
//         :param fade-out: positive number; 0->100
//         :param pause: breath register 2 pause value
//         """
//         if fade_in is None and fade_out is None:
//             self._register(_CONFIG_BANK, _BREATH2_REGISTER, 0)
//         elif fade_in is None:
//             fade_in = fade_out
//         elif fade_out is None:
//             fade_out = fade_in
//         fade_in = int(math.log(fade_in / 26, 2))
//         fade_out = int(math.log(fade_out / 26, 2))
//         pause = int(math.log(pause / 26, 2))
//         if not 0 <= fade_in <= 7:
//             raise ValueError("Fade in out of range")
//         if not 0 <= fade_out <= 7:
//             raise ValueError("Fade out out of range")
//         if not 0 <= pause <= 7:
//             raise ValueError("Pause out of range")
//         self._register(_CONFIG_BANK, _BREATH1_REGISTER, fade_out << 4 | fade_in)
//         self._register(_CONFIG_BANK, _BREATH2_REGISTER, 1 << 4 | pause)


function fframe(frame, show){
    if (!frame){
        return frame
    }
    if(!(0 <= frame && frame <= 8)){
        console.log("Frame out of range");
    }
    //if(show){
        register(_CONFIG_BANK, _FRAME_REGISTER, frame)
    //}
}
        
        


function audio_sync(value){
        
        register(_CONFIG_BANK, _AUDIOSYNC_REGISTER, value)
}


// [docs]    def audio_play(self, sample_rate, audio_gain=0,
//                    agc_enable=False, agc_fast=False):
//         """Controls the audio play feature
//         """
//         if sample_rate == 0:
//             self._mode(_PICTURE_MODE)
//             return
//         sample_rate //= 46
//         if not 1 <= sample_rate <= 256:
//             raise ValueError("Sample rate out of range")
//         self._register(_CONFIG_BANK, _ADC_REGISTER, sample_rate % 256)
//         audio_gain //= 3
//         if not 0 <= audio_gain <= 7:
//             raise ValueError("Audio gain out of range")
//         self._register(_CONFIG_BANK, _GAIN_REGISTER,
//                        bool(agc_enable) << 3 | bool(agc_fast) << 4 | audio_gain)
//         self._mode(_AUDIOPLAY_MODE)


// [docs]    def blink(self, rate=None):
//         """Updates the blink register
//         """
//         # pylint: disable=no-else-return
//         # This needs to be refactored when it can be tested
//         if rate is None:
//             return (self._register(_CONFIG_BANK, _BLINK_REGISTER) & 0x07) * 270
//         elif rate == 0:
//             self._register(_CONFIG_BANK, _BLINK_REGISTER, 0x00)
//             return None
//         rate //= 270
//         self._register(_CONFIG_BANK, _BLINK_REGISTER, rate & 0x07 | 0x08)
//         return None
function clear(){
    // Turn all LEDs on
    for (var f=0; f<8; f++) {
      w(_BANK_ADDRESS, f);
      for (var i=0;i<18;i++) w(i, 0);
    }
  }

function fill(color, blink, frame){
        //"""
        //Fill the display with a brightness level

        //:param color: brightness 0->255
        //:param blink: True if blinking is required
        //:param frame: which frame to fill 0->7
        //"""
        /* if (!frame){
            frame = 0
        }
        fbank(frame)
        if (color){ 
            if( !(0 <= color && color <= 255)){
                console.log("Color out of range")
            }
            data = new ArrayBuffer(color * 25)
            
                for (var v =0; v<6; v++){
                    data[0] = _COLOR_OFFSET + v * 24
                    io.i2cWrite(address, 255)
                }
            
        }
        if (blink){
            data = bool(blink) * 0xff
            for (var c =0; c<18; c++){
                self._register(frame, _BLINK_OFFSET + c, data)
            }
        } */
        // Turn all LEDs on
    // Turn all LEDs on
    var data = Array(25).fill(255);

    for (var f=0; f<6; f++) {
        //w(_BANK_ADDRESS, f);
        //for (var i=0;i<18;i++) {
            data[0] = _COLOR_OFFSET + f * 24
            io.i2cWrite(address, data.buffer);
        //}
      }
      
}


// [docs]    @staticmethod
function pixel_addr(x, y){
 
    return x + y * 16;
}
//         """Calulate the offset into the device array for x,y pixel
//         """
//         


  function pixel( x, y, color, blink, frame){
        
        //Blink or brightness for x-, y-pixel

        //:param x: horizontal pixel position
        //:param y: vertical pixel position
        //:param color: brightness value 0->255
        //:param blink: True to blink
        //:param frame: the frame to set the pixel
        
        if(!(0 <= x && x<= width)){
            return;
        }
        if(!(0 <= y && y<= height)){
            return;
        }
            
        pixel = pixel_addr(x, y)
        if(!color && !blink){
            return register(self._frame, pixel)
        }
        if( !frame){
            frame = 0
        }
        if(color){
            if(!(0 <= color && color <= 255)){
                console.log("Color out of range")
            }
            register(frame, _COLOR_OFFSET + pixel, color)
        }
        if(blink && blink!=0){
            var addr = Math.floor(pixel/8);
            var bit = pixel % 8;
            bits = register(frame, _BLINK_OFFSET + addr)
            if (blink){
                bits |= 1 << bit
            }
            else{
                bits &= ~(1 << bit)
            }
            register(frame, _BLINK_OFFSET + addr, bits)
        }
      

    
  }

  module.exports ={
      connect,
      pixel,
      fill,
      reset,clear
  }


/* [docs]class CharlieWing(Matrix):
    """Supports the Charlieplexed feather wing
    """
    width = 15
    height = 7

[docs]    @staticmethod
    def pixel_addr(x, y):
        """Calulate the offset into the device array for x,y pixel
        """
        if x > 7:
            x = 15 - x
            y += 8
        else:
            y = 7 - y
        return x * 16 + y



[docs]class CharlieBonnet(Matrix):
    """Supports the Charlieplexed bonnet"""
    width = 16
    height = 8

[docs]    @staticmethod
    def pixel_addr(x, y):
        """Calulate the offset into the device array for x,y pixel"""
        if x >= 8:
            return (x-6) * 16 - (y + 1)
        return (x+1) * 16 + (7 - y)
 */
