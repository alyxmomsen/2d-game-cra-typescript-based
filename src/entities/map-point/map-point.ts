import { Position } from "../../shared/types/types";

function calculateDistance(coord1: Position, coord2: Position): number {
    const xDiff = coord2.x - coord1.x;
    const yDiff = coord2.y - coord1.y;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return distance;
}

export class MapPoint {

    heuristic:number ;
    isNearest:boolean|undefined ;
    distance:number ;
    position:Position ;

    constructor ({x,y}:{x:number , y:number}) {
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
        return {...this.optimalPoint} ;
    }

    findNearestPoint(startPoint: Position , targetPoint:Position): MapPoint | null {

        let optimalPoint: MapPoint | null = null;
        
        let nearestDistance = Infinity;
      
        this.openList.forEach((point , index , arr) => {
            // point.isNearest = undefined ;
            const distance1 = calculateDistance(point.position , startPoint) ;
            const distance2 = calculateDistance(targetPoint , point.position) ;

            const summDistance = distance1 + distance2 ;


            if(summDistance < nearestDistance) {
                nearestDistance = summDistance ;
                optimalPoint = point ;
                // nearestPoint.isNearest = true ;
                this.optimalPoint = optimalPoint ;
            }
        }) ;
      
        return optimalPoint;
    }

    constructor (count:number) {
        this.optimalPoint = null ;
        this.mapPoints = [] ;
        for (let i=0 ; i<count ; i++) {
            this.mapPoints.push(new MapPoint({x:Math.random() * 666 , y:Math.random() * 666}));
        }
        this.openList = this.mapPoints ;
        this.closedList = [] ;
    }

}