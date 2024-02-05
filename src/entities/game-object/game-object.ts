import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";
import GameObjectParent from "./game-object-getters-setters";

export class GameObject extends GameObjectParent {

    private isInGame:boolean ;
    private isCollideable:boolean ;
    private position:Position ;
    private dimensions:Dimensions ;
    readonly movement:Movement;

    /* stats */

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

    getIsCollideable () {
        return this.isCollideable ;
    }

    constructor (
        {isInGame , position , dimensions , isCollideable }:{
            isInGame:boolean , 
            position:Position , 
            dimensions:Dimensions ,
            isCollideable:boolean ,
        }
    ) {
        super();
        this.isCollideable = isCollideable ;
        this.isInGame = isInGame ;
        this.movement = new Movement ();
        
        /* stats */
        
        this.position = {...position} ;
        this.dimensions = {...dimensions} ;
        this.health = 100 ;
        this.armor = 100 ;

        /* ------ */

        this.inputController = new InputController () ;
    }
}