export interface FormSelectPropsI {
  innerRef: React.ForwardedRef<HTMLSelectElement>;
  cl: { readonly [key: string]: string };
  errorMessage: string;
}

export interface FormSelectForwardRefPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
}
