import React from 'react';
import { TestIds } from 'enums';
import { FormInputProps } from './FormInput.types';

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ cl, errorMessage, labelText, labelDirection, inputType, name, onChange }, ref) => (
    <label className={`${labelDirection} ${errorMessage && cl.errorField}`}>
      {labelText}{' '}
      <input
        type={inputType}
        name={name}
        className={cl.field}
        onChange={onChange}
        ref={ref}
        data-testid={name}
      />
      {errorMessage && (
        <div className={cl.errorMessage} data-testid={TestIds.error}>
          {errorMessage}
        </div>
      )}
    </label>
  )
);

export default FormInput;
