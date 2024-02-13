import { randomPosition } from "../../shared/halpers/randomPosition";
import { GameObject } from "../game-object/game-object";


export default class ToxicBox extends GameObject {

    damage = 0.1 ;

    constructor(){

        const rectSize = 50 ;

        super({
            position:randomPosition({posX:{min:200 , max:400} , posY:{min:200 , max:400}}) ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true , 
            rigidBody:false ,
            kind:'toxic_box' ,
        });
    }
}