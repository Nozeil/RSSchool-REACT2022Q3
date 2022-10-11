import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Form from './Form';

const checkElement = (id: string) => expect(render(<Form />).getByTestId(id)).toBeInTheDocument();

const submitChangedValue = (elem: HTMLElement, btn: HTMLElement, value: string) => {
  fireEvent.change(elem, { target: { value } });
  fireEvent.click(btn);
};

const checkFieldError = (id: string, btn: string, errorText: string, value: string) => {
  const { getByTestId, findByText, debug } = render(<Form />);
  const [field, submitBtn, error] = [getByTestId(id), getByTestId(btn), findByText(errorText)];

  submitChangedValue(field, submitBtn, value);

  error.then((error) => expect(error).toBeInTheDocument());
  debug();
};

const createCard = (
  name: HTMLElement,
  surname: HTMLElement,
  date: HTMLElement,
  country: HTMLElement,
  consent: HTMLElement,
  gender: HTMLElement,
  image: HTMLElement,
  btn: HTMLElement
) => {
  fireEvent.change(name, { target: { value: 'name' } });
  fireEvent.change(surname, { target: { value: 'surname' } });
  fireEvent.change(date, { target: { value: '2000-02-02' } });
  fireEvent.change(country, { target: { value: 'Belarus' } });
  fireEvent.change(consent, { target: { checked: true } });
  fireEvent.change(gender, { target: { checked: true } });
  fireEvent.change(image, {
    target: { files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })] },
  });
  fireEvent.click(btn);
};

describe('Form render', () => {
  it('should render name field', () => checkElement('name'));
  it('should render surname field', () => checkElement('surname'));
  it('should render date field', () => checkElement('date'));
  it('should render country field', () => checkElement('country'));
  it('should render consent field', () => checkElement('consent'));
  it('should render gender field', () => checkElement('gender'));
  it('should render image field', () => checkElement('image'));
  it('should render submit button', () => checkElement('submit'));
  it('should render form card list', () => {
    const { getByTestId } = render(<Form />);
    const cardList = getByTestId('formCardList');

    expect(cardList).toBeInTheDocument();
    expect(cardList.children.length).toBeFalsy();
  });
  it('submit button should be disabled', () => {
    const { getByTestId } = render(<Form />);
    const btn = getByTestId('submit');

    expect(btn).toHaveClass('disabled');
  });
});

describe('Form validation', () => {
  it('submit button should be enabled after changing value in input ', () => {
    const { getByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId('name'), getByTestId('submit')];

    fireEvent.change(nameField, { target: { value: '1' } });
    expect(submitBtn).not.toHaveClass('disabled');
  });
  it('should show errors when all fields are not valid and not to create card', () => {
    const { getByTestId, findByTestId, findAllByTestId } = render(<Form />);
    const [nameField, submitBtn, list, errors] = [
      getByTestId('name'),
      getByTestId('submit'),
      findByTestId('formCardList'),
      findAllByTestId('error'),
    ];

    submitChangedValue(nameField, submitBtn, 'A');

    errors.then((errors) => {
      expect(errors.length).toBe(6);
      errors.forEach((error) => expect(error).toBeInTheDocument());
    });

    list.then((list) => expect(list.children.length).toBeFalsy());
  });

  it('submit button should be disabled after click on it', () => {
    const { getByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId('name'), getByTestId('submit')];

    submitChangedValue(nameField, submitBtn, 'A');

    expect(submitBtn).toHaveClass('disabled');
  });

  it('should show name error', () =>
    checkFieldError('name', 'submit', 'Name length must be greater than 2', 'A'));
  it('should show surname error', () =>
    checkFieldError('surname', 'submit', 'Name length must be greater than 2', 'A'));
  it('should show date error', () => checkFieldError('date', 'submit', 'too young', '2020-01-01'));
  it('should show date error', () =>
    checkFieldError('date', 'submit', 'enter your date of birth', ''));
  it('should show country error', () =>
    checkFieldError('country', 'submit', 'choose your country', 'default'));
  it('should show consent error', () =>
    checkFieldError('name', 'submit', 'confirm an agreement', 'A'));
  it('should show image error', () => checkFieldError('name', 'submit', 'choose an image', 'A'));
});

describe('Form card render', () => {
  window.URL.createObjectURL = jest.fn();
  it('should render one card without errors', () => {
    const { getByTestId, findAllByTestId } = render(<Form />);
    const [
      name,
      surname,
      date,
      country,
      consent,
      gender,
      image,
      submitBtn,
      message,
      cards,
      errors,
    ] = [
      getByTestId('name'),
      getByTestId('surname'),
      getByTestId('date'),
      getByTestId('country'),
      getByTestId('consent'),
      getByTestId('gender'),
      getByTestId('image'),
      getByTestId('submit'),
      getByTestId('successMessage'),
      findAllByTestId('formCard'),
      findAllByTestId('error'),
    ];
    createCard(name, surname, date, country, consent, gender, image, submitBtn);
    expect(message).toHaveClass('showMessage');
    cards.then((cards) => expect(cards.length).toBe(1));
    errors.then((errors) => expect(errors.length).toBe(0));
  });
  it('should render ten cards without errors', () => {
    const { getByTestId, findAllByTestId } = render(<Form />);
    const [
      name,
      surname,
      date,
      country,
      consent,
      gender,
      image,
      submitBtn,
      message,
      cards,
      errors,
    ] = [
      getByTestId('name'),
      getByTestId('surname'),
      getByTestId('date'),
      getByTestId('country'),
      getByTestId('consent'),
      getByTestId('gender'),
      getByTestId('image'),
      getByTestId('submit'),
      getByTestId('successMessage'),
      findAllByTestId('formCard'),
      findAllByTestId('error'),
    ];

    for (let i = 0; i < 10; i++) {
      createCard(name, surname, date, country, consent, gender, image, submitBtn);
      expect(message).toHaveClass('showMessage');
      errors.then((errors) => expect(errors.length).toBe(0));
    }

    cards.then((cards) => expect(cards.length).toBe(10));
  });
});
