export class LessThanOperator {
    constructor() {}

    getSymbol() {
        return "<=";
    }

    // eslint-disable-next-line
    drawSetup(container){
        console.log('drawing setup for op <=');
    }

    // eslint-disable-next-line
    drawConfig(container){
        console.log('drawing config for op <=');
    }
}