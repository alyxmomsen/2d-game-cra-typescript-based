import { ImpulseGenerator } from "../../features/impulse-generator/impulse-generator";
import { Dimensions, Position } from "../../shared/types/types";
import { KeyHandler } from "../../widgets/key-handler/key-handler";
import { Enemy } from "../enemy/enemy";
import { GameObject } from "../game-object/game-object";
import MapPointGrafManager from "../map-point/map-point";
import { Player } from "../player/player";
import ToxicBox from "../toxic-box/toxic-box";

let lastTick = 0 ;

function simpleTicker () {

    const time = Date.now();
    if(time - lastTick >= 1000) {
        lastTick = time ;
        return true ;
    }
    else {
        return false ;
    }
}

export class Game {

    // private mapPoints:MapPoint[] ;

    private mapPointsManager:MapPointGrafManager ;

    private ctx:CanvasRenderingContext2D ;
    private keyHandler:KeyHandler ;

    private viewPortDimensions ;
    
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

        if(simpleTicker()) {

        }
        const playerPosition = this.player.getPosition() ;
        const playerDimensions = this.player.getDimensions() ;
        const playerCenter = {x:playerPosition.x + playerDimensions.width / 2 , y:playerPosition.y + playerDimensions.height / 2} ; 
        this.mapPointsManager.findNearestPoint(playerCenter);

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
        
        this.renderBackGround('#222');

        /* render boxes */
        for (const box of [...this.toxicBoxes]) {

            if(!box.checkIsAlive()) {
                continue ;
            }
            this.renderGameObject(box);
        }
        
        /* render enemies */
        for (const enemy of [...this.enemies]) {

            if(!enemy.checkIsAlive()) {
                continue ;
            }
            this.renderGameObject(enemy);
        }

        /* --------------------------- */
        // rander map-points
        
        for (const point of this.mapPointsManager.getPoints() ) {
            if(point.isNearest) {
                this.ctx.fillStyle = 'red' ;
            }
            else {
                this.ctx.fillStyle = 'orange' ;
            }
            // this.ctx.fillStyle = 'orange' ;
            this.ctx.fillRect(point.position.x , point.position.y , 10 , 10) ;
        }

        /* --------------------------- */
        // render Player
        if(this.player.getIsInGame()) {

            this.renderGameObject(this.player);

        }
        
        /* --------------------------- */

        this.ctx.lineWidth = 2 ;
        this.ctx.beginPath();
        const playerPosition = this.player.getPosition() ;
        const playerDimensions = this.player.getDimensions() ;
        this.ctx.moveTo(playerPosition.x + playerDimensions.width / 2 , playerPosition.y + playerDimensions.height / 2);
        const nearestPoint = this.mapPointsManager.getNearest();

        if(nearestPoint !== null) {
            const postition = nearestPoint.position ;
            if(postition) {
                
                this.ctx.lineTo(postition.x , postition.y);
                this.ctx.stroke();
            }
        }
        
        this.renderPlayerStats();
        
    }
    
    private renderBackGround (backgroundcolor:string) {
        
        const vw = this.viewPortDimensions.vw ;
        const vh = this.viewPortDimensions.vh ;
        
        this.ctx.fillStyle = backgroundcolor ;
        this.ctx.fillRect(0 , 0 , vw , vh );
    }
    
    private renderRect (x:number , y:number , width:number , height:number , backgroundcolor:string) {
        
        this.ctx.fillStyle = backgroundcolor ;
        // this.ctx.fillRect(x , y , width , height);
        this.ctx.strokeStyle = 'whitesmoke' ;
        this.ctx.strokeRect(x ,y , width , height);

        // this.ctx.
    }

    private renderPlayerStats () {
        
        const size = 150 ;
        const margin = 9 ;
        const padding = 9 ;
        const linesInterval = 19 ;
        
        this.renderRect (margin , margin , size , size * 2 , '#6666') ;
        this.ctx.fillStyle = 'whitesmoke' ;
        this.ctx.font = 'bold 22px Arial' ;
        this.ctx.fillText(`health: ${Math.floor(this.player.getHealth())}` , padding * 2 , padding * 2 * 2  ,) ;
    }

    renderGameObject (subject:GameObject) {

        const position = subject.getPosition() ;
        const dimensions = subject.getDimensions();

        /* sprite */

        subject.spriteManager.update();
        const frame = subject.spriteManager.getFrame();

        
        if(frame !== null) {
            this.ctx.drawImage(
                frame.image ,
                frame.sourcePosition.x ,
                frame.sourcePosition.y ,
                frame.sourceDimensions.width ,
                frame.sourceDimensions.height ,
                position.x + frame.renderPositionOffset.x , 
                position.y + frame.renderPositionOffset.y , 
                frame.renderDimensions.width, 
                frame.renderDimensions.height
            );
        }

        /* collider box the primitive */

        if(subject.colliderBoxVisisbility) {

            this.renderRect(position.x , position.y , dimensions.width , dimensions.height , '#aaa');
        }



        this.ctx.fillStyle = 'whitesmoke' ;
        this.ctx.fillText(`${Math.floor(subject.getHealth())}` , position.x , position.y + 10);

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
        this.viewPortDimensions = viewPortDimensions ;
        this.keyHandler = new KeyHandler() ;
        this.player = new Player({isInGame:true}) ;
        this.enemies = [new Enemy()] ;
        this.toxicBoxes = [] ;
        
        for (let i=0 ; i<10 ; i++) {
            this.toxicBoxes.push(new ToxicBox());
        }

        /* impulse generator */
        
        this.roomDamageImpulseGenerator = new ImpulseGenerator(1000);
        /* --------------------- */
        // map points

        this.mapPointsManager = new MapPointGrafManager (50) ;
        this.mapPointsManager.findNearestPoint(this.player.getPosition());
    }
}

