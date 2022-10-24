import React, { useEffect, useState } from 'react';
import { FormCardI, FormCardsData, FormValuesI } from './Form.types';
import cl from './Form.module.css';
import FormCardList from './FormCardList/FormCardList';
import FormInput from './FormInput/FormInput';
import FormSelect from './FormSelect/FormSelect';
import FormSwitcher from './FormSwitcher/FormSwitcher';
import FormFile from './FormFile/FormFile';
import FormSubmit from './FormSubmit/FormSubmit';
import FormSuccessMessage from './FormSuccessMessage/FormSuccessMessage';
import {
  Countries,
  ErrorMessages,
  Gendors,
  InputNames,
  InputTypes,
  LabelTexts,
  TestIds,
} from './Form.enums';
import { SubmitHandler, useForm } from 'react-hook-form';

const Form = () => {
  const [message, setMessageVisibility] = useState(false);
  const [data, setData] = useState<FormCardsData>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
    reset,
  } = useForm<FormValuesI>({
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
        const cardsData: FormCardI = {
          data: {
            name,
            surname,
            date,
            country,
            gender: gender ? Gendors.female : Gendors.male,
            file,
          },
          id: Date.now(),
        };
        setMessageVisibility(true);
        setData((prevData) => [...prevData, cardsData]);
      }
    }
  };

  const validateDate = (date: string) => {
    const [bDay, currDate, minAge] = [new Date(date), new Date(), 16];
    let age = currDate.getFullYear() - bDay.getFullYear();

    const [currMonth, currDay, month, day] = [
      currDate.getMonth(),
      currDate.getDate(),
      bDay.getMonth(),
      bDay.getDate(),
    ];

    if (currMonth < month) {
      age -= 1;
    } else if (currMonth === month) {
      if (currDay > day) {
        age -= 1;
      }
    }

    return age >= minAge;
  };

  const validateCountry = (country: string) => country !== Countries.default;

  const onTransitionEnd = () => setMessageVisibility(false);

  const areErrorsEmpty = () => {
    return !Object.values(errors).some((error) => error);
  };

  const canSubmit = () => isDirty && areErrorsEmpty();

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

        <FormSwitcher cl={cl} {...register(InputNames.gender)} />

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

      <FormCardList cards={data} />
    </>
  );
};
export default Form;
