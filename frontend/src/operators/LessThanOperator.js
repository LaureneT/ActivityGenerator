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

    drawAndsetConfig(container, constraintConfig=''){
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

        // Set the value of the input element if constraintConfig is provided
        if (constraintConfig && constraintConfig != '') {
          const configObject = JSON.parse(constraintConfig);
          if (configObject) {
            inputElement.value = configObject;
          }
        }

        // Lambda expression (arrow function) for capturing user input
        const getUserInput = () => {
            const inputValue = parseFloat(inputElement.value);
            return inputValue;
        };

        // Return the lambda expression
        return getUserInput;
    }

}