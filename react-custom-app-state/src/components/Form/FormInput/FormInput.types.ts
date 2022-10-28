import { UseFormRegister } from 'react-hook-form';
import { FormValuesI } from '../Form.types';
import { FormInputPropsI } from './FormInput.interfaces';

export type FormInputProps = FormInputPropsI & ReturnType<UseFormRegister<FormValuesI>>;
