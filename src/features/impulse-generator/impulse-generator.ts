
export class ImpulseGenerator {

    private lastImpulse:number ;
    private interval:number ; 

    get () {

        const now = Date.now();

        if(now - this.lastImpulse >= this.interval) {
            this.lastImpulse = now ;
            return true ;
        }
        else {
            return false ;
        }
    }

    constructor (interval:number) {
        this.lastImpulse = 0 ;
        this.interval = interval ;
    }
}