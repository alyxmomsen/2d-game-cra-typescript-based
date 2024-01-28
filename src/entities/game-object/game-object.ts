import { Dimensions, Position } from "../../shared/types/types";

export class GameObject {

    isInGame:boolean ;
    position:Position ;
    dimensions:Dimensions ;

    movement = null ;

    update () {

    }

    render () {

    }

    constructor ({isInGame , position , dimensions }:{isInGame:boolean , position:Position , dimensions:Dimensions}) {
        
        this.dimensions = {...dimensions} ;
        this.position = {...position} ;
        this.isInGame = isInGame ;

    }
}