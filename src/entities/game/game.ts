import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
import { KeyHandler } from "../../widgets/key-handler/key-handler";
import { GameObject } from "../game-object/game-object";
import { Player } from "../player/player";

export class Game {

    private ctx:CanvasRenderingContext2D ;
    private player:GameObject ;
    private keyHandler:KeyHandler ;

    /* ---------------------  */

    private roomDamageImpulseGenerator:ImpulseGenerator ; // test

    /* ---------------------- */
    
    update () {

        let isImpulseIs = false ;

        if(this.roomDamageImpulseGenerator.get()) {
            isImpulseIs = true ;
        }

        /* this.player update */
        /* update input controller : get keys , get damage */
        this.player.inputController.update([...this.keyHandler.getKeys()] , isImpulseIs ? 1 : 0) ;
        this.player.update();

    }
    
    render () {
        
        this.renderViewPort('#222');

        /* rendering the player */

        if(this.player.getIsInGame()) {

            const position = this.player.getPosition();

            this.renderRect(position.x , position.y , 50 , 20 , 'red');
        }

        /* --------------------------- */

        this.renderPlayerStats();

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

    private renderPlayerStats () {
        
        const size = 150 ;
        const margin = 9 ;
        const padding = 9 ;
        const linesInterval = 19 ;

        this.renderRect (margin , margin , size , size * 2 , '#6666') ;
        this.ctx.fillStyle = 'whitesmoke' ;
        this.ctx.fillText(`health: ${this.player.getHealth()}` , padding * 2 , padding * 2 * 2 ) ;
    }

    constructor (ctx:CanvasRenderingContext2D , viewPortDimensions:{vw:number , vh:number}) {
        
        this.ctx = ctx ;
        this.keyHandler = new KeyHandler() ;
        this.player = new Player({isInGame:true}) ;


        /* impulse generator */

        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);

        /* ----------------- */
    }
}