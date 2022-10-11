import React from 'react';
import { FormSuccessMessagePropsI } from './FormSuccessMessage.interfaces';

class FormSuccessMessage extends React.Component<FormSuccessMessagePropsI> {
  render() {
    const { isSuccessMessage, cl, onTransitionEnd } = this.props;
    return (
      <div
        className={isSuccessMessage ? cl.showMessage : cl.hideMessage}
        onTransitionEnd={onTransitionEnd}
        data-testid="successMessage"
      >
        Data has been saved
      </div>
    );
  }
}

export default FormSuccessMessage;
