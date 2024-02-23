import chanceGenerator from "../../shared/halpers/chance-generator";
import { Position } from "../../shared/types/types";

function calculateDistance(coord1: Position, coord2: Position): number {
    const xDiff = coord2.x - coord1.x;
    const yDiff = coord2.y - coord1.y;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return distance;
}

export class MapPoint {

   private heuristic:number ;
    private isNearest:boolean|undefined ;
    private distance:number ;
    private position:Position ;
    /* ------------------------ */
    private relations:MapPoint[] ;
    /* ------------------------ */

    getPosition() {
        return {...this.position} ;
    }

    getRelations () {
        return this.relations ;
    }

    isThisNearest() {
        return this.isNearest ;
    }

    addRelation (point:MapPoint) {
        this.relations.push(point);
    }

    constructor ({x,y}:{x:number , y:number}) {
        this.relations = [] ;
        this.position = {x , y} ;
        this.distance = Infinity ;
        this.heuristic = Infinity ;
    }
}

export default class MapPointGrafManager {

    private mapPoints:MapPoint[] ;
    private optimalPoint:MapPoint|null ;

    private openList:MapPoint[] ;
    private closedList:MapPoint[] ;


    getPoints () {
        return [...this.mapPoints] ;
    }

    getNearest () {
        return this.optimalPoint ;
    }

    findNearestPoint(startPoint: Position , targetPoint:Position): MapPoint | null {

        let optimalPoint: MapPoint | null = null;
        
        let nearestDistance = Infinity;
      
        this.openList.forEach((point , index , arr) => {

            const distance1 = calculateDistance(point.getPosition() , startPoint) ;
            const distance2 = calculateDistance(targetPoint , point.getPosition()) ;

            const summDistance = distance1 + distance2 ;

            if(summDistance < nearestDistance) {
                nearestDistance = summDistance ;
                optimalPoint = point ;
                this.optimalPoint = optimalPoint ;
            }
        }) ;
      
        return optimalPoint;
    }

    constructor (count:number) {
        this.optimalPoint = null ;
        this.mapPoints = [] ;
        let positive:number = 0 ;
        let negative:number = 0 ;
        /* --------------------------------- */
        const closedList:MapPoint[] = [] ;
        const openList:MapPoint[] = [] ;
        /* ------------------------------ */
        // creating the graf
        let lastCreatedPoint:MapPoint|null = null ;
        for (let i=0 ; i<count ; i++) {

            // const posLimits = {x:666 , y:666} ;
            const min = {x:0 , y:0} ;
            const max = {x:666 , y:666} ;

            if(lastCreatedPoint) {
                const lastPos = lastCreatedPoint.getPosition();
                max.x = lastPos.x + 200 ;
                min.x = lastPos.x - 200 ;
                max.y = lastPos.y + 200 ;
                min.y = lastPos.y - 200 ;
            }
            
            const newPoint = new MapPoint({x:Math.random() * (max.x - min.x) + min.x , y:Math.random() * (max.y - min.y) + min.y}) ;
            if(lastCreatedPoint === null) {

                lastCreatedPoint = newPoint ;
            }
            else {
                
                lastCreatedPoint.addRelation(newPoint);
                newPoint.addRelation(lastCreatedPoint);

                if(!chanceGenerator(50 , 100000)) {

                    lastCreatedPoint = newPoint ;
                }
                else {
                    openList.push(newPoint) ;
                }
            }
            
            
            
            this.mapPoints.push(newPoint);
        }
        // console.log(`positive: ${positive} | negative: ${negative}`) ;
        console.log(this.mapPoints);
        /* ------------------------------ */
        this.openList = this.mapPoints ;
        this.closedList = [] ;
    }

}