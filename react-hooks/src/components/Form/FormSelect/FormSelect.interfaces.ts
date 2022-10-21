export interface FormSelectPropsI extends FormSelectForwardRefPropsI {
  innerRef: React.ForwardedRef<HTMLSelectElement>;
}

export interface FormSelectForwardRefPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
}
