import { runInThisContext } from "vm";
import { Dimensions, Position } from "../../shared/types/types";


class FrameSheet {

    private frames:Position[] ;
    private frameID:number|undefined ;

    next() {

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

    private type:'main' = 'main' ;
    private image:HTMLImageElement ;

    private frameSourceDimensions:Dimensions ;
    private frameRenderingDimensions:Dimensions ;
    private currentFrame:Position|null; 

    private frameSheet:FrameSheet ;
    private currentFrameSheetID:number|undefined ;

    updateToNextPosition () {

        this.currentFrame = this.frameSheet.next();
        // console.log(this.currentFrame?.x);

    }

    getCurrentFrame() {

        if(this.currentFrame) {

            return {
                image:this.image ,
                position:this.currentFrame ,
                dimensions:this.frameSourceDimensions , 
                renderDimensions:this.frameRenderingDimensions ,
            }
        }
        else {
            return null ;
        }

    }

    constructor (image:HTMLImageElement , frameSourceDimensions:Dimensions , frameRenderingDimensions:Dimensions , frameSet:Position[]) {
        this.image = image ;
        this.frameSourceDimensions = frameSourceDimensions ;
        this.currentFrame = {x:0 , y:0} ;
        this.frameSheet = new FrameSheet(frameSet) ;
        this.frameRenderingDimensions = frameRenderingDimensions ;

    }
}