


interface Move {
    move:{
        up:boolean ;
        right:boolean ;
        down:boolean ;
        left:boolean ;
    }
}

export class InputController implements Move {

    move: { up: boolean; right: boolean; down: boolean; left: boolean; };
    attack:boolean ;

    update (keys:string[]) {

        this.move.up = keys.includes('w');
        this.move.right = keys.includes('d');
        this.move.down = keys.includes('s');
        this.move.left = keys.includes('a');
        /* ---------------------------- */ 
        this.attack = keys.includes('Enter');
    }

    constructor () {
        this.move = {
            up:false ,
            right:false , 
            down:false ,
            left:false ,
        }

        this.attack = false ;
    }
}