import { randomPosition } from "../../../shared/halpers/randomPosition";
import { Dimensions, Position } from "../../../shared/types/types";
import Sprite from "../../../widgets/framesetmanagement/sprite";
import SpriteManager from "../../../widgets/framesetmanagement/sprite-manager";
import { GameObject } from "../../game-object/game-object";

export default class PrimitiveObstacle extends GameObject {

    static aspectRatio: { x: number; y: number; } = {x:4 , y:1};
    static size:number = 50 ;

    constructor ({isCollideable , position }:{isCollideable:boolean , position:Position}) {

        const img = new Image() ;
        img.src = '' ;
        
        super({
            dimensions:{width:PrimitiveObstacle.aspectRatio.x * PrimitiveObstacle.size , height:PrimitiveObstacle.aspectRatio.y * PrimitiveObstacle.size} ,
            rigidBody: isCollideable ,
            isInGame:true ,
            kind:'primitive_obstacle' ,
            position:position ,
            spriteManager:new SpriteManager({
                sprites:[new Sprite({
                image:img , 
                frameSourceOffset:{x:0 , y:0} ,
                frameRenderingOffset:{x:0 , y:0} ,
                frameRenderingSize:1 ,
                frameSet:[{x:0 , y:0}] ,
                frameAspectRatio:{x:1 , y:1} ,
                frameSourceSize:50 ,
            })]}) ,
            });
    }
}