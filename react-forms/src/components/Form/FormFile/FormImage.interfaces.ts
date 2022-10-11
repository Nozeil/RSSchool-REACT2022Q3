export interface FormImagePropsI {
  innerRef: React.ForwardedRef<HTMLInputElement>;
  cl: { readonly [key: string]: string };
  errorMessage: string;
}

export interface FormImageForwardPropsI {
  cl: { readonly [key: string]: string };
  errorMessage: string;
}
