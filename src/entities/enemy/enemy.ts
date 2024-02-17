import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from "./../../enemy.png" ;

export class Enemy extends GameObject {
    
    constructor() {

        const img = new Image() ;
        img.src = sprite_main ;

        super({
            kind:'enemy' ,
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:50 , height:30} , 
            isInGame:true , 
            rigidBody:true , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(img , {width:1200 , height:1450} /* , {x:0 , y:0} */ , [{x:0 , y:0}]) ,
        });
    }
}