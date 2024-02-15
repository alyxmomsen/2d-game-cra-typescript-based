import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from './../../player.png' ;


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {

        const img = new Image() ;
        img.src = sprite_main ;
        
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:50 , height:50} , 
            rigidBody:true ,kind:'player' , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(img , {width:1200 , height:1000} , {x:0 , y:0}) ,
        });

    }
}

// export Player ;