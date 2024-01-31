import { Dimensions, Position } from "../../shared/types/types";
import { InputController } from "../../widgets/input-controller/input-controller";
import { Movement } from "../../widgets/movement/movement";

export class GameObject {

    private isInGame:boolean ;
    private position:Position ;
    private dimensions:Dimensions ;
    private movement:Movement;

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

        const moveInput = this.inputController.getInputedData() ;
        this.updateHealth();
        this.movement.updateDelta({...moveInput}) ;
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