import React, { useEffect, useState } from 'react';
import { FieldNamesType, FormValuesI } from './Form.types';
import cl from './Form.module.css';
import FormCardList from './FormCardList/FormCardList';
import FormInput from './FormInput/FormInput';
import FormSelect from './FormSelect/FormSelect';
import FormGenderSwitcher from './FormGenderSwitcher/FormGenderSwitcher';
import FormFile from './FormFile/FormFile';
import FormSubmit from './FormSubmit/FormSubmit';
import FormSuccessMessage from './FormSuccessMessage/FormSuccessMessage';
import {
  Countries,
  ErrorMessages,
  Genders,
  InputNames,
  InputTypes,
  LabelTexts,
} from './Form.enums';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TestIds } from 'enums';
import differenceInYears from 'date-fns/differenceInYears';
import { FormCardI, FormFieldsI } from 'app/App.types';
import { useDispatch, useSelector } from 'react-redux';
import { addFormCard, saveFormData, setIsDirty, setShouldShowErrors } from 'redux/appSlice';
import { RootState } from 'redux/types';

const Form = () => {
  const [message, setMessageVisibility] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { formValues, isDirty, shouldShowErrors } = useSelector((state: RootState) => ({
    formValues: state.formValues,
    isDirty: state.isDirty,
    shouldShowErrors: state.shouldShowErrors,
  }));
  const { register, handleSubmit, formState, getValues, setValue, getFieldState, reset, trigger } =
    useForm<FormValuesI>({
      mode: shouldShowErrors ? 'onChange' : 'onSubmit',
      defaultValues: {
        name: '',
        surname: '',
        date: '',
        consent: '',
        country: Countries.default,
        gender: '',
        image: '',
      },
    });
  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormValuesI> = (data) => {
    const { name, surname, date, country, gender, image: fileList } = data;
    if (fileList) {
      const file = fileList.item(0);
      if (file) {
        const formCard: FormCardI = {
          data: {
            name,
            surname,
            date,
            country,
            gender: gender ? Genders.female : Genders.male,
            file: URL.createObjectURL(file),
          },
          id: Date.now(),
        };
        setMessageVisibility(true);

        dispatch(addFormCard({ formCard }));
        dispatch(setIsDirty({ isDirty: false }));
        dispatch(setShouldShowErrors({ shouldShowErrors: false }));
      }
    }
  };

  const validateDate = (date: string) => {
    const [bDay, currDate, minAge] = [new Date(date), new Date(), 16];
    return differenceInYears(currDate, bDay) >= minAge;
  };

  const validateCountry = (country: string) => country !== Countries.default;

  const onTransitionEnd = () => setMessageVisibility(false);

  const areErrorsEmpty = () => {
    return !Object.values(errors).some((error) => error);
  };

  const canSubmit = () => isDirty && areErrorsEmpty();

  const fieldNames: FieldNamesType[] = ['name', 'surname', 'date', 'country', 'consent', 'gender'];

  const getFields = () => {
    const formValues = getValues();
    const fieldsState = fieldNames.reduce<FormFieldsI>((state, field) => {
      const { invalid } = getFieldState(field, formState);
      state[field] = { value: formValues[field], invalid };
      return state;
    }, {});

    return fieldsState;
  };

  const setValues = () => {
    fieldNames.forEach((name) => {
      setValue(name, formValues[name].value);
    });
  };

  useEffect(
    () => {
      setValues();
      if (shouldShowErrors) {
        trigger();
      }
      return () => {
        dispatch(saveFormData({ formValues: getFields() }));
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <form
        className={cl.form}
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
        data-testid={TestIds.form}
      >
        <FormInput
          cl={cl}
          errorMessage={errors.name?.message || ''}
          labelText={LabelTexts.name}
          labelDirection={cl.columnLabel}
          inputType={InputTypes.text}
          {...register(InputNames.name, {
            required: `name ${ErrorMessages.lengthError}`,
            minLength: {
              value: 3,
              message: `name ${ErrorMessages.lengthError}`,
            },
          })}
        />

        <FormInput
          cl={cl}
          errorMessage={errors.surname?.message || ''}
          labelText={LabelTexts.surname}
          labelDirection={cl.columnLabel}
          inputType={InputTypes.text}
          {...register(InputNames.surname, {
            required: `surname ${ErrorMessages.lengthError}`,
            minLength: {
              value: 3,
              message: `surname ${ErrorMessages.lengthError}`,
            },
          })}
        />

        <FormInput
          cl={cl}
          errorMessage={errors.date?.message || ''}
          labelText={LabelTexts.date}
          labelDirection={cl.columnLabel}
          inputType={InputTypes.date}
          {...register(InputNames.date, {
            required: ErrorMessages.emptyDate,
            validate: {
              overTheAgeOfFifteen: (date) => validateDate(date) || ErrorMessages.wrongDate,
            },
          })}
        />

        <FormSelect
          cl={cl}
          errorMessage={errors.country?.message || ''}
          {...register(InputNames.country, {
            validate: (country) => validateCountry(country) || ErrorMessages.country,
          })}
        />

        <FormInput
          cl={cl}
          errorMessage={errors.consent?.message || ''}
          labelText={LabelTexts.consent}
          labelDirection={cl.rowLabel}
          inputType={InputTypes.checkbox}
          {...register(InputNames.consent, {
            required: ErrorMessages.consent,
          })}
        />

        <FormGenderSwitcher cl={cl} {...register(InputNames.gender)} />

        <FormFile
          cl={cl}
          errorMessage={errors.image?.message || ''}
          {...register(InputNames.image, {
            required: ErrorMessages.image,
          })}
        />

        <FormSubmit cl={cl} canSubmit={canSubmit()} />

        <FormSuccessMessage isSuccessMessage={message} cl={cl} onTransitionEnd={onTransitionEnd} />
      </form>

      <FormCardList />
    </>
  );
};
export default Form;
