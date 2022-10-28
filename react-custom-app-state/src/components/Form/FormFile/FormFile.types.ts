import { UseFormRegister } from 'react-hook-form';
import { FormValuesI } from '../Form.types';
import { FormImagePropsI } from './FormFile.interfaces';

export type FormImageProps = FormImagePropsI & ReturnType<UseFormRegister<FormValuesI>>;
