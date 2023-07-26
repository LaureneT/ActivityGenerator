export class InOperator {
    constructor() {
        this.options = []
    }

    getSymbol() {
        return "IN";
    }

    getValuesAsJSON(){
        console.log(this.options);
        console.log(JSON.stringify(this.options));
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

  
    drawConfig(container, values){
        const valuesJSON = JSON.parse(values);

        // Create the select (dropdown) element
        const selectElement = document.createElement('select');
        selectElement.name = 'selectedOption';

        // Add options to the select element
        valuesJSON.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
        });

        // Append the select element to the container
        container.appendChild(selectElement);   
    }
}



