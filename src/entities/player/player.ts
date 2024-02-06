import { GameObject } from "../game-object/game-object";


export class Player extends GameObject {

    constructor({isInGame}:{isInGame:boolean}) {
        
        super({isInGame , position:{x:0 , y:0} , dimensions:{width:50 , height:20} , isCollideable:true ,kind:'player'});

    }
}

// export Player ;