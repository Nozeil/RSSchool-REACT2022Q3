import React from 'react';
import { InputNames, InputTypes, TestIds } from '../Form.enums';
import { FormImageForwardPropsI, FormImagePropsI } from './FormFile.interfaces';

class FormFile extends React.Component<FormImagePropsI> {
  render() {
    const { innerRef: ref, cl, errorMessage } = this.props;
    return (
      <label className={`${cl.rowLabel} ${errorMessage && cl.errorField}`}>
        <input
          type={InputTypes.file}
          name={InputNames.image}
          className={cl.file}
          ref={ref}
          accept=".png, .jpg, .jpeg"
          data-testid={TestIds.image}
        />
        <div className={cl.button}>Upload image</div>
        {errorMessage && (
          <div className={cl.errorMessage} data-testid={TestIds.error}>
            {errorMessage}
          </div>
        )}
      </label>
    );
  }
}

export default React.forwardRef<HTMLInputElement, FormImageForwardPropsI>((props, ref) => (
  <FormFile innerRef={ref} {...props} />
));
