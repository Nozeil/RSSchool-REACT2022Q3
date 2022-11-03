import React from 'react';
import Form from './Form';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Countries, ErrorMessages } from './Form.enums';
import { TestIds } from 'enums';
import { AppProvider } from 'AppContext';
const checkElement = (id: string) => expect(render(<Form />).getByTestId(id)).toBeInTheDocument();

const submitChangedValue = async (elem: HTMLElement, btn: HTMLElement, value: string) => {
  const user = userEvent.setup();
  if (value) {
    elem instanceof HTMLSelectElement
      ? await user.selectOptions(elem, value)
      : await user.type(elem, value);
  }
  await user.click(btn);
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
  const user = userEvent.setup();

  await user.type(name, 'name');
  await user.type(surname, 'surname');
  await user.type(date, '2000-02-02');
  await user.selectOptions(country, Countries.Belarus);
  await user.click(consent);
  await user.click(gender);
  await user.upload(image, file);
  await user.click(btn);
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
  it('submit button should be enabled after changing value in input ', async () => {
    const { getByTestId } = render(
      <AppProvider>
        <Form />
      </AppProvider>
    );
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];
    const user = userEvent.setup();
    await user.type(nameField, '1');
    expect(submitBtn).not.toHaveClass('disabled');
  });
  it('should show errors when all fields are not valid and not to create card', async () => {
    const { getByTestId, findByTestId, findAllByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];
    await submitChangedValue(nameField, submitBtn, 'A');
    const list = await findByTestId(TestIds.formCardList);
    const errors = await findAllByTestId(TestIds.error);
    expect(errors.length).toBe(6);
    errors.forEach((error) => expect(error).toBeInTheDocument());
    expect(list.children.length).toBeFalsy();
  });

  it('submit button should be disabled after click on it', async () => {
    const { getByTestId } = render(<Form />);
    const [nameField, submitBtn] = [getByTestId(TestIds.name), getByTestId(TestIds.submit)];
    await submitChangedValue(nameField, submitBtn, 'A');
    await waitFor(() => expect(submitBtn).toHaveClass('disabled'));
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
  jest.setTimeout(10000);
  window.URL.createObjectURL = jest.fn();
  it('should render one card without errors', async () => {
    const { getByTestId, queryByTestId, findAllByTestId } = render(
      <AppProvider>
        <Form />
      </AppProvider>
    );
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
    await createCard(name, surname, date, country, consent, gender, image, submitBtn);
    expect(message).toBeVisible();
    const cards = await findAllByTestId(TestIds.formCard);
    expect(cards.length).toBe(1);
    expect(queryByTestId(TestIds.error)).not.toBeInTheDocument();
  });
  it('should render ten cards without errors', async () => {
    const { getByTestId, queryByTestId, findAllByTestId } = render(
      <AppProvider>
        <Form />
      </AppProvider>
    );
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

    for (let i = 0; i <= 10; i++) {
      await createCard(name, surname, date, country, consent, gender, image, submitBtn);
      expect(message).toBeVisible();
      expect(queryByTestId(TestIds.error)).not.toBeInTheDocument();
    }
    const cards = await findAllByTestId(TestIds.formCard);
    expect(cards.length).toBe(10);
  });
});
