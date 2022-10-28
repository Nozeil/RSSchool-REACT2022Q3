export interface FormSuccessMessagePropsI {
  isSuccessMessage: boolean;
  cl: { readonly [key: string]: string };
  onTransitionEnd: () => void;
}
