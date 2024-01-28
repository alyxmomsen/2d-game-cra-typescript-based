import { GameObject } from "../game-object/game-object";


export class Player extends GameObject {

    constructor() {
        
        super({isInGame:false , position:{x:0 , y:0} , dimensions:{width:50 , height:20}});

    }
}

// export Player ;