import { randomPosition } from "../../../shared/halpers/randomPosition";
import Sprite from "../../../widgets/framesetmanagement/sprite";
import { GameObject } from "../../game-object/game-object";

export default class PrimitiveObstacle extends GameObject {

    constructor ({isCollideable}:{isCollideable:boolean}) {

        const img = new Image() ;
        img.src = '' ;
        
        super({
            dimensions:{width:20 , height:20} ,
            rigidBody: isCollideable ,
            isInGame:true ,
            kind:'primitive_obstacle' ,
            position:randomPosition({posX:{min:0 , max:800} , posY:{min:0 , max:800}}) ,
            // imageSrc_main:undefined ,
            sprite:[new Sprite({
                image:img , 
                frameSourceDimensions:{width:800 , height:800}, 
                frameRenderingDimensions:{width:1 * 35 , height:2 * 35} ,
                framePositionDistance:{byX:0 , byY:0} , 
                framRelativePosition:{x:0 , y:0} ,
                frameSet:[{x:0 , y:0}]} )] ,
        });
    }
}