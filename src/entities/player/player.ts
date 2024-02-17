import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from './../../player.png' ;
import sprite_run from './../../Run.png' ;


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {

        const img = new Image() ;
        img.src = sprite_run ;
        const n = 32 ;
        const n2 = 64 ;
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:50 , height:50} , 
            rigidBody:true ,kind:'player' , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(img , {width:64 , height:64}/*  , {x:0 , y:0} */ , [{x:0 + n , y:0 + n2} , {x:128 * 1 + n , y:0 + n2} , {x:128 * 2 + n , y:0 + n2} , {x:128 * 3 + n , y:0 + n2} , {x:128 * 4 + n , y:0 + n2} , {x:128 * 5 + n , y:0 + n2} , {x:128 * 6 + n , y:0 + n2}]) ,
        });

    }
}

// export Player ;