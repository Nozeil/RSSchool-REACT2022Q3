import { UseFormRegister } from 'react-hook-form';
import { FormValuesI } from '../Form.types';
import { FormSelectPropsI } from './FormSelect.interfaces';

export type FormSelectProps = FormSelectPropsI & ReturnType<UseFormRegister<FormValuesI>>;
