export interface SignUpFormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  existingConditions: string;
  insuranceProvider: string;
  allergies: string;
  address: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface SignUpFormErrors {
  [key: string]: string;
}

export interface SignUpStep {
  label: string;
  fields: string[];
}
