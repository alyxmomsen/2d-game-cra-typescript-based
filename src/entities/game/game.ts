import { GameObject } from "../game-object/game-object";
import { Player } from "../player/player";

export class Game {

    player:GameObject ;
    ctx:CanvasRenderingContext2D ;

    update () {

        
    }
    
    render () {
        
        const vw = 800 ;
        const vh = 600 ;

        this.ctx.fillStyle = '#666' ;
        this.ctx.fillRect(0 , 0 , vw , vh );
    }

    constructor (ctx:CanvasRenderingContext2D , viewPortDimensions:{vw:number , vh:number}) {
        this.ctx = ctx ;
        this.player = new Player();
        // this.v
    }
}