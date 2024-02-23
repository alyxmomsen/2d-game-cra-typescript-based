import { Dimensions, Position } from "../types/types";

export default function isCollision (positionA:Position , dimensionsA:Dimensions , positionB:Position , dimensionsB:Dimensions ) {

    if(
        (positionA.x + dimensionsA.width >= positionB.x) && 
        (positionA.x <= positionB.x + dimensionsB.width) && 
        (positionA.y + dimensionsA.height >= positionB.y) && 
        (positionA.y <= positionB.y + dimensionsB.height)
    ) {
        return true ;
    }
    else {
        return false ;
    }
}