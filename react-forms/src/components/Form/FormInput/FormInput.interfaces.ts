export interface FormInputPropsI extends FormInputForwradRefPropsI {
  innerRef: React.ForwardedRef<HTMLInputElement>;
}

export interface FormInputForwradRefPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
  labelText: string;
  labelDirection: string;
  inputType: string;
  inputName: string;
}
