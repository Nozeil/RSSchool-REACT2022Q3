import React from 'react';
import { FormSubmitPropsI } from './FormSubmit.interfaces';

class FormSubmit extends React.Component<FormSubmitPropsI> {
  render() {
    const { cl, canSubmit, areErrors, onClick } = this.props;
    return (
      <input
        type="submit"
        value="Submit"
        className={`${cl.button} ${canSubmit && areErrors ? '' : cl.disabled}`}
        onClick={onClick}
      />
    );
  }
}

export default FormSubmit;
