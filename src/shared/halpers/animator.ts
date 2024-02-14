import { Dimensions, Position } from "../types/types";


export class Animator {

    position:Position[] ;
    currentFramePositionID:number ;

    nextFrame () {

        if(this.currentFramePositionID + 1 >= this.position.length) {
            this.currentFramePositionID = 0 ;
        }
        else {
            this.currentFramePositionID += 1 ;
        }
    
        return this.position[this.currentFramePositionID]
    }

    constructor () {

        this.position = [] ;
        
        for (let i=0 ; i<100 ;i++) {
            this.position.push({x:0 + i*6 , y:50});
        }

        this.currentFramePositionID = 0 ;

    }
}

