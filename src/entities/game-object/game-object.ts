import { Dimensions, Position } from "../../shared/types/types";
import { Movement } from "../../widgets/movement/movement";

export class GameObject {

    private isInGame:boolean ;
    private position:Position ;
    private dimensions:Dimensions ;
    private movement:Movement;

    update (keys:string[]) {
        this.movement.updateDelta(keys);
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

    // private updateMovement () {
        
    // }

    private updatePosititon () {

        const delta = this.movement.getDelta();

        this.position.x += delta.x ;
        this.position.y += delta.y ;

    }

    // getDelta () {
    //     this.movement
    // }

    constructor ({isInGame , position , dimensions }:{isInGame:boolean , position:Position , dimensions:Dimensions}) {
        
        this.dimensions = {...dimensions} ;
        this.position = {...position} ;
        this.isInGame = isInGame ;
        this.movement = new Movement ();

    }
}