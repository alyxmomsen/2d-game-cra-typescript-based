import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import SpriteManager from "../../widgets/framesetmanagement/sprite-manager";
import { GameObject } from "../game-object/game-object";

import sprite_main from "./../../enemy.png" ;
import sprite_run from "./../../sprites/Musketeer/Run.png" ;

export class Enemy extends GameObject {
    
    constructor() {

        const img = new Image() ;
        img.src = sprite_run ;
        /* ----------------------- */
        const frameRelativePositionX = 29 ;
        const frameRelativePositionY = 55 ;
        const framePositionDistanceByX = 128 ;
        /* ----------------------- */
        const objectProportions = {x:1 , y:1.8} ;
        const frameProportions = {x:1 , y:2} ;
        const gameobjectSize = 65 ;
        const frameSourceSize = 42 ;
        const frameRenderSize = 81 ;
        /* ----------------------- */
        super({
            kind:'enemy' ,
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:objectProportions.x * gameobjectSize , height:objectProportions.y * gameobjectSize} ,
            isInGame:true , 
            rigidBody:true , 
            spriteManager:new SpriteManager({sprites:[new Sprite(
                {image:img , 
                frameSourceDimensions:{width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                frameRenderingDimensions:{width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                frameSourceOffset:{x:0 , y:0} ,
                frameRenderingPositionOffset:{x:0 , y:0} ,
                frameSet:[
                    {x:framePositionDistanceByX * 0 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 1 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 2 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 3 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 4 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 5 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 6 + frameRelativePositionX , y:0 + frameRelativePositionY}
                ]})]}) ,
        });
    }
}