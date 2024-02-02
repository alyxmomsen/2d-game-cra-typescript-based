import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";
import GameObjectParent from "./game-object-getters-setters";

export class GameObject extends GameObjectParent {

    private isInGame:boolean ;
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

    updateHealth () {
        const {gettingDamage} = this.inputController.getInputedData() ;
        this.health -= gettingDamage ;
    }

    update () {

        
        this.updatePosititon() ;
    }

    render () {

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

    // private updateMovement () {
        
    // }

    private updatePosititon () {

        const delta = this.movement.getDelta();

        this.position.x += delta.x ;
        this.position.y += delta.y ;

    }

    updateHealthByValue (value:number) {
        this.health += value ;
    }

    // getDelta () {
    //     this.movement
    // }

    constructor ({isInGame , position , dimensions }:{isInGame:boolean , position:Position , dimensions:Dimensions}) {
        super();
        this.dimensions = {...dimensions} ;
        this.position = {...position} ;
        this.isInGame = isInGame ;
        this.movement = new Movement ();

        /* stats */

        this.health = 100 ;
        this.armor = 100 ;

        /* ------ */

        this.inputController = new InputController () ;
    }
}