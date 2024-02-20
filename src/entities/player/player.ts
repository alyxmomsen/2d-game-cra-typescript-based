import Sprite from "../../widgets/framesetmanagement/sprite";
import { GameObject } from "../game-object/game-object";

// import sprite_main from './../../player.png' ;
import sprite_run from './../../sprites/Knight/Run.png' ;
import sprite_idle from './../../sprites/Knight/Idle.png' ;
import SpriteManager from "../../widgets/framesetmanagement/sprite-manager";

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
        const frameSourceSize = 46 ;
        const frameRenderSize = 85 ;
        /* ----------------------- */
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:objectProportions.x * gameobjectSize , height:objectProportions.y * gameobjectSize} , 
            rigidBody:true , kind:'player' , 
            spriteManager:new SpriteManager({sprites:[
                new Sprite({
                    image:spriteIGM_run , 
                    frameSourceDimensions: {width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                    frameRenderingDimensions: {width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                    frameSourceOffset:{x:0 , y:0} ,
                    frameRenderingPositionOffset:{x: -28 , y:0} ,
                    frameSet:[
                        Sprite.makeFrame(128 , 0 , 48 , 63) ,
                        Sprite.makeFrame(128 , 1 , 48 , 63) ,
                        Sprite.makeFrame(128 , 2 , 48 , 63) ,
                        Sprite.makeFrame(128 , 3 , 48 , 63) ,
                        Sprite.makeFrame(128 , 4 , 48 , 63) ,
                        Sprite.makeFrame(128 , 5 , 48 , 63) ,
                        Sprite.makeFrame(128 , 6 , 48 , 63) , 
                    ]
                }) , 
                new Sprite({
                    image:spriteIMG_idle , 
                    frameSourceDimensions: {width:frameProportions.x * frameSourceSize , height:frameProportions.y * frameSourceSize} , 
                    frameRenderingDimensions: {width:frameProportions.x * frameRenderSize , height:frameProportions.y * frameRenderSize} ,
                    // framePositionDistance:{byX:128 , byY:0} ,
                    frameSourceOffset:{x:0 , y:0} ,
                    frameRenderingPositionOffset:{x:0 , y:0} ,
                    // framRelativePosition:{x:48 , y:63} ,
                    frameSet:[
                        Sprite.makeFrame(128 , 0 , 29 , 60) ,
                        Sprite.makeFrame(128 , 1 , 29 , 60) ,
                        Sprite.makeFrame(128 , 2 , 29 , 60) ,
                        Sprite.makeFrame(128 , 3 , 29 , 60) ,
                        Sprite.makeFrame(128 , 4 , 29 , 60) ,
                        Sprite.makeFrame(128 , 5 , 29 , 60) ,
                    ]
                }) , 
            ]}) ,
        });
    }
}

// export Player ;