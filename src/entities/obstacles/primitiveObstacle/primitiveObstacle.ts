import { randomPosition } from "../../../shared/halpers/randomPosition";
import Sprite from "../../../widgets/framesetmanagement/sprite";
import SpriteManager from "../../../widgets/framesetmanagement/sprite-manager";
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
            spriteManager:new SpriteManager({
                sprites:[new Sprite({
                image:img , 
                frameSourceDimensions:{width:50 , height:50}, 
                frameRenderingDimensions:{width:1 * 35 , height:2 * 35} ,
                frameSourceOffset:{x:0 , y:0} ,
                frameRenderingPositionOffset:{x:0 , y:0} ,
                frameSet:[{x:0 , y:0}] ,
            })]}) ,
            });
    }
}