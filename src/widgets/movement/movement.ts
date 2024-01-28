
export class Movement {

    private delta:{x:number , y:number} ;

    updateDelta (keys:string[]) {

        const up = keys.includes('w') ;
        const down = keys.includes('s') ;
        const left = keys.includes('a') ;
        const right = keys.includes('d') ;

        const handler = (axis:'x'|'y' , impulse:boolean , inccrementDirection:1|-1) => {
            
            const deltaDelta = 0.05 ;

            if(impulse) {
                
                this.delta[axis] += deltaDelta * inccrementDirection  ;
            }
            
        }

        const handlerIsNoImpulseByAxis = (axis:'x'|'y') => {

            this.delta[axis] = this.delta[axis] / 1.01 ;
            
        }
        
        if(!left && !right) {
            
            handlerIsNoImpulseByAxis('x');
        }
        else {
            
            handler('x' , right , 1);
            handler('x' , left , -1);
            
        }
        
        if(!up && !down) {
            
            handlerIsNoImpulseByAxis('y');
        }
        else {
            
            handler('y' , down , 1);
            handler('y' , up , -1);
            
        }


    }

    getDelta () {
        return { ...this.delta }
    }

    constructor () {

        this.delta = {x:0 , y:0} ;
    }
}