export interface FormSubmitPropsI {
  cl: { readonly [key: string]: string };
  canSubmit: boolean;
  areErrors: boolean;
  onClick: (e: React.MouseEvent) => void;
}
