import { randomPosition } from "../../shared/halpers/randomPosition";
import { GameObject } from "../game-object/game-object";

export class Enemy extends GameObject {
    
    constructor() {
        super({
            kind:'enemy' ,
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:50 , height:30} , 
            isInGame:true , 
            rigidBody:true , 
            imageSrc_main:undefined ,
        });
    }
}