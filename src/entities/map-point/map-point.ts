import { Position } from "../../shared/types/types";

function calculateDistance(coord1: Position, coord2: Position): number {
    const xDiff = coord2.x - coord1.x;
    const yDiff = coord2.y - coord1.y;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return distance;
}

export class MapPoint {

    isNearest:boolean|undefined ;
    distance:number ;
    position:Position ;

    constructor ({x,y}:{x:number , y:number}) {
        this.position = {x , y} ;
        this.distance = Infinity ;
    }
}

export default class MapPointGrafManager {

    private mapPoints:MapPoint[] ;
    private nearest:MapPoint|null ;

    getPoints () {
        return [...this.mapPoints] ;
    }

    getNearest () {
        return {...this.nearest} ;
    }

    setTestQuery (start:Position , target:Position) {
        // start -5:5
        // 1: -3:5
        // 2: -3:-5 

    }

    findNearestPoint(target: Position): MapPoint | null {
        let nearestPoint: MapPoint | null = null;
        let nearestDistance = Infinity;
      
        for (const point of this.mapPoints) {
            point.isNearest = undefined ;
          const distance = calculateDistance(point.position, target);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPoint = point;
          }
        }

        if(nearestPoint) {
            nearestPoint.isNearest = true ;
            this.nearest = nearestPoint ;
        }
      
        return nearestPoint;
      }

    constructor (count:number) {
        this.nearest = null ;
        this.mapPoints = [] ;
        for (let i=0 ; i<count ; i++) {
            this.mapPoints.push(new MapPoint({x:Math.random() * 666 , y:Math.random() * 666}));
        }
    }

}