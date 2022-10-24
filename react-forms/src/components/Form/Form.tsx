import React, { ChangeEvent } from 'react';
import { FormStateI, CurrentInputI, CurrentSelectI } from './Form.types';
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
  ErrorKeys,
  ErrorMessages,
  Gendors,
  InputNames,
  InputTypes,
  LabelTexts,
  TestIds,
} from './Form.enums';

class Form extends React.Component<Record<string, never>, FormStateI> {
  name: React.RefObject<HTMLInputElement>;
  surname: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  country: React.RefObject<HTMLSelectElement>;
  consent: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: [],
      isSuccessMessage: false,
      canSubmit: false,
      errors: {
        name: '',
        surname: '',
        date: '',
        country: '',
        consent: '',
        image: '',
      },
    };
    this.name = React.createRef<HTMLInputElement>();
    this.surname = React.createRef<HTMLInputElement>();
    this.date = React.createRef<HTMLInputElement>();
    this.country = React.createRef<HTMLSelectElement>();
    this.consent = React.createRef<HTMLInputElement>();
    this.gender = React.createRef<HTMLInputElement>();
    this.image = React.createRef<HTMLInputElement>();
  }

  setError = (key: string, value: string) => {
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [key]: value,
      },
    }));
  };

  validateByValueLength = (
    { current: input }: CurrentInputI,
    errorKey: ErrorKeys.name | ErrorKeys.surname,
    length = 2
  ) => {
    const isValid = input && input.value.length > length;
    isValid
      ? this.setError(errorKey, ``)
      : this.setError(errorKey, `${errorKey} ${ErrorMessages.lengthError} ${length}`);
    return isValid;
  };

  validateDate = ({ current: date }: CurrentInputI, errorKey: string) => {
    if (date) {
      const bDay = date.valueAsDate;

      if (bDay) {
        const currDate = new Date();
        const minAge = 16;
        let age = currDate.getFullYear() - bDay.getFullYear();
        const isValid = age > minAge;

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

        if (isValid) {
          this.setError(errorKey, '');
        } else {
          this.setError(errorKey, ErrorMessages.wrongDate);
        }

        return isValid;
      } else {
        this.setError(errorKey, ErrorMessages.emptyDate);
        return false;
      }
    }
  };

  validateCountry = ({ current: country }: CurrentSelectI, errorKey: string) => {
    const isValid = country && country.value !== Countries.default;
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, ErrorMessages.country);
    return isValid;
  };

  validateConsent = ({ current: consent }: CurrentInputI, errorKey: string) => {
    const isValid = consent && consent.checked;
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, ErrorMessages.consent);
    return isValid;
  };

  validateImage = ({ current: image }: CurrentInputI, errorKey: string) => {
    const isValid = image && image.files && !!image.files.length;
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, ErrorMessages.image);
    return isValid;
  };

  validate = () => [
    this.validateByValueLength(this.name, ErrorKeys.name),
    this.validateByValueLength(this.surname, ErrorKeys.surname),
    this.validateDate(this.date, ErrorKeys.date),
    this.validateCountry(this.country, ErrorKeys.country),
    this.validateConsent(this.consent, ErrorKeys.consent),
    this.validateImage(this.image, ErrorKeys.image),
  ];

  resetForm(
    name: HTMLInputElement,
    surname: HTMLInputElement,
    date: HTMLInputElement,
    country: HTMLSelectElement,
    consent: HTMLInputElement,
    gender: HTMLInputElement,
    fileList: HTMLInputElement
  ) {
    name.value = '';
    surname.value = '';
    date.value = '';
    country.value = Countries.default;
    consent.checked = false;
    gender.checked = false;
    fileList.value = '';
  }

  onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState(() => ({ canSubmit: false }));
    const isValid = !this.validate().some((valid) => !valid);

    if (isValid) {
      const [name, surname, date, country, consent, gender, fileList] = [
        this.name.current,
        this.surname.current,
        this.date.current,
        this.country.current,
        this.consent.current,
        this.gender.current,
        this.image.current,
      ];

      if (name && surname && date && country && consent && gender && fileList && fileList.files) {
        const file = fileList.files['0'];
        this.setState((prevState) => {
          const state = {
            isSuccessMessage: true,
            data: [
              ...prevState.data,
              {
                data: {
                  name: name.value,
                  surname: surname.value,
                  date: date.value,
                  country: country.value,
                  gender: gender.checked ? Gendors.female : Gendors.male,
                  file,
                },
                id: Date.now(),
              },
            ],
          };
          this.resetForm(name, surname, date, country, consent, gender, fileList);
          return state;
        });
      }
    }
  };

  areErrorsEmpty = () => {
    return !Object.values(this.state.errors).some((error) => error);
  };

  onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const [key, canSubmit] = [e.target.name, !this.state.canSubmit];

    if (this.state.errors[key]) {
      this.setError(key, '');
    }

    if (canSubmit) {
      this.setState(() => ({ canSubmit }));
    }
  };

  onTransitionEnd = () => this.setState(() => ({ isSuccessMessage: false }));

  render() {
    const {
      name: nameError,
      surname: surnameError,
      date: dateError,
      country: countryError,
      consent: consentError,
      image: imageError,
    } = this.state.errors;

    const canSubmit = this.state.canSubmit && this.areErrorsEmpty();

    return (
      <>
        <form className={cl.form} onChange={this.onChange} data-testid={TestIds.form}>
          <FormInput
            ref={this.name}
            cl={cl}
            errorMessage={nameError}
            labelText={LabelTexts.name}
            labelDirection={cl.columnLabel}
            inputType={InputTypes.text}
            inputName={InputNames.name}
          />

          <FormInput
            ref={this.surname}
            cl={cl}
            errorMessage={surnameError}
            labelText={LabelTexts.surname}
            labelDirection={cl.columnLabel}
            inputType={InputTypes.text}
            inputName={InputNames.surname}
          />

          <FormInput
            ref={this.date}
            cl={cl}
            errorMessage={dateError}
            labelText={LabelTexts.date}
            labelDirection={cl.columnLabel}
            inputType={InputTypes.date}
            inputName={InputNames.date}
          />

          <FormSelect ref={this.country} cl={cl} errorMessage={countryError} />

          <FormInput
            ref={this.consent}
            cl={cl}
            errorMessage={consentError}
            labelText={LabelTexts.consent}
            labelDirection={cl.rowLabel}
            inputType={InputTypes.checkbox}
            inputName={InputNames.consent}
          />

          <FormSwitcher ref={this.gender} cl={cl} />

          <FormFile ref={this.image} cl={cl} errorMessage={imageError} />

          <FormSubmit cl={cl} canSubmit={canSubmit} onClick={this.onClick} />

          <FormSuccessMessage
            isSuccessMessage={this.state.isSuccessMessage}
            cl={cl}
            onTransitionEnd={this.onTransitionEnd}
          />
        </form>
        <FormCardList cards={this.state.data} />
      </>
    );
  }
}

export default Form;
