import React from 'react';
import Form from './Form';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Countries, ErrorMessages } from './Form.enums';
import { TestIds } from 'enums';

const checkElement = (id: string) => expect(render(<Form />).getByTestId(id)).toBeInTheDocument();

const submitChangedValue = async (elem: HTMLElement, btn: HTMLElement, value: string) => {
  waitFor(() => {
    if (value) {
      elem instanceof HTMLSelectElement
        ? userEvent.selectOptions(elem, value)
        : userEvent.type(elem, value);
    }
    userEvent.click(btn);
  });
};

const checkFieldError = async (
  id: string,
  errorText: string,
  value: string,
  btnId = TestIds.submit
) => {
  const { getByTestId, findByText } = render(<Form />);
  const [field, submitBtn] = [getByTestId(id), getByTestId(btnId)];

  await submitChangedValue(field, submitBtn, value);
  const error = await findByText(errorText);
  expect(error).toBeInTheDocument();
};

const createCard = async (
  name: HTMLElement,
  surname: HTMLElement,
  date: HTMLElement,
  country: HTMLElement,
  consent: HTMLElement,
  gender: HTMLElement,
  image: HTMLElement,
  btn: HTMLElement
) => {
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  await waitFor(() => {
    userEvent.type(name, 'name');
    userEvent.type(surname, 'surname');
    userEvent.type(date, '2000-02-02');
    userEvent.selectOptions(country, Countries.Belarus);
    userEvent.click(consent);
    userEvent.click(gender);
    userEvent.upload(image, file);
    Object.defineProperty(image, 'value', {
      value: file.name,
      writable: true,
    });
    userEvent.click(btn);
  });
};

describe('Form render', () => {
  it('should render name field', () => checkElement(TestIds.name));
  it('should render surname field', () => checkElement(TestIds.surname));
  it('should render date field', () => checkElement(TestIds.date));
  it('should render country field', () => checkElement(TestIds.country));
  it('should render consent field', () => checkElement(TestIds.consent));
  it('should render gender field', () => checkElement(TestIds.gender));
  it('should render image field', () => checkElement(TestIds.gender));
  it('should render submit button', () => checkElement(TestIds.gender));
  it('should render form card list', () => {
    const { getByTestId } = render(<Form />);
    const cardList = getByTestId(TestIds.formCardList);

    expect(cardList).toBeInTheDocument();
    expect(cardList.children.length).toBeFalsy();
  });
  it('submit button should be disabled', () => {
    const { getByTestId } = render(<Form />);
    const btn = getByTestId(TestIds.submit);

    expect(btn).toHaveClass('disabled');
  });
});

describe('Form validation', () => {
  it('submit button should be enabled after changing value in input ', () => {
    const { getByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];

    userEvent.type(nameField, '1');
    expect(submitBtn).not.toHaveClass('disabled');
  });
  it('should show errors when all fields are not valid and not to create card', async () => {
    const { getByTestId, findByTestId, findAllByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];
    await act(() => submitChangedValue(nameField, submitBtn, 'A'));
    const list = await findByTestId(TestIds.formCardList);
    const errors = await findAllByTestId(TestIds.error);
    expect(errors.length).toBe(6);
    errors.forEach((error) => expect(error).toBeInTheDocument());
    expect(list.children.length).toBeFalsy();
  });

  it('submit button should be disabled after click on it', async () => {
    const { getByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];
    await act(() => submitChangedValue(nameField, submitBtn, 'A'));
    expect(submitBtn).toHaveClass('disabled');
  });

  it('should show name error', () =>
    checkFieldError(TestIds.name, `name ${ErrorMessages.lengthError}`, 'A'));

  it('should show surname error', () =>
    checkFieldError(TestIds.surname, `surname ${ErrorMessages.lengthError}`, 'A'));

  it('should show date error', () =>
    checkFieldError(TestIds.date, ErrorMessages.wrongDate, '2020-01-01'));

  it('should show date error', () => checkFieldError(TestIds.date, ErrorMessages.emptyDate, ''));
  it('should show country error', () =>
    checkFieldError(TestIds.country, ErrorMessages.country, Countries.default));
  it('should show consent error', () => checkFieldError(TestIds.name, ErrorMessages.consent, 'A'));
  it('should show image error', () => checkFieldError(TestIds.name, ErrorMessages.image, 'A'));
});

describe('Form card render', () => {
  window.URL.createObjectURL = jest.fn();
  it('should render one card without errors', async () => {
    const { getByTestId, queryByTestId, findAllByTestId } = render(<Form />);
    const formElements = [
      TestIds.name,
      TestIds.surname,
      TestIds.date,
      TestIds.country,
      TestIds.consent,
      TestIds.gender,
      TestIds.image,
      TestIds.submit,
      TestIds.successMessage,
    ].map((id) => getByTestId(id));
    const [name, surname, date, country, consent, gender, image, submitBtn, message] = formElements;
    await act(() => createCard(name, surname, date, country, consent, gender, image, submitBtn));
    expect(message).toBeVisible();
    const cards = await findAllByTestId(TestIds.formCard);
    expect(cards.length).toBe(1);
    expect(queryByTestId(TestIds.error)).not.toBeInTheDocument();
  });
  it('should render ten cards without errors', async () => {
    const { getByTestId, queryByTestId, findAllByTestId } = render(<Form />);
    const formElements = [
      TestIds.name,
      TestIds.surname,
      TestIds.date,
      TestIds.country,
      TestIds.consent,
      TestIds.gender,
      TestIds.image,
      TestIds.submit,
      TestIds.successMessage,
    ].map((id) => getByTestId(id));
    const [name, surname, date, country, consent, gender, image, submitBtn, message] = formElements;

    for (let i = 0; i < 10; i++) {
      await act(() => createCard(name, surname, date, country, consent, gender, image, submitBtn));
      expect(message).toHaveClass('showMessage');
      expect(queryByTestId(TestIds.error)).not.toBeInTheDocument();
    }
    const cards = await findAllByTestId(TestIds.formCard);
    expect(cards.length).toBe(10);
  });
});
