import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import SpriteManager from "../../widgets/framesetmanagement/sprite-manager";
import { GameObject } from "../game-object/game-object";

// import sprite_main from "./../../toxic-box.png"
import sprite_flames from './../../sprites/flames/flame1/images/Sek_00001.png' ;

export default class ToxicBox extends GameObject {

    damage = 0.1 ;

    constructor(){

        const rectSize = 50 ;

        const spriteImg_theBucket = new Image() ;
        spriteImg_theBucket.src = sprite_flames ;

        const frameSrcSize = 600 ;
        const frameDistance = 690 ;
        const offsetY = 804 * 5 + 200 ;
        const offsetX = 0 ;
        super({
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true , 
            rigidBody:false ,
            kind:'toxic_box' ,
            spriteManager:new SpriteManager() ,
            sprites:[new Sprite({
                image:spriteImg_theBucket , 
                frameSourceDimensions:{width:1 * frameSrcSize , height:1.5 * frameSrcSize} , 
                frameRenderingDimensions:{width:1 * 50 , height:2 * 50} ,
                framePositionDistance:{byX:0 , byY:0} , 
                framRelativePosition:{x:0 , y:0} ,
                frameSet:[
                    Sprite.makeFrame(frameDistance , 0 , offsetX , offsetY) ,
                    Sprite.makeFrame(frameDistance , 1 , offsetX , offsetY) ,
                    Sprite.makeFrame(frameDistance , 2 , offsetX , offsetY) ,
                    Sprite.makeFrame(frameDistance , 3 , offsetX , offsetY) ,
                    Sprite.makeFrame(frameDistance , 4 , offsetX , offsetY) ,
                    Sprite.makeFrame(frameDistance , 5 , offsetX , offsetY) ,
                ]})] ,
        });
    }
}