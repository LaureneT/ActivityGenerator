// Import all operators
import { InOperator } from './InOperator'
import { LessThanOperator } from './LessThanOperator'

export var operators = [
    new InOperator(),
    new LessThanOperator(),
];

export function DrawOperatorWithSymbol(symbol, container){
    resetInput(container); // should be in constraintform.vue
    currentOperator = GetOperatorWithSymbol(symbol); // check if yen a quun
    currentOperator.drawInAddConstraint(container);
}

// export function DrawOperatorInAddConstraint(symbol, container){
//     resetInput(container);
    
//     operators.forEach((operator) => {
//         if (symbol === operator.getSymbol()){
//             operator.drawInAddConstraint(container)
//         }
//     } )
// }

function resetInput(container){
    const elementsToDelete = [...container.children];
    if (elementsToDelete){
        elementsToDelete.forEach(element => {
            container.removeChild(element);
        });
    }
}

function GetOperatorWithSymbol(symbol){
    operators.forEach((operator) => {
        if (symbol === operator.getSymbol()){
            return operator;
        }
    } )
}