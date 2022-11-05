import React from 'react';
import { TestIds } from 'enums';
import { FormInputProps } from './FormInput.types';
import useOnChangeHandler from '../useOnChangeHandler';

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ cl, errorMessage, labelText, labelDirection, inputType, name, onChange }, ref) => {
    const onChangeHandler = useOnChangeHandler<HTMLInputElement>(onChange);

    return (
      <label className={`${labelDirection} ${errorMessage && cl.errorField}`}>
        {labelText}{' '}
        <input
          type={inputType}
          name={name}
          className={cl.field}
          onChange={onChangeHandler}
          ref={ref}
          data-testid={name}
        />
        {errorMessage && (
          <div className={cl.errorMessage} data-testid={TestIds.error}>
            {errorMessage}
          </div>
        )}
      </label>
    );
  }
);

export default FormInput;
