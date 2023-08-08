//import { ConstraintConfig } from "./ConstraintConfig";

export class Activity{
  constructor(name = '', configs = []) {
    this.name = name;
    this.constraintConfigs = configs;
  }

  addConstraintConfig(constraintConfig){ // useful or not ?
    if (this.isConstraintConfig(constraintConfig)) {
      this.constraintConfigs.push(constraintConfig);
    } else {
      throw new Error("Invalid ConstraintConfig object.");
    }
  }

  // Helper function to check if an object is a ConstraintConfig
  isConstraintConfig(obj) {
    return obj && typeof obj === 'object' && 'constraintName' in obj && 'constraintConfig' in obj;
  }
}