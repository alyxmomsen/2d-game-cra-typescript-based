import { Dimensions } from "../../shared/types/types";
import Sprite from "./sprite";

export default class SpriteManager {

    private frameRate:number = 1000 / 16 ;
    private lastAnimatedTime:number ;
    private sprites:Sprite[] ;
    private currentSpriteID:number|undefined ;

    push (spriteSet:Sprite) {
        this.sprites = [...this.sprites , spriteSet] ; /// its need check for repeat of if the same

        this.setSpriteID(0); // this is HARDCODE
        // this.currentSpriteID = 0 ;
    }

    getFrame () { 
        // return this.sprites[0] ;

        if(this.currentSpriteID !== undefined) {
            
            return this.sprites[this.currentSpriteID].getCurrentFrame() ;
        }
        else {

            /* 
            
            если фреймсет (спрайт) не установлен, но 
            при этом фреймсет лист имеет содержимое,
            то устанавливаем Default значение 0
            пока что , это HARD-CODE
            
            */

            if(this.sprites.length !== 0) {

                /* set default id === 0 */
                this.setSpriteID(0);
            }
            
            return null ;
        }
        
    }

    update() {
        // this.frameSet[frameSetID] ;


        const time = Date.now();
        // let nextFrame = {}

        if(time - this.lastAnimatedTime >= this.frameRate) {

            if(this.currentSpriteID !== undefined) {
                // console.log('tick') ;
                this.sprites[this.currentSpriteID].updateToNextPosition() ;
            }

            this.lastAnimatedTime = time ;

        }


    }

    setSpriteID (id:number) {
        this.currentSpriteID = id ;
    }
    
    constructor () {
        this.lastAnimatedTime = 0 ;
        this.sprites = []; 
        this.currentSpriteID = undefined ;
    }

}