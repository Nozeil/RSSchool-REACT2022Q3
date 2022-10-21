import React from 'react';
import { TestIds } from '../Form.enums';
import { FormSuccessMessagePropsI } from './FormSuccessMessage.interfaces';

class FormSuccessMessage extends React.Component<FormSuccessMessagePropsI> {
  render() {
    const { isSuccessMessage, cl, onTransitionEnd } = this.props;
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
  }
}

export default FormSuccessMessage;
