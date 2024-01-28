import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
import { KeyController } from "../../widgets/key-controller/key-controller";
import { GameObject } from "../game-object/game-object";
import { Player } from "../player/player";

export class Game {

    private ctx:CanvasRenderingContext2D ;
    private player:GameObject ;
    private keyController:KeyController ;

    /* ---------------------  */

    private roomDamageImpulseGenerator:ImpulseGenerator ; // test

    /* ---------------------- */
    
    update () {

        if(this.roomDamageImpulseGenerator.get()) {
            console.log('impulse');
        }

        /* this.player update */

        this.player.update([...this.keyController.getKeys()]);

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
        this.keyController = new KeyController() ;
        this.player = new Player({isInGame:true}) ;


        /* impulse generator */

        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);

        /* ----------------- */
    }
}