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

    drawInAddConstraint(container){
        createInput(container);
    }
}



function createInput(container) {
    // Create the label element
    const labelElement = document.createElement('label');
    labelElement.textContent = 'Values: ';

    // Create the input element
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.name = 'valuesInput'; // Set the name attribute (used when submitting the form)
    inputElement.placeholder = "['value1','value2',...]";
  
    // Append the input element to the form
    container.appendChild(labelElement);
    container.appendChild(inputElement);
  }