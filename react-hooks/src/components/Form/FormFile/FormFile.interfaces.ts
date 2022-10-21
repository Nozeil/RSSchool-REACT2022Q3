export interface FormImagePropsI extends FormImageForwardPropsI {
  innerRef: React.ForwardedRef<HTMLInputElement>;
}

export interface FormImageForwardPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
}
