export const errorMessages = {
  required: (field: string) => `${field} is required.`,
  minlength: (field: string, length: number) =>
    `${field} should have at least ${length} characters.`,
  pattern: 'Value does not match the expected format.',
  email: 'Please enter a valid email address.',
  min: (field: string, value: number) =>
    `${field} must be greater than or equal to ${value}.`,
  max: (field: string, value: number) =>
    `${field} must be less than or equal to ${value}.`,
  matDatepickerMin: 'Please enter a valid date.',
  matDatepickerMax: 'Please enter a valid date.',
};
