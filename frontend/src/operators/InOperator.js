export class InOperator {
    constructor() {
        this.options = []
    }

    getSymbol() {
        return "IN";
    }

    getValuesAsJSON(){
        return JSON.stringify(this.options);
    }

    drawSetup(container){
        this.createValuesInput(container);
    }

    createValuesInput(container) {
        // Create the label element
        const labelElement = document.createElement('label');
        labelElement.textContent = 'Values (JSON): ';
    
        // Create the input element
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.name = 'valuesInput'; 
        inputElement.placeholder = '["value1","value2",...]';
        inputElement.addEventListener('change', (event) => this.onInputChange(event));
      
        // Append the input element to the form
        container.appendChild(labelElement);
        container.appendChild(inputElement);
    }

    onInputChange(event) {
        this.options = event.target.value;
    }
    
    drawAndsetConfig(container, values, constraintConfig=''){
        const valuesJSON = JSON.parse(values);

        // Create the select (dropdown) element
        const selectElement = document.createElement('select');
        selectElement.name = 'selectedOption';
        
        // Add an empty option as the default "void" selection
        const defaultOption = document.createElement('option');
        defaultOption.value = ''; // You can set the value to null or any other value if needed
        defaultOption.textContent = 'Select an option'; // You can provide any appropriate text here
        selectElement.appendChild(defaultOption);

        // Add options to the select element
        valuesJSON.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
        
        // Set the selected value if it exists in constraintConfig
        if (constraintConfig && constraintConfig != '') {
            const config = typeof(constraintConfig) == 'string' ? constraintConfig: JSON.parse(constraintConfig);
            selectElement.value = config;
        }

        // Append the select element to the container
        container.appendChild(selectElement);   

        // Lambda expression (arrow function) for capturing user input
        const getUserInput = () => {
            const selectedValue = selectElement.value;
            return JSON.stringify(selectedValue);
        };

        // Return the lambda expression
        return getUserInput;
    }
}



