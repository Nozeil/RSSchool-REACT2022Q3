import React from 'react';
import { InputTypes } from '../Form.enums';
import { FormSubmitPropsI } from './FormSubmit.interfaces';
import { AppActions, TestIds } from 'enums';
import useAppContext from 'AppContext';

const FormSubmit = ({ cl, canSubmit }: FormSubmitPropsI) => {
  const sumbitClass = `${cl.button} ${canSubmit ? '' : cl.disabled}`;
  const { dispatch } = useAppContext();

  const onClick = () => {
    dispatch({ type: AppActions.setShouldShowErrors, payload: { shouldShowErrors: true } });
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
