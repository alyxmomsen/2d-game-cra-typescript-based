




export class InputController {

    private move: { up: boolean; right: boolean; down: boolean; left: boolean; };
    private attack:boolean ;
    private gettingDamage:number ;

    getInput() {

        const {up , down , left , right } = this.move ;
        return {up , down , left , right , gettingDamage:this.gettingDamage} ;
    }

    update ({keys , damage}:{keys:string[] , damage:number}) {

        this.move.up = keys.includes('w');
        this.move.right = keys.includes('d');
        this.move.down = keys.includes('s');
        this.move.left = keys.includes('a');
        /* ---------------------------- */ 
        this.attack = keys.includes('Enter');
        this.gettingDamage = damage ;
    }

    constructor () {
        this.move = {
            up:false ,
            right:false , 
            down:false ,
            left:false ,
        }

        this.attack = false ;
        this.gettingDamage = 0 ;
    }
}