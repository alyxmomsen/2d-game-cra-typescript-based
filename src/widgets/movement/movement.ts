
export class Movement {

    private delta:{x:number , y:number} ;

    updateDelta (keys:string[]) {

        const up = keys.includes('w') ;
        const down = keys.includes('s') ;
        const left = keys.includes('a') ;
        const right = keys.includes('d') ;

        const handler = (axis:'x'|'y' , impulse:boolean) => {
            
            const deltaDelta = 0.01 ;

            if(impulse) {
                
                this.delta[axis] += deltaDelta  ;
            }
            
        }

        handler('x' , right);
        handler('y' , down);

    }

    getDelta () {
        return { ...this.delta }
    }

    constructor () {

        this.delta = {x:0 , y:0} ;
    }
}