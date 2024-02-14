import { GameObject } from "../game-object/game-object";

import sprite_main from './../../player.png' ;


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {
        
        super({
            isInGame , position:{x:0 , y:0} , 
            dimensions:{width:50 , height:20} , 
            rigidBody:true ,kind:'player' , 
            imageSrc_main:sprite_main ,
        });

    }
}

// export Player ;