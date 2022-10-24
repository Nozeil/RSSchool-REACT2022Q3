import { UseFormRegister } from 'react-hook-form';
import { FormValuesI } from '../Form.types';
import { FormSwitcherPropsI } from './FormSwitcher.interfaces';

export type FormSwitcherProps = FormSwitcherPropsI & ReturnType<UseFormRegister<FormValuesI>>;
