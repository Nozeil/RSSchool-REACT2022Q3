import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setIsDirty } from 'redux/appSlice';

const useOnChangeHandler = <T>(onChange: (e: ChangeEvent<T>) => Promise<boolean | void>) => {
  const dispatch = useDispatch();

  return (e: ChangeEvent<T>) => {
    dispatch(setIsDirty({ isDirty: true }));
    onChange(e);
  };
};

export default useOnChangeHandler;
