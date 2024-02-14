import { Animator } from "../../shared/halpers/animator";
import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";
import GameObjectParent from "./game-object-getters-setters";

import sprite from "../../image.jpg";

export class GameObject extends GameObjectParent {

    /* tech props */
    /* frame management */
    readonly sprite:HTMLImageElement ;
    readonly animator:Animator ;
    private currentFramePosition:Position ;
    private lastAnimatedTime:number ;
    private frameDimensions:Dimensions ;
    /* end -- frame management */
    private isInGame:boolean ;
    private rigidBody:boolean ;
    readonly movement:Movement;
    private dimensions:Dimensions ;
    private position:Position ;
    readonly kind:string ;
    private margin:number ;
    /* end -- tech props */
    /* play props */
    private isAlive:boolean ;
    private health:number ;
    private armor:number ; // experemental

    /* input controller */

    controller:InputController ;
    
    /* ----------------- */
    
    calculateNextPosition ():Position {

        const position = this.position ;
        const delta = this.movement.getDelta();

        const calculatedPosition = {x:position.x + delta.x , y:position.y + delta.y} ;

        return calculatedPosition ;
    }
    
    updateHealth () {

        const {gettingDamage} = this.controller.getOrders() ;
        this.health -= gettingDamage ;
    }
    
    updatePosititon () {
        
        const delta = this.movement.getDelta();
        this.position.x += delta.x ;
        this.position.y += delta.y ;
    }

    updateHealthByValue (value:number) {
        this.health += value ;
        if(this.health <= 0) {
            this.isAlive = false ;
        }
    }

    killSwitch (to:boolean) {
        this.isAlive = !to ;
    }

    checkIsAlive () {
        return this.isAlive ;
    }

    getIsInGame () {
        return this.isInGame ; 
    }

    getPosition () {
        return {...this.position} ;
    }

    getHealth () {
        return this.health ;
    }

    getDimensions () {
        return {...this.dimensions} ;
    }

    getRigidBody () {
        return this.rigidBody ;
    }

    updateFrame(frameRate:number = 1000/60) {

        const time = Date.now();
        // let nextFrame = {}

        if(time - this.lastAnimatedTime >= frameRate) {

            this.currentFramePosition = this.animator.nextFrame();
            this.lastAnimatedTime = time ;
        }

    }

    getSpriteFrame () {
        return {position:this.currentFramePosition , dim:this.frameDimensions} ;
    }

    constructor (
        {isInGame , position , dimensions , rigidBody , kind }:{
            isInGame:boolean , 
            position:Position , 
            dimensions:Dimensions ,
            rigidBody:boolean ,
            kind:string ,
        }
    ) {
        super();

        this.margin = 50 ;

        this.rigidBody = rigidBody ;
        this.isInGame = isInGame ;
        this.movement = new Movement ();
        this.kind = kind ;
        
        this.isAlive = true ;
        this.position = {...position} ;
        this.dimensions = {...dimensions} ;
        this.health = 100 ;
        this.armor = 100 ;

        this.controller = new InputController () ;

        /* frame manager */
        this.sprite = new Image();
        this.sprite.src = sprite ;
        this.animator = new Animator () ;
        this.currentFramePosition = this.animator.nextFrame() ; // initial frame position
        this.frameDimensions = {width:200 , height:200} ;
        this.lastAnimatedTime = 0 ;
    }
}