
export class Movement {

    private velocity:{x:number , y:number} ;
    // private impulse:{x:number , y:number} ;
    private momentOfInnertia:{x:number , y:number} ;


    updateVelocity ({order}:{order:{up:boolean , down:boolean , left:boolean , right:boolean}}) {

        const IMPULSE = 2.5 ;
        const COUNTERfORCE = 0.1 ;
        
        const the_impulse = {

            x:(order.right ? IMPULSE : 0) + (order.left ? -IMPULSE : 0) ,
            y:(order.down ? IMPULSE : 0) + (order.up ? -IMPULSE : 0) ,
        }

        this.momentOfInnertia.x = (the_impulse.x + this.momentOfInnertia.x) / 2 ; //* ((this.momentOfInnertia.x * 0.1 + the_impulse.x) / 2)  ;
        this.momentOfInnertia.y = (the_impulse.y + this.momentOfInnertia.y) / 2 ;

        this.velocity.x = this.momentOfInnertia.x ;
        this.velocity.y = this.momentOfInnertia.y ;

    }

    getDelta () {
        return { ...this.velocity }
    }

    resetDelta () {
        this.velocity.x = 0 ;
        this.velocity.y = 0 ;
    }

    constructor () {
        this.velocity = {x:0 , y:0} ;
        // this.impulse = {x:0 , y:0} ;
        this.momentOfInnertia = {x:0 , y:0} ;
    }
}