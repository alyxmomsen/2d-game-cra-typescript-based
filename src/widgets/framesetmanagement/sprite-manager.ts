import { Dimensions } from "../../shared/types/types";
import Sprite from "./sprite";

export default class SpriteManager {

    private frameRate:number = 1000 / 90 ;
    private lastAnimatedTime:number ;
    private sprites:Sprite[] ;
    private currentSpriteID:number|undefined ;

    add (spriteSet:Sprite) {
        this.sprites = [...this.sprites , spriteSet] ; /// its need check for repeat of if the same

        this.setSpriteID(0); // this is HARDCODE
        // this.currentSpriteID = 0 ;
    }

    getFrame () { 
        // return this.sprites[0] ;

        if(this.currentSpriteID !== undefined) {
            
            return this.sprites[this.currentSpriteID] ;
        }
        else {

            /* 
            
            если фреймсет (спрайт) не установлен, но 
            при этом фреймсет лист имеет содержимое,
            то устанавливаем Default значение 0
            пока что , это HARDCODE
            
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

                this.sprites[this.currentSpriteID].updateToNextPosition();
            }
            
            // this.sprites[0].updateToNextPosition(); // HARDCODE !!!!!!


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