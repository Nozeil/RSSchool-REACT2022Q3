import React from 'react';
import { Countries, InputNames, TestIds } from '../Form.enums';
import { FormSelectPropsI, FormSelectForwardRefPropsI } from './FormSelect.interfaces';

class FormSelect extends React.Component<FormSelectPropsI> {
  render() {
    const { innerRef: ref, cl, errorMessage } = this.props;
    return (
      <label className={`${cl.columnLabel} ${errorMessage && cl.errorField}`}>
        Country
        <select
          name={InputNames.country}
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
}

export default React.forwardRef<HTMLSelectElement, FormSelectForwardRefPropsI>((props, ref) => (
  <FormSelect innerRef={ref} {...props} />
));
