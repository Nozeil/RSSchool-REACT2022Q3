import React from 'react';
import { FormSelectPropsI, FormSelectForwardRefPropsI } from './FormSelect.interfaces';

class FormSelect extends React.Component<FormSelectPropsI> {
  render() {
    const { innerRef: ref, cl, errorMessage } = this.props;
    return (
      <label className={`${cl.columnLabel} ${errorMessage && cl.errorField}`}>
        Country
        <select name="country" ref={ref} defaultValue={'default'} className={cl.field}>
          <option value="default" disabled>
            Choose a country
          </option>
          <option value="Belarus">Belarus</option>
          <option value="Ukraine">Ukraine</option>
          <option value="Poland">Poland</option>
          <option value="Russia">Russia</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Latvia">Latvia</option>
        </select>
        {errorMessage && <div className={cl.errorMessage}>{errorMessage}</div>}
      </label>
    );
  }
}

export default React.forwardRef<HTMLSelectElement, FormSelectForwardRefPropsI>((props, ref) => (
  <FormSelect innerRef={ref} {...props} />
));
