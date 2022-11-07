import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import cl from './Home.module.css';
import ResultsPerPageDropdown from 'components/ResultsPerPageDropdown/ResultsPerPageDropdown';
import SortDropdown from 'components/SortDropdown/SortDropdown';
import { Pagination } from '@mui/material';
import TotalPagesDropdown from 'components/TotalPagesDropdown/TotalPagesDropdown';
import { RootState } from 'redux/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/hooks';
import updateStateAfterLoad from 'redux/thunks/updateStateAfterLoad';
import updateStateAfterPageChanged from 'redux/thunks/updateStateAfterPageChanged';

const Home = () => {
  const dispatch = useAppDispatch();
  const { page: currPage, pages, isLoading } = useSelector((state: RootState) => state);

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    dispatch(updateStateAfterLoad());
  }, [dispatch]);

  const content = isLoading ? <LoadingSpinner /> : <CardList />;

  const onChange = async (_: ChangeEvent<unknown>, page: number) => {
    dispatch(updateStateAfterPageChanged(page));
  };

  return (
    <>
      <div className={cl.controls}>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <SortDropdown />
        <ResultsPerPageDropdown />
        <TotalPagesDropdown />
      </div>
      <Pagination count={pages} page={currPage} onChange={onChange} disabled={isLoading} />
      {content}
    </>
  );
};

export default Home;
