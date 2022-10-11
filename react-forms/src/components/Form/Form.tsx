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
    errorKey: 'name' | 'surname',
    length: number
  ) => {
    const isValid = input && input.value.length > length;
    isValid
      ? this.setError(errorKey, ``)
      : this.setError(errorKey, `${errorKey} length must be greater than ${length}`);
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
          this.setError(errorKey, 'too young');
        }

        return isValid;
      } else {
        this.setError(errorKey, 'enter your date of birth');
        return false;
      }
    }
  };

  validateCountry = ({ current: country }: CurrentSelectI, errorKey: string) => {
    const isValid = country && country.value !== 'default';
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, 'choose your country');
    return isValid;
  };

  validateConsent = ({ current: consent }: CurrentInputI, errorKey: string) => {
    const isValid = consent && consent.checked;
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, 'confirm an agreement');
    return isValid;
  };

  validateImage = ({ current: image }: CurrentInputI, errorKey: string) => {
    const isValid = image && image.files && !!image.files.length;
    isValid ? this.setError(errorKey, '') : this.setError(errorKey, 'choose an image');
    return isValid;
  };

  areErrors = () => {
    return Object.values(this.state.errors).some((error) => error);
  };

  validate = () => [
    this.validateByValueLength(this.name, 'name', 2),
    this.validateByValueLength(this.surname, 'surname', 2),
    this.validateDate(this.date, 'date'),
    this.validateCountry(this.country, 'country'),
    this.validateConsent(this.consent, 'consent'),
    this.validateImage(this.image, 'image'),
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
    country.value = 'default';
    consent.checked = false;
    gender.checked = false;
    fileList.value = '';
  }

  onClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
            canSubmit: false,
            data: [
              ...prevState.data,
              {
                data: {
                  name: name.value,
                  surname: surname.value,
                  date: date.value,
                  country: country.value,
                  gender: gender.checked ? 'Female' : 'Male',
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

    return (
      <>
        <form className={cl.form} onChange={this.onChange} data-testid="form">
          <FormInput
            ref={this.name}
            cl={cl}
            errorMessage={nameError}
            labelText={'Name'}
            labelDirection={cl.columnLabel}
            inputType={'text'}
            inputName={'name'}
          />

          <FormInput
            ref={this.surname}
            cl={cl}
            errorMessage={surnameError}
            labelText={'Surname'}
            labelDirection={cl.columnLabel}
            inputType={'text'}
            inputName={'surname'}
          />

          <FormInput
            ref={this.date}
            cl={cl}
            errorMessage={dateError}
            labelText={'Birthday'}
            labelDirection={cl.columnLabel}
            inputType={'date'}
            inputName={'date'}
          />

          <FormSelect ref={this.country} cl={cl} errorMessage={countryError} />

          <FormInput
            ref={this.consent}
            cl={cl}
            errorMessage={consentError}
            labelText={'I agree to my personal data being processed'}
            labelDirection={cl.rowLabel}
            inputType={'checkbox'}
            inputName={'consent'}
          />

          <FormSwitcher ref={this.gender} cl={cl} />

          <FormFile ref={this.image} cl={cl} errorMessage={imageError} />

          <FormSubmit
            cl={cl}
            canSubmit={this.state.canSubmit}
            areErrors={!this.areErrors()}
            onClick={this.onClick}
          />

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
