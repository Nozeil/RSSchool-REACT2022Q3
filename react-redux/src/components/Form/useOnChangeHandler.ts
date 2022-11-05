import useAppContext from 'app/AppContext';
import { AppActions } from 'enums';
import { ChangeEvent } from 'react';

const useOnChangeHandler = <T>(onChange: (e: ChangeEvent<T>) => Promise<boolean | void>) => {
  const { dispatch } = useAppContext();

  return (e: ChangeEvent<T>) => {
    dispatch({ type: AppActions.setIsDirty, payload: { isDirty: true } });
    onChange(e);
  };
};

export default useOnChangeHandler;
