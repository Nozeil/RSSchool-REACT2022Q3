import React from 'react';
import { InputNames, InputTypes, TestIds } from '../Form.enums';
import { FormSwitcherPropsI } from './FormSwitcher.interfaces';

class FormSwitcher extends React.Component<FormSwitcherPropsI> {
  render() {
    const { innerRef: ref, cl } = this.props;
    return (
      <label className={cl.rowLabel}>
        Male{' '}
        <div className={cl.switcher}>
          <input
            type={InputTypes.checkbox}
            name={InputNames.gender}
            className={cl.gender}
            ref={ref}
            data-testid={TestIds.gender}
          />{' '}
          <div className={cl.indicator} />
        </div>
        Female
      </label>
    );
  }
}

export default React.forwardRef<HTMLInputElement, { cl: { readonly [key: string]: string } }>(
  (props, ref) => <FormSwitcher innerRef={ref} {...props} />
);
