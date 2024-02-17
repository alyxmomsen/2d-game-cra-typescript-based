import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from './../../player.png' ;
import sprite_run from './../../Run.png' ;


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {

        const img = new Image() ;
        img.src = sprite_run ;
        /* ----------------------- */
        const frameRelativePositionX = 48 ;
        const frameRelativePositionY = 63 ;
        const framePositionDistanceByX = 128 ;
        /* ----------------------- */
        const objectProportions = {x:1 , y:1.8} ;
        const frameProportions = {x:1 , y:2} ;
        const gameobjectSize = 65 ;
        const frameSourceSize = 36 ;
        const frameRenderSize = 70 ;
        /* ----------------------- */
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:objectProportions.x * gameobjectSize , height:objectProportions.y * gameobjectSize} , 
            rigidBody:true ,kind:'player' , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(
                img , 
                {width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                {width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                [
                    {x:framePositionDistanceByX * 0 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 1 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 2 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 3 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 4 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 5 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                    {x:framePositionDistanceByX * 6 + frameRelativePositionX , y:0 + frameRelativePositionY}
                ]) ,
        });

    }
}

// export Player ;