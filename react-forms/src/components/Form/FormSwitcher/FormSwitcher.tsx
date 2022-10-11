import React from 'react';
import { FormSwitcherPropsI } from './FormSwitcher.interfaces';

class FormSwitcher extends React.Component<FormSwitcherPropsI> {
  render() {
    const { innerRef: ref, cl } = this.props;
    return (
      <label className={cl.rowLabel}>
        Male{' '}
        <div className={cl.switcher}>
          <input
            type="checkbox"
            name="gender"
            className={cl.gender}
            ref={ref}
            data-testid="gender"
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
