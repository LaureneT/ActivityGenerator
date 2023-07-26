// Import all operators
import { InOperator } from './InOperator'
import { LessThanOperator } from './LessThanOperator'

export var operators = [
    new InOperator(),
    new LessThanOperator(),
];

export function GetOperatorWithSymbol(symbol){
    var result = null;
    operators.forEach((operator) => {
        if (operator.getSymbol() === symbol){
            result = operator;
        }
    })
    return result;
}