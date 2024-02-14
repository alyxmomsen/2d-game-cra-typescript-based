import { runInThisContext } from "vm";
import { Dimensions, Position } from "../../shared/types/types";


export default class Sprite {

    private type:'main' = 'main' ;
    private image:HTMLImageElement ;
    private stepByX:number = 2 ;
    private stepByY:number = 0 ;
    private frameDimensions:Dimensions ;
    private currentFrame:Position; 
    private firstFramePosition:Position = {x:0 , y:0};


    updateToNextPosition () {
        
        if(this.currentFrame.x + this.stepByX > 200 || this.currentFrame.y + this.stepByY > 200 ) {
            this.currentFrame.x = 0 ;
            this.currentFrame.y = 0 ;
        }
        else {
            this.currentFrame.x += this.stepByX ;
            this.currentFrame.y += this.stepByY ;
        }

        // console.log(this.currentFrame.x);

    }

    getCurrentFrame() {

        // console.log(this.image);

        return {
            image:this.image ,
            position:this.currentFrame ,
            dimensions:this.frameDimensions , 
        }
    }

    constructor (image:HTMLImageElement , frameDimensions:Dimensions , frameStepRate:{x:number , y:number}) {
        this.image = image ;
        this.frameDimensions = frameDimensions ;
        this.stepByX = frameStepRate.x ;
        this.stepByY = frameStepRate.y ;
        // this.firstFramePosition = {x:0 , y:0};
        this.currentFrame = this.firstFramePosition;
        
    }
}