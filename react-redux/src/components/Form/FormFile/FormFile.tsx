import React from 'react';
import { InputTypes } from '../Form.enums';
import { TestIds } from 'enums';
import { FormImageProps } from './FormFile.types';
import useOnChangeHandler from '../useOnChangeHandler';

const FormFile = React.forwardRef<HTMLInputElement, FormImageProps>(
  ({ cl, errorMessage, name, onChange }, ref) => {
    const onChangeHandler = useOnChangeHandler<HTMLInputElement>(onChange);

    return (
      <label className={`${cl.rowLabel} ${errorMessage && cl.errorField}`}>
        <input
          type={InputTypes.file}
          name={name}
          className={cl.file}
          onChange={onChangeHandler}
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
);

export default FormFile;
