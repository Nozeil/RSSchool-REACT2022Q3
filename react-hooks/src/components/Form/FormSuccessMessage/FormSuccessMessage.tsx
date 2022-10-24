import React from 'react';
import { TestIds } from '../Form.enums';
import { FormSuccessMessagePropsI } from './FormSuccessMessage.interfaces';

const FormSuccessMessage = ({
  isSuccessMessage,
  cl,
  onTransitionEnd,
}: FormSuccessMessagePropsI) => {
  const messageClass = isSuccessMessage ? cl.showMessage : cl.hideMessage;

  return (
    <div
      className={messageClass}
      onTransitionEnd={onTransitionEnd}
      data-testid={TestIds.successMessage}
    >
      Data has been saved
    </div>
  );
};

export default FormSuccessMessage;
