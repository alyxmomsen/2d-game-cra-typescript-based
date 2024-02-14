import { Dimensions, Position } from "../types/types";


export class Animator {

    frames:Position[] ;
    currentFrameID:number ;

    nextFrame () {

        if(this.currentFrameID + 1 >= this.frames.length) {
            this.currentFrameID = 0 ;
        }
        else {
            this.currentFrameID += 1 ;
        }
    
        return this.frames[this.currentFrameID]
    }

    constructor () {

        this.frames = [] ;
        
        for (let i=0 ; i<100 ;i++) {
            this.frames.push({x:0 + i*6 , y:50});
        }

        this.currentFrameID = 0 ;

    }
}

