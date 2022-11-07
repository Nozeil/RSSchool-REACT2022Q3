import { SortDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import updateStateAfterSortChanged from 'redux/thunks/updateStateAfterSortChanged';
import cl from './../../pages/Home/Home.module.css';

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const { homeCardsSort, isLoading } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateStateAfterSortChanged(e));
  };

  const sortClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select onChange={onChange} defaultValue={homeCardsSort} className={sortClass}>
      <option value={SortDropdownValues.viewsDesc}>Views &darr;</option>
      <option value={SortDropdownValues.viewsAsc}>Views &uarr;</option>
      <option value={SortDropdownValues.dateDesc}>Date &darr;</option>
      <option value={SortDropdownValues.dateAsc}>Date &uarr;</option>
    </select>
  );
};

export default SortDropdown;
