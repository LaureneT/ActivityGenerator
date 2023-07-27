export class LessThanOperator {
    constructor() {}

    getSymbol() {
        return "<=";
    }

    getValuesAsJSON(){
        return "";
    }

    // eslint-disable-next-line
    drawSetup(container){
        console.log('drawing setup for op <=');
    }

    // eslint-disable-next-line
    drawConfig(container){
        // Create the label element
        const labelElement = document.createElement('label');
        labelElement.textContent = 'Value: ';
    
        // Create the input element
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.name = 'valueInput'; 
      
        // Append the input element to the form
        container.appendChild(labelElement);
        container.appendChild(inputElement);

        // Lambda expression (arrow function) for capturing user input
        const getUserInput = () => {
            const inputValue = inputElement.value;
            return JSON.stringify(inputValue);
        };

        // Return the lambda expression
        return getUserInput;
    }
}