import React from 'react';
import { InputTypes, TestIds } from '../Form.enums';
import { FormSubmitPropsI } from './FormSubmit.interfaces';

class FormSubmit extends React.Component<FormSubmitPropsI> {
  render() {
    const { cl, canSubmit, onClick } = this.props;
    const sumbitClass = `${cl.button} ${canSubmit ? '' : cl.disabled}`;

    return (
      <input
        type={InputTypes.submit}
        value="Submit"
        className={sumbitClass}
        onClick={onClick}
        data-testid={TestIds.submit}
      />
    );
  }
}

export default FormSubmit;
