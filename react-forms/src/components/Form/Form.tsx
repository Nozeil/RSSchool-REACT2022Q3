import React, { ChangeEvent } from 'react';
import { FormStateI, CurrentInputI, CurrentSelectI } from './Form.types';
import cl from './Form.module.css';
import FormCardList from './FormCardList/FormCardList';

class Form extends React.Component<Record<string, never>, FormStateI> {
  name: React.RefObject<HTMLInputElement>;
  surname: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  country: React.RefObject<HTMLSelectElement>;
  consent: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
  submit: React.RefObject<HTMLInputElement>;

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
    this.submit = React.createRef<HTMLInputElement>();
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
    const key = e.target.name;

    if (this.state.errors[key]) {
      this.setError(key, '');
    }
    const canSubmit = !this.state.canSubmit;

    if (canSubmit) {
      this.setState(() => ({ canSubmit: true }));
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
        <form className={cl.form} onChange={this.onChange}>
          <label className={`${cl.columnLabel} ${nameError && cl.errorField}`}>
            Name <input type="text" name="name" className={cl.field} ref={this.name} />
            {nameError && <div className={cl.errorMessage}>{nameError}</div>}
          </label>

          <label className={`${cl.columnLabel} ${surnameError && cl.errorField}`}>
            Surname <input type="text" name="surname" className={cl.field} ref={this.surname} />
            {surnameError && <div className={cl.errorMessage}>{surnameError}</div>}
          </label>

          <label className={`${cl.columnLabel} ${dateError && cl.errorField}`}>
            Birthday <input type="date" name="date" className={cl.field} ref={this.date} />
            {dateError && <div className={cl.errorMessage}>{dateError}</div>}
          </label>

          <label className={`${cl.columnLabel} ${countryError && cl.errorField}`}>
            Country
            <select name="country" ref={this.country} defaultValue={'default'} className={cl.field}>
              <option value="default" disabled>
                Choose a country
              </option>
              <option value="Belarus">Belarus</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Poland">Poland</option>
              <option value="Russia">Russia</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Latvia">Latvia</option>
            </select>
            {countryError && <div className={cl.errorMessage}>{countryError}</div>}
          </label>

          <label className={`${cl.rowLabel} ${consentError && cl.errorField}`}>
            <input type="checkbox" name="consent" id="consent" ref={this.consent} /> I agree to my
            personal data being processed
            {consentError && <div className={cl.errorMessage}>{consentError}</div>}
          </label>

          <label className={cl.rowLabel}>
            Male{' '}
            <div className={cl.switcher}>
              <input
                type="checkbox"
                name="gender"
                id="gender"
                className={cl.gender}
                ref={this.gender}
              />{' '}
              <div className={cl.indicator} />
            </div>
            Female
          </label>

          <label className={`${cl.rowLabel} ${imageError && cl.errorField}`}>
            <input
              type="file"
              name="image"
              className={cl.file}
              ref={this.image}
              accept=".png, .jpg, .jpeg"
            />
            <div className={cl.button}>Upload image</div>
            {imageError && <div className={cl.errorMessage}>{imageError}</div>}
          </label>

          <input
            type="submit"
            value="Submit"
            className={`${cl.button} ${
              this.state.canSubmit && !this.areErrors() ? '' : cl.disabled
            }`}
            onClick={this.onClick}
            ref={this.submit}
          />
          <div
            className={this.state.isSuccessMessage ? cl.showMessage : cl.hideMessage}
            onTransitionEnd={this.onTransitionEnd}
          >
            Data has been saved
          </div>
        </form>
        <FormCardList cards={this.state.data} />
      </>
    );
  }
}

export default Form;
