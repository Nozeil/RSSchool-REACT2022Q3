import React from 'react';
import { InputTypes } from '../Form.enums';
import { FormGenderSwitcherProps } from './Form.types';
import { TestIds } from 'enums';
import useOnChangeHandler from '../useOnChangeHandler';

const FormGenderSwitcher = React.forwardRef<HTMLInputElement, FormGenderSwitcherProps>(
  ({ cl, name, onChange }, ref) => {
    const onChangeHandler = useOnChangeHandler<HTMLInputElement>(onChange);

    return (
      <label className={cl.rowLabel}>
        Male{' '}
        <div className={cl.switcher}>
          <input
            type={InputTypes.checkbox}
            name={name}
            className={cl.gender}
            ref={ref}
            onChange={onChangeHandler}
            data-testid={TestIds.gender}
          />{' '}
          <div className={cl.indicator} />
        </div>
        Female
      </label>
    );
  }
);

export default FormGenderSwitcher;
