import { TotalPagesDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import updateStateAfterTotalPagesChanged from 'redux/thunks/updateStateAfterTotalPagesChanged';
import cl from './../../pages/Home/Home.module.css';

const TotalPagesDropdown = () => {
  const dispatch = useAppDispatch();
  const { pagesMaxSize, isLoading } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(updateStateAfterTotalPagesChanged(e));

  const TotalPagesClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select className={TotalPagesClass} defaultValue={pagesMaxSize} onChange={onChange}>
      <option value={TotalPagesDropdownValues.ten}>10 pages</option>
      <option value={TotalPagesDropdownValues.twentyFive}>25 pages</option>
      <option value={TotalPagesDropdownValues.fifty}>50 pages</option>
    </select>
  );
};

export default TotalPagesDropdown;
