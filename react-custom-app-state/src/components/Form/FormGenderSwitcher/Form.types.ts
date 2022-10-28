import { UseFormRegister } from 'react-hook-form';
import { FormValuesI } from '../Form.types';
import { FormGenderSwitcherPropsI } from './FormGenderSwitcher.interfaces';

export type FormGenderSwitcherProps = FormGenderSwitcherPropsI &
  ReturnType<UseFormRegister<FormValuesI>>;
