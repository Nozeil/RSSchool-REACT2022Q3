import React from 'react';
import { InputTypes, TestIds } from '../Form.enums';
import { FormImageProps } from './FormFile.types';

const FormFile = React.forwardRef<HTMLInputElement, FormImageProps>(
  ({ cl, errorMessage, name, onChange }, ref) => (
    <label className={`${cl.rowLabel} ${errorMessage && cl.errorField}`}>
      <input
        type={InputTypes.file}
        name={name}
        className={cl.file}
        onChange={onChange}
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
  )
);

export default FormFile;
