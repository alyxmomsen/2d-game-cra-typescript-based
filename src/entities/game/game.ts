import { KeyController } from "../../widgets/key-controller/key-controller";
import { GameObject } from "../game-object/game-object";
import { Player } from "../player/player";

export class Game {

    private ctx:CanvasRenderingContext2D ;
    private player:GameObject ;
    private keyController:KeyController ;

    update () {
        // this.player
        this.player.update([...this.keyController.getKeys()]);

        // console.log(this.keyController.getKeys().toString());
    }
    
    render () {
        
        this.renderViewPort('#222');

        /* rendering the player */

        if(this.player.getIsInGame()) {

            const position = this.player.getPosition();

            this.renderRect(position.x , position.y , 50 , 20 , 'red');
        }

        /* --------------------------- */

        // this.renderRect();

    }
    
    private renderViewPort (backgroundcolor:string) {
        
        const vw = 800 ;
        const vh = 600 ;
    
        this.ctx.fillStyle = backgroundcolor ;
        this.ctx.fillRect(0 , 0 , vw , vh );
    }

    private renderRect (x:number , y:number , width:number , height:number , backgroundcolor:string) {
        this.ctx.fillStyle = backgroundcolor ;
        this.ctx.fillRect(x , y , width , height);
    }

    constructor (ctx:CanvasRenderingContext2D , viewPortDimensions:{vw:number , vh:number}) {
        this.ctx = ctx ;
        this.keyController = new KeyController() ;
        this.player = new Player({isInGame:true});
    }
}