import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from "./../../toxic-box.png"

export default class ToxicBox extends GameObject {

    damage = 0.1 ;

    constructor(){

        const rectSize = 50 ;

        const img = new Image() ;
        img.src = sprite_main ;

        super({
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true , 
            rigidBody:false ,
            kind:'toxic_box' ,
            // imageSrc_main ,
            sprite:new Sprite(img , {width:1000 , height:1000} , {x:0 , y:0}) ,
        });
    }
}