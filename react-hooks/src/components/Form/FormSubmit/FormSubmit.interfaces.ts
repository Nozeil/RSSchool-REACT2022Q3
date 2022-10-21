export interface FormSubmitPropsI {
  cl: { readonly [key: string]: string };
  canSubmit: boolean;
  onClick: (e: React.MouseEvent) => void;
}
