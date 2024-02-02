import { GameObject } from "../game-object/game-object";


export default class ToxicBox extends GameObject {


    constructor(){

        const rectSize = 50 ;

        super({
            position:{
                x:Math.floor(Math.random() * 800) ,
                y:Math.floor(Math.random() * 600)} ,
            dimensions:{width:rectSize , height:rectSize} ,
            isInGame:true
        });
    }
}