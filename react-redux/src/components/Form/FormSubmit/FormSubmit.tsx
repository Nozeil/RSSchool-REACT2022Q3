import React from 'react';
import { InputTypes } from '../Form.enums';
import { FormSubmitPropsI } from './FormSubmit.interfaces';
import { TestIds } from 'enums';
import { useDispatch } from 'react-redux';
import { setShouldShowErrors } from 'redux/appSlice';

const FormSubmit = ({ cl, canSubmit }: FormSubmitPropsI) => {
  const sumbitClass = `${cl.button} ${canSubmit ? '' : cl.disabled}`;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setShouldShowErrors({ shouldShowErrors: true }));
  };

  return (
    <input
      type={InputTypes.submit}
      value="Submit"
      className={sumbitClass}
      onClick={onClick}
      data-testid={TestIds.submit}
    />
  );
};

export default FormSubmit;
