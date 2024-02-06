import { GameObject } from "../game-object/game-object";

export class Enemy extends GameObject {
    
    constructor() {
        super({kind:'enemy' ,position:{x:100 , y:110} ,dimensions:{width:50 , height:30} , isInGame:true , isCollideable:true});
    }
}