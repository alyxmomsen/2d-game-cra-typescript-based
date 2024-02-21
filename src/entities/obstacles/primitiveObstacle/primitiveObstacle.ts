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
                frameSourceOffset:{x:0 , y:0} ,
                frameRenderingOffset:{x:0 , y:0} ,
                frameRenderingSize:1 ,
                frameSet:[{x:0 , y:0}] ,
                frameProportions:{x:1 , y:1} ,
                frameSourceSize:50 ,
            })]}) ,
            });
    }
}