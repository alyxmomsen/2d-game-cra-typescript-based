import { randomPosition } from "../../../shared/halpers/randomPosition";
import { GameObject } from "../../game-object/game-object";

export default class PrimitiveObstacle extends GameObject {

    constructor ({isCollideable}:{isCollideable:boolean}) {
        super({
            dimensions:{width:20 , height:20} ,
            rigidBody: isCollideable ,
            isInGame:true ,
            kind:'primitive_obstacle' ,
            position:randomPosition({posX:{min:0 , max:800} , posY:{min:0 , max:800}}) ,
            imageSrc_main:undefined ,
        });
    }
}