export interface FormInputPropsI {
  innerRef: React.ForwardedRef<HTMLInputElement>;
  cl: { readonly [key: string]: string };
  errorMessage: string;
  labelText: string;
  labelDirection: string;
  inputType: string;
  inputName: string;
}

export interface FormInputForwradRefPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
  labelText: string;
  labelDirection: string;
  inputType: string;
  inputName: string;
}
