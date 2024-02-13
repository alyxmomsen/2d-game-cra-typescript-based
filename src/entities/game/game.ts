import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
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
        const objectsToUpdate = [this.player  , ...this.enemies, ...this.toxicBoxes] ;

        /* calculate a damage of the room */
        const toxicBoxesGivesDamageSumm = this.toxicBoxes.reduce<number>((acc, obj) => {
            return acc + (obj.checkIsAlive() ? obj.damage : 0) 
        } , 0) ;

        let toxicBoxDamage = this.roomDamageImpulseGenerator.get() ? toxicBoxesGivesDamageSumm : 0 ;
        
        for (const subject of objectsToUpdate) {

            const isPlayer = subject instanceof Player ;
            /* -------------------------------------- */
            /* get damage from toxic boxes */
            subject.updateHealthByValue(isPlayer ? -toxicBoxDamage : 0); // get damage and isAlive
            
            /* get input orders */
            subject.controller.input({keys: (isPlayer) ? [...this.keyHandler.getKeys()] : [] , damage:0}) ;
            /* update position delta */
            subject.movement.updateVelocity({order:{...subject.controller.getOrders()}});

            /* get collided GameObjects with the subj */
            const collisionaires = this.checkSubjectCollisionsWith(subject , objectsToUpdate) ;

            if(collisionaires.length) {
                
                /* temp */
                let isSomeOneIsRigid = false ;
                /* ---- */

                for (const collisionaire of collisionaires) {
                    // console.log(collisionaire.kind);

                    /* handle collision */

                    if(subject.kind === 'player' && collisionaire.kind === 'toxic_box') {
                        
                        collisionaire.updateHealthByValue(-1);
                        // console.log('toxic-box');
                        // collisionaire.killSwitch(true) ;
                        
                    }

                    /* ---------------- */


                    /* temp */
                    if(collisionaire.getRigidBody()) {
                        isSomeOneIsRigid = true ;
                    }
                    /* ---- */
                }

                /* temp */
                if(!isSomeOneIsRigid) {

                    subject.updatePosititon();
                }
                /* ----- */

            }
            else {

                subject.updatePosititon();
            }
            
            
            
        }

        
    }

    checkSubjectCollisionsWith (subject:GameObject , objects:GameObject[]):GameObject[] {

        let collisions:GameObject[] = [] ;

        for (const object of objects) {

            // if(object.getRigidBody() === false) continue ;
            // if(object.getIsInGame() === false) continue ;
            if(!object.checkIsAlive()) continue ;
            if(subject === object) {
                // alert(); 
                continue ;
            }
            // alert();
            if(this.isCollission(
                    {position:subject.calculateNextPosition() , dimensions:subject.getDimensions()} ,
                    {position:object.getPosition() , dimensions:object.getDimensions()}
                )
            ) {
                // alert();
                collisions.push(object)
            }
        }

        return collisions ;

    }
    
    render () {
        
        this.renderViewPort('#222');
        
        /* rendering the player */
        
        for (const box of [...this.toxicBoxes]) {

            if(!box.checkIsAlive()) {
                continue ;
            }

            const position = box.getPosition() ;
            const dimensions = box.getDimensions();
            this.renderRect(position.x , position.y , dimensions.width , dimensions.height , '#aaa');
            this.ctx.fillStyle = 'white' ;
            this.ctx.fillText(`${box.getHealth()}` , position.x , position.y + 10);
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
        this.ctx.fillText(`health: ${Math.floor(this.player.getHealth())}` , padding * 2 , padding * 2 * 2 ) ;
    }
    
    isCollission (
        subject:{position:Position , dimensions:Dimensions} , 
        object:{position:Position , dimensions:Dimensions}) {

        if(
            (
                (subject.position.x < object.position.x + object.dimensions.width) && 
                (subject.position.x + subject.dimensions.width > object.position.x) && 
                (subject.position.y < object.position.y + object.dimensions.height) && 
                (subject.position.y + subject.dimensions.height > object.position.y)
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
        
        for (let i=0 ; i<10 ; i++) {
            this.toxicBoxes.push(new ToxicBox());
        }
        /* impulse generator */
        
        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);
        
        /* ----------------- */
    }
}