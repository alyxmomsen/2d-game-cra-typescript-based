import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";
import GameObjectParent from "./game-object-getters-setters";

export class GameObject extends GameObjectParent {

    private isInGame:boolean ;
    private rigidBody:boolean ;
    readonly movement:Movement;
    private dimensions:Dimensions ;
    private position:Position ;
    readonly kind:string ;
    /* stats */
    private isAlive:boolean ;
    private health:number ;
    private armor:number ; // experemental

    /*  */

    /* input controller */

    inputController:InputController ;
    
    /* ----------------- */
    
    calculateNextPosition ():Position {

        const position = this.position ;
        const delta = this.movement.getDelta();

        const calculatedPosition = {x:position.x + delta.x , y:position.y + delta.y} ;

        return calculatedPosition ;
    }
    
    updateHealth () {

        const {gettingDamage} = this.inputController.getInputedData() ;
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
        {isInGame , position , dimensions , isCollideable , kind }:{
            isInGame:boolean , 
            position:Position , 
            dimensions:Dimensions ,
            isCollideable:boolean ,
            kind:string ,
        }
    ) {
        super();
        this.rigidBody = isCollideable ;
        this.isInGame = isInGame ;
        this.movement = new Movement ();
        this.kind = kind ;
        
        /* stats */
        this.isAlive = true ;
        this.position = {...position} ;
        this.dimensions = {...dimensions} ;
        this.health = 100 ;
        this.armor = 100 ;

        /* ------ */

        this.inputController = new InputController () ;
    }
}