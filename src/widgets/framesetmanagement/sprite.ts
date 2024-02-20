// import { runInThisContext } from "vm";
import { Dimensions, Position } from "../../shared/types/types";


class FramesTape {

    private frames:Position[] ;
    private frameID:number|undefined ;

    nextID() {

        if(this.frames.length && this.frameID !== undefined) {

            this.frameID = this.frameID + 1 < this.frames.length ? ++this.frameID : 0 ;
            return this.frames[this.frameID] ;
        }
        else {
            return null ;
        }

    }

    

    constructor (frames:Position[]) {
        this.frames = frames ;

        if(frames.length) {
            this.frameID = 0 ;
        }
        else {
            this.frameID = undefined ;
        }

    }
}

export default class Sprite {

    // private type:'main' = 'main' ;
    private image:HTMLImageElement ;
    private frameSourceDimensions:Dimensions ;
    private frameRenderingDimensions:Dimensions ;
    private currentFrame:Position|null ; 
    private framesTape:FramesTape ;
    private frameSourceOffset:{x:number , y:number} ;
    private frameDestinationOffset:{x:number , y:number} ;
    // private currentFrameSheetID:number|undefined ;
    static makeFrame (distance:number ,id:number , relX:number , relY:number) {
        return {x:distance * id + relX , y:0 + relY} ;
    }

    updateFrameToNextPosition () {

        this.currentFrame = this.framesTape.nextID();
        // console.log(this.currentFrame?.x);

    }

    getCurrentFrame() {

        if(this.currentFrame) {
            return {
                image:this.image ,
                sourcePosition:this.currentFrame ,
                sourceDimensions:this.frameSourceDimensions , 
                renderPositionOffset:this.frameDestinationOffset ,
                renderDimensions:this.frameRenderingDimensions ,
            }
        }
        else {
            return null ;
        }
    }

    constructor (
        {
        image , 
        frameSourceDimensions , 
        frameRenderingDimensions , 
        frameSourceOffset: frameOffset ,
        frameRenderingPositionOffset: frameDestinationOffset ,
        frameSet: framesSet ,
        }:
        {
            image:HTMLImageElement , 
            frameSourceDimensions:Dimensions , 
            frameRenderingDimensions:Dimensions ,
            frameSourceOffset:{x:number , y:number} ,
            frameRenderingPositionOffset:{x:number , y:number} ,
            frameSet:Position[]
        }) {

        this.image = image ;
        this.frameSourceDimensions = frameSourceDimensions ;
        this.currentFrame = {x:0 , y:0} ;
        this.framesTape = new FramesTape(framesSet) ;
        this.frameRenderingDimensions = frameRenderingDimensions ;
        this.frameSourceOffset = frameOffset ;
        this.frameDestinationOffset = {x:0 , y:0} ;
    }
}