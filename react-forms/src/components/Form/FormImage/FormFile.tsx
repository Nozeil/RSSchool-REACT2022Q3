import React from 'react';
import { FormImagePropsI, FormImageForwardPropsI } from '../FormFile/FormImage.interfaces';

class FormFile extends React.Component<FormImagePropsI> {
  render() {
    const { innerRef: ref, cl, errorMessage } = this.props;
    return (
      <label className={`${cl.rowLabel} ${errorMessage && cl.errorField}`}>
        <input type="file" name="image" className={cl.file} ref={ref} accept=".png, .jpg, .jpeg" />
        <div className={cl.button}>Upload image</div>
        {errorMessage && <div className={cl.errorMessage}>{errorMessage}</div>}
      </label>
    );
  }
}

export default React.forwardRef<HTMLInputElement, FormImageForwardPropsI>((props, ref) => (
  <FormFile innerRef={ref} {...props} />
));
