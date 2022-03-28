export interface JsonFormControlOptions {
    min?: string;
    max?: string;
    step?: string;
    icon?: string;
  }
  export interface JsonFormValidators {
    min?: number;
  
    max?: number;
    required?: boolean;
    requiredTrue?: boolean;
    email?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
    pattern?: string;
    nullValidator?: boolean;
  }
  export interface JsonFormControls {
    name: string;
    label: string;
    value: string;
    type: string;
    disabled?:boolean;
    options?: JsonFormControlOptions;
    required: boolean;
    validators: JsonFormValidators;
  }
  export interface JsonFormData {
    controls: JsonFormControls[];
  }