import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
import { KeyHandler } from "../../widgets/key-handler/key-handler";
import { Enemy } from "../enemy/enemy";
import { GameObject } from "../game-object/game-object";
import { Player } from "../player/player";
import ToxicBox from "../toxic-box/toxic-box";

export class Game {

    private ctx:CanvasRenderingContext2D ;

    private keyHandler:KeyHandler ;
    
    /* play objects */
    
    private player:Player ;
    private enemies:Enemy[] ;
    private toxicBox:ToxicBox[] ;

    /* ============ */

    /* ---------------------  */

    private roomDamageImpulseGenerator:ImpulseGenerator ; // test

    /* ---------------------- */

    checkCollissionWith (object:GameObject , subject:GameObject) {

        if(!object.getIsInGame() || !subject.getIsInGame()) return false 

        const objPos = {...object.getPosition()} ;
        const objDim = {...object.getDimensions()} ;
        const objMovDelta = {...object.movement.getDelta()} ;

        const subjPos = {...subject.getPosition()} ;
        const subjDim = {...subject.getDimensions()} ;

        if(
            (
                (objPos.x + objMovDelta.x < subjPos.x + subjDim.width) && 
                (objPos.x + objMovDelta.x + objDim.width > subjPos.x) && 
                (objPos.y + objMovDelta.y < subjPos.y + subjDim.height) && 
                (objPos.y + objDim.height + objMovDelta.y > subjPos.y)
            )
                
        ) {
            return true ;
        // alert();
        }
        else {
            return false ;
        }

    }
    
    update () {

        let isImpulseIs = false ;

        if(this.roomDamageImpulseGenerator.get()) {

            isImpulseIs = true ;
        }

        for (const object of [this.player , ...this.enemies , ...this.toxicBox]) {

            const isPlayer = object instanceof Player ;

            object.inputController.update({
                keys:[...isPlayer ? this.keyHandler.getKeys() : []] , 
                damage:isImpulseIs ? this.toxicBox.length * 0.1 : 0
            }) ;

            const moveInput = object.inputController.getInputedData() ;
            object.updateHealth();
            object.movement.updateDelta({...moveInput}) ;
            // const movDelta = object.movement.getDelta();

            let isCollision = false ;
            for (const collisionSubject of [this.player , ...this.enemies , ...this.toxicBox]) {

                if(object === collisionSubject) continue ;

                const collision = this.checkCollissionWith(object , collisionSubject) ;

                if(collision) {
                    isCollision = true ;
                }

            }

            if(!isCollision) {
                
                object.update();
            }
            else {
                object.movement.resetDelta();
            }

        }

        // this.player.inputController.update({keys:[...this.keyHandler.getKeys()] , damage:isImpulseIs ? this.toxicBox.length * 0.1 : 0}) ;
        // this.player.update() ;

        
        
        

    }
    
    render () {
        
        this.renderViewPort('#222');

        /* rendering the player */

        for (const box of [...this.toxicBox]) {
            const position = box.getPosition() ;
            const dimensions = box.getDimensions();
            this.renderRect(position.x , position.y , dimensions.width , dimensions.height , '#aaa');
        }

        
        for (const enemy of [...this.enemies]) {
            const position = enemy.getPosition() ;
            const dimensions = enemy.getDimensions();
            this.renderRect(position.x ,position.y , dimensions.width , dimensions.height , 'grey');
        }
        
        if(this.player.getIsInGame()) {

            const position = this.player.getPosition();
            const dimensions = this.player.getDimensions();
            this.renderRect(position.x , position.y , dimensions.width , dimensions.height , 'red');
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
        this.enemies = [new Enemy()] ;
        this.toxicBox = [] ;
        
        for (let i=0 ; i<6 ; i++) {
            this.toxicBox.push(new ToxicBox());
        }
        /* impulse generator */

        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);

        /* ----------------- */
    }
}