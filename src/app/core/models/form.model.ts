export type FormConfig = FormElement[];
export type FormElement = InputElement | UiElement;

export type InputElement =
  | CheckboxElement
  | DateElement
  | RadioElement
  | SelectElement
  | TextElement
  | TextAreaElement;
export type UiElement = ButtonElement | LabelElement | ButtonGroupElement;

export type CheckboxElement = { elementType: 'checkbox'; element: Checkbox };
export type RadioElement = { elementType: 'radio'; element: Radio };
export type DateElement = { elementType: 'date'; element: DateInput };
export type SelectElement = { elementType: 'select'; element: Select };
export type TextElement = { elementType: 'text'; element: TextInput };
export type TextAreaElement = {
  elementType: 'textarea';
  element: TextAreaInput;
};
export type ButtonElement<F = (event: MouseEvent) => void> = {
  elementType: 'button';
  element: Button<F>;
};
export type LabelElement = {
  elementType: 'label';
  element: Label;
};
export type ButtonGroupElement = {
  elementType: 'button-group';
  element: ButtonGroup;
};

export type Element = {
  key: string;
  label: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  css_class?: string;
  hidden?: boolean;
  value?: string;
};
export type Checkbox = Element & {
  checked?: boolean;
};
export type DateInput = Element & {
  placeholder?: string;
  min?: string;
  max?: string;
};
export type Radio = Element & {
  options?: ListOptions;
};
export type Select = Element & {
  allowMultiple?: boolean;
  autoComplete?: boolean;
  value?: string;
  placeholder?: string;
  selectedValues?: ListOptions;
  options: ListOptions;
};
export type TextInput = Element & {
  placeholder?: string;
  validateAs?: '' | 'email' | 'password';
  validationPattern?: string | RegExp;
  validationMessage?: string;
};
export type TextAreaInput = Element & {
  placeholder?: string;
};
export type Button<F = (event: MouseEvent) => void> = Element & {
  type?: 'button' | 'submit' | 'reset';
  onClick?: F;
  href?: string;
  title?: string;
};
export type Label = Element;
export type ButtonGroup = Element & {
  display: 'row' | 'column';
  buttons: ButtonElement[];
};
export type ListOptions = { key: string; label: string }[];
