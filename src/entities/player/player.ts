import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

// import sprite_main from './../../player.png' ;
import sprite_run from './../../sprites/Knight/Run.png' ;
import sprite_idle from './../../sprites/Knight/Idle.png' ;

export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {

        const spriteIGM_run = new Image() ;
        spriteIGM_run.src = sprite_run ;
        const spriteIMG_idle = new Image();
        spriteIMG_idle.src = sprite_idle ;
        /* ----------------------- */
        const frameRelativePositionX = 48 ;
        const frameRelativePositionY = 63 ;
        // const framePositionDistanceByX = 128 ;
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
            sprite:[
                new Sprite({
                    image:spriteIGM_run , 
                    frameSourceDimensions: {width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                    frameRenderingDimensions: {width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                    framePositionDistance:{byX:128 , byY:0} ,
                    framRelativePosition:{x:48 , y:63} ,
                    frameSet:[
                        {x:128 * 0 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 1 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 2 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 3 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 4 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 5 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 6 + frameRelativePositionX , y:0 + frameRelativePositionY}
                    ]
                }) , 
                new Sprite({
                    image:spriteIGM_run , 
                    frameSourceDimensions: {width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                    frameRenderingDimensions: {width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                    framePositionDistance:{byX:128 , byY:0} ,
                    framRelativePosition:{x:48 , y:63} ,
                    frameSet:[
                        {x:128 * 0 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 1 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 2 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 3 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 4 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 5 + frameRelativePositionX , y:0 + frameRelativePositionY} , 
                        {x:128 * 6 + frameRelativePositionX , y:0 + frameRelativePositionY}
                    ]
                }) , 
            ]
        });

    }
}

// export Player ;