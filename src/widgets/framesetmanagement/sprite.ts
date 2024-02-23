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
    private frameSourceAspectRatio:{x:number ,y:number} ;
    private frameSourceSize:number ;
    private frameRenderingDimensions:Dimensions ;
    private currentFrame:Position|null ; 
    private framesTape:FramesTape ;
    private frameRenderingOffset:{x:number , y:number} ;
    static makeFrame (distance:number ,id:number , sourceOffsetX:number , sourceOffsetY:number) {
        return {x:distance * id + sourceOffsetX , y:0 + sourceOffsetY} ;
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
                renderPositionOffset:this.frameRenderingOffset ,
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
            frameRenderingOffset ,
            frameSet ,
            frameRenderingSize ,
            frameSourceOffset ,
            frameAspectRatio , 
            frameSourceSize
        }:
        {
            image:HTMLImageElement , 
            // frameSourceDimensions:Dimensions , 
            frameSourceOffset:{x:number , y:number} ,
            frameRenderingOffset:{x:number , y:number} ,
            frameSet:Position[] , 
            frameRenderingSize:number ,
            frameSourceSize:number , 
            frameAspectRatio:{x:number , y:number} ,
            
        }) {

        this.image = image ;
        /* -------------------------- */
        this.frameSourceAspectRatio = frameAspectRatio ;
        this.frameSourceSize = frameSourceSize ;
        this.frameSourceDimensions = {
            width:this.frameSourceAspectRatio.x * this.frameSourceSize ,
            height:this.frameSourceAspectRatio.y * this.frameSourceSize ,
        } ;

        /* -------------------------- */
        this.currentFrame = {x:0 , y:0} ;
        /* --------------------------- */
        this.framesTape = new FramesTape(frameSet) ;
        /* ------------------------------ */
        this.frameRenderingOffset = frameRenderingOffset ;
        this.frameRenderingDimensions = {
            width:frameRenderingSize * frameAspectRatio.x , 
            height:frameRenderingSize * frameAspectRatio.y , 
        } ;
    }
}