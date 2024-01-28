
export class KeyController {

    private keys:string[] ;

    getKeys () {
        return [...this.keys] 
    }

    constructor () {

        this.keys = [] ;

        window.onkeydown = (e) => {
            
            const key = e.key ;

            if(!this.keys.includes(key)) {
                this.keys.push(key) ;
            }
        }

        window.onkeyup = (e) => {
           
            const key = e.key ;
            
            if(this.keys.includes(key)) {
                const index = this.keys.indexOf(key);
                this.keys.splice(index , 1);
            }
        }
    }
}