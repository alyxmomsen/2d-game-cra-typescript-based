import { randomPosition } from "../../shared/halpers/randomPosition";
import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

import sprite_main from "./../../enemy.png" ;
import sprite_run from "./../../../sprites/Knight/Run.png" ;

export class Enemy extends GameObject {
    
    constructor() {

        const img = new Image() ;
        img.src = sprite_run ;
        /* ----------------------- */
        const relativePositionX = 32 ;
        const relativePositionY = 64 ;
        const framePositionDistanceByX = 128 ;
        /* ----------------------- */
        super({
            kind:'enemy' ,
            position:randomPosition({posX:{min:0 , max:600} , posY:{min:0 , max:600}}) ,
            dimensions:{width:50 , height:30} , 
            isInGame:true , 
            rigidBody:true , 
            // imageSrc_main:sprite_main ,
            sprite:new Sprite(img , {width:1200 , height:1450} , [
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