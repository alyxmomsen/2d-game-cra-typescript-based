import { randomPosition } from "../../shared/halpers/randomPosition";
import { GameObject } from "../game-object/game-object";

import imageSrc_main from "./../../toxic-box.png"

export default class ToxicBox extends GameObject {

    damage = 0.1 ;

    constructor(){

        const rectSize = 50 ;

        super({
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true , 
            rigidBody:false ,
            kind:'toxic_box' ,
            imageSrc_main ,
        });
    }
}