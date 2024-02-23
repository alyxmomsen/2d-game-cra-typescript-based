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
        const objectAspectRatio = {x:1 , y:1.8} ;
        const gameobjectSize = 65 ;
        const frameSourceOffset = {x:40 , y:63} ;
        /* ----------------------- */
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:objectAspectRatio.x * gameobjectSize , height:objectAspectRatio.y * gameobjectSize} , 
            rigidBody:true , kind:'player' , 
            spriteManager:new SpriteManager({sprites:[
                new Sprite({
                    image:spriteIGM_run ,
                    /* ----------------------- */ 
                    frameAspectRatio:{x:1 , y:1.8} ,
                    /* -------------------------- */
                    frameSourceSize:44 ,
                    frameSourceOffset:{x:0 , y:0} ,
                    /* ------------------------------------- */
                    frameRenderingSize:85 ,
                    frameRenderingOffset:{x: -10 , y:-2} ,
                    frameSet:[
                        Sprite.makeFrame(128 , 0 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 1 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 2 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 3 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 4 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 5 , frameSourceOffset.x , frameSourceOffset.y) ,
                        Sprite.makeFrame(128 , 6 , frameSourceOffset.x , frameSourceOffset.y) , 
                    ]
                }) , 
                new Sprite({
                    image:spriteIMG_idle , 
                    frameSourceOffset:{x:0 , y:0} ,
                    frameRenderingOffset:{x:0 , y:0} ,
                    frameRenderingSize:85 ,
                    frameAspectRatio:{x:1 , y:2} ,
                    frameSourceSize:46 ,
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