import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import SpriteManager from "../../widgets/framesetmanagement/sprite-manager";
import { GameObject } from "../game-object/game-object";

import sprite_main from "./../../toxic-box.png"
// import sprite_flames from './../../sprites/flames/flame1/images/Sek_00001.png' ;

export default class ToxicBox extends GameObject {

    damage = 0.1 ;

    constructor(){

        const rectSize = 50 ;

        const spriteImg_theBucket = new Image() ;
        spriteImg_theBucket.src = sprite_main ;

        const frameSrcSize = 600 ;
        const frameDistance = 690 ;
        const offsetY = 0 ;
        const offsetX = 0 ;
        super({
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true , 
            rigidBody:false ,
            kind:'toxic_box' ,
            spriteManager:new SpriteManager({sprites:[
                new Sprite({
                    image:spriteImg_theBucket , 
                    frameSourceOffset:{x:0 , y:0} ,
                    frameRenderingOffset:{x:0 , y:0} ,
                    frameRenderingSize:50 ,
                    frameSet:[Sprite.makeFrame(frameDistance , 0 , offsetX , offsetY) ,] , 
                    frameProportions:{x:1 ,y:1} ,
                    frameSourceSize:1000 , 
                }) ,
            ]}) ,
        });
    }
}