import React from 'react';
import { InputTypes } from '../Form.enums';
import { FormSubmitPropsI } from './FormSubmit.interfaces';
import { TestIds } from 'enums';

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
