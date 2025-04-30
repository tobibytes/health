import { SignUpFormState, SignUpFormErrors } from "./signupTypes";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignUpStep(form: SignUpFormState, stepIdx: number): SignUpFormErrors {
  const errors: SignUpFormErrors = {};
  if (stepIdx === 0) {
    if (!form.fullName) errors.fullName = "Full name required";
    if (!form.email) errors.email = "Email required";
    else if (!emailRegex.test(form.email)) errors.email = "Invalid email";
    if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth required";
  }
  if (stepIdx === 2) {
    if (!form.password) errors.password = "Password required";
    else if (form.password.length < 8) errors.password = "Min 8 characters";
    if (!form.confirmPassword) errors.confirmPassword = "Confirm password";
    else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!form.agree) errors.agree = "You must agree to terms";
  }
  return errors;
}
