import React from 'react';
import { InputTypes, TestIds } from '../Form.enums';
import { FormSubmitPropsI } from './FormSubmit.interfaces';

const FormSubmit = ({ cl, canSubmit }: FormSubmitPropsI) => {
  const sumbitClass = `${cl.button} ${canSubmit ? '' : cl.disabled}`;
  return (
    <input
      type={InputTypes.submit}
      value="Submit"
      className={sumbitClass}
      data-testid={TestIds.submit}
    />
  );
};

export default FormSubmit;
