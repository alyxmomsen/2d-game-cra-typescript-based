import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";
import GameObjectParent from "./game-object-getters-setters";

export class GameObject extends GameObjectParent {

    /* tech stats */
    private isInGame:boolean ;
    private rigidBody:boolean ;
    readonly movement:Movement;
    private dimensions:Dimensions ;
    private position:Position ;
    readonly kind:string ;
    private margin:number ;
    /* play stats */
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
    }
}