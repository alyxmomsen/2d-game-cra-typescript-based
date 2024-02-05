import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
import Test from "../../features/test/test";
import { Dimensions, Position } from "../../shared/types/types";
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
    private toxicBoxes:ToxicBox[] ;

    /* ============ */

    /* ---------------------  */

    private roomDamageImpulseGenerator:ImpulseGenerator ; // test

    /* ---------------------- */

    
    update () {
        
        /* compile objects to update */
        const objectsToUpdate = [this.player , ...this.enemies , ...this.toxicBoxes] ;

        const roomDamageValue = this.toxicBoxes.reduce<number>((acc, obj) => acc + obj.damage , 0);
        let roomDamage = this.roomDamageImpulseGenerator.get() ? roomDamageValue : 0 ;
        
        for (const object of objectsToUpdate) {

            const collisions = undefined ;

            this.updateObjectPositionWith({object , subjects:objectsToUpdate.filter(elem => elem !== object)}) ;
            
            /*get damage by room */
            object.updateHealthByValue(-roomDamage);
            
        }

        
    }

    checkObjectCollisionsWith () {
        
    }

    updateObjectPositionWith({object , subjects}:{object:GameObject , subjects:GameObject[]}) {
        const isPlayer = object instanceof Player ;

        object.inputController.update({keys: (isPlayer) ? [...this.keyHandler.getKeys()] : [] , damage:0}) ;
        object.movement.updateDelta({order:{...object.inputController.getInputedData()}});

        let collision = false ;

        if(object.getIsCollideable() === true) {

            for (const collisionSubject of subjects) {

                if(collisionSubject.getIsCollideable() === false) continue ;
                if(object.getIsInGame() === false) continue ;
                if(object === collisionSubject) continue ;

                if(this.checkObjectCollissionWith(
                        {position:object.calculateNextPosition() , dimensions:object.getDimensions()} ,
                        {position:collisionSubject.getPosition() , dimensions:collisionSubject.getDimensions()}
                    )
                ) {

                    collision = true ;

                }
            }
        }

        if(collision === false) {
            object.updatePosititon() ;
        }
        else {

            object.movement.resetDelta();

            console.log('collision');
        }
    }
    
    render () {
        
        this.renderViewPort('#222');
        
        /* rendering the player */
        
        for (const box of [...this.toxicBoxes]) {
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
    
    checkObjectCollissionWith (
        object:{position:Position , dimensions:Dimensions} , 
        subject:{position:Position , dimensions:Dimensions}) {

        if(
            (
                (object.position.x < subject.position.x + subject.dimensions.width) && 
                (object.position.x + object.dimensions.width > subject.position.x) && 
                (object.position.y < subject.position.y + subject.dimensions.height) && 
                (object.position.y + object.dimensions.height > subject.position.y)
            )                
        ) {
            return true ;
        }
        else {
            return false ;
        }
    }

    constructor (ctx:CanvasRenderingContext2D , viewPortDimensions:{vw:number , vh:number}) {
        
        this.ctx = ctx ;
        this.keyHandler = new KeyHandler() ;
        this.player = new Player({isInGame:true}) ;
        this.enemies = [new Enemy()] ;
        this.toxicBoxes = [] ;
        
        for (let i=0 ; i<6 ; i++) {
            this.toxicBoxes.push(new ToxicBox());
        }
        /* impulse generator */
        
        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);
        
        /* ----------------- */
    }
}