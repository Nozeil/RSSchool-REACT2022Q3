import React from 'react';
import { Countries } from '../Form.enums';
import { FormSelectProps } from './FormSelect.types';
import { TestIds } from 'enums';
import useOnChangeHandler from '../useOnChangeHandler';

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ cl, errorMessage, name, onChange }, ref) => {
    const onChangeHandler = useOnChangeHandler<HTMLSelectElement>(onChange);

    return (
      <label className={`${cl.columnLabel} ${errorMessage && cl.errorField}`}>
        Country
        <select
          name={name}
          onChange={onChangeHandler}
          ref={ref}
          defaultValue={Countries.default}
          className={cl.field}
          data-testid={TestIds.country}
        >
          <option value={Countries.default} disabled>
            Choose a country
          </option>
          <option value={Countries.Belarus}>{Countries.Belarus}</option>
          <option value={Countries.Ukraine}>{Countries.Ukraine}</option>
          <option value={Countries.Poland}>{Countries.Poland}</option>
          <option value={Countries.Russia}>{Countries.Russia}</option>
          <option value={Countries.Lithuania}>{Countries.Lithuania}</option>
          <option value={Countries.Latvia}>{Countries.Latvia}</option>
        </select>
        {errorMessage && (
          <div className={cl.errorMessage} data-testid={TestIds.error}>
            {errorMessage}
          </div>
        )}
      </label>
    );
  }
);

export default FormSelect;
