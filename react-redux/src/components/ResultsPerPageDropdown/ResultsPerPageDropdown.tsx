import { ResultsPerPageDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import updateStateAfterPerPageValueChanged from 'redux/thunks/updateStateAfterPerPageValueChanged';
import cl from './../../pages/Home/Home.module.css';

const ResultsPerPageDropdown = () => {
  const dispatch = useAppDispatch();
  const { resultsPerPage, isLoading } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateStateAfterPerPageValueChanged(e));

  const ResultsPerPageClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select defaultValue={resultsPerPage} className={ResultsPerPageClass} onChange={onChange}>
      <option value={ResultsPerPageDropdownValues.ten}>10 cards per page</option>
      <option value={ResultsPerPageDropdownValues.twenty}>20 cards per page</option>
      <option value={ResultsPerPageDropdownValues.thirty}>30 cards per page</option>
      <option value={ResultsPerPageDropdownValues.fifty}>50 cards per page</option>
      <option value={ResultsPerPageDropdownValues.oneHundred}>100 cards per page</option>
    </select>
  );
};

export default ResultsPerPageDropdown;
