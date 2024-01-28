import { Dimensions, Position } from "../../shared/types/types";

export class GameObject {

    private isInGame:boolean ;
    private position:Position ;
    private dimensions:Dimensions ;
    private movement = null ;

    update () {

    }

    render () {

    }

    getIsInGame () {
        return this.isInGame ; 
    }

    getPosition () {
        return {...this.position} ;
    }

    constructor ({isInGame , position , dimensions }:{isInGame:boolean , position:Position , dimensions:Dimensions}) {
        
        this.dimensions = {...dimensions} ;
        this.position = {...position} ;
        this.isInGame = isInGame ;

    }
}