
export class Movement {

    private delta:{x:number , y:number} ;
    // private impulse:{x:number , y:number} ;

    updateDelta ({order}:{order:{up:boolean , down:boolean , left:boolean , right:boolean}}) {

        const IMPULSE = 2.5 ;
        
        const impulse = {

            x:(order.right ? IMPULSE : 0) + (order.left ? -IMPULSE : 0) ,
            y:(order.down ? IMPULSE : 0) + (order.up ? -IMPULSE : 0) ,
        }

        this.delta.x = impulse.x ;
        this.delta.y = impulse.y ;

    }

    getDelta () {
        return { ...this.delta }
    }

    resetDelta () {
        this.delta.x = 0 ;
        this.delta.y = 0 ;
    }

    constructor () {
        this.delta = {x:0 , y:0} ;
        // this.impulse = {x:0 , y:0} ;
    }
}