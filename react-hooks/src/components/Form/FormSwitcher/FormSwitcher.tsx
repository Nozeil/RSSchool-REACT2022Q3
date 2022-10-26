import React from 'react';
import { InputTypes } from '../Form.enums';
import { FormSwitcherProps } from './Form.types';
import { TestIds } from 'enums';

const FormSwitcher = React.forwardRef<HTMLInputElement, FormSwitcherProps>(
  ({ cl, name, onChange }, ref) => (
    <label className={cl.rowLabel}>
      Male{' '}
      <div className={cl.switcher}>
        <input
          type={InputTypes.checkbox}
          name={name}
          className={cl.gender}
          ref={ref}
          onChange={onChange}
          data-testid={TestIds.gender}
        />{' '}
        <div className={cl.indicator} />
      </div>
      Female
    </label>
  )
);

export default FormSwitcher;
