import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from './../../player.png' ;
import sprite_run from './../../Run.png' ;


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {

        const img = new Image() ;
        img.src = sprite_run ;
        /* ----------------------- */
        const relativePositionX = 32 ;
        const relativePositionY = 64 ;
        const framePositionDistanceByX = 128 ;
        /* ----------------------- */
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:50 , height:50} , 
            rigidBody:true ,kind:'player' , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(img , {width:64 , height:64} , 
                [
                    {x:framePositionDistanceByX * 0 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 1 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 2 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 3 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 4 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 5 + relativePositionX , y:0 + relativePositionY} , 
                    {x:framePositionDistanceByX * 6 + relativePositionX , y:0 + relativePositionY}
                ]) ,
        });

    }
}

// export Player ;