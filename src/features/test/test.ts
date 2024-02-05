import { InputController } from "../../widgets/input-controller/input-controller";


export default class Test {

    private impulse:number = 0 ;

    readonly inputController:InputController = new InputController();
    private delta:number = 0 ;
    private position:number =  0 ;


    result() {
        return this.position ;
    }

    update () {

        // const input = this.inputController.getInputedData();

        const impulse = this.inputController.getInputedData().right ? 10 : 0 ;

        this.delta = (impulse / impulse) ;

        this.position = this.position + this.delta ;

    }

    constructor () {

    }

}