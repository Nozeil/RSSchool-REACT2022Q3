import useAppContext from 'app/AppContext';
import { TestIds } from 'enums';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import cl from './Layout.module.css';

const Layout = () => {
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${cl.active} ${cl.link}` : `${cl.link}`;
  const setCardPageActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${cl.active} ${cl.link}` : `${cl.link} ${cl.hidden}`;
  const { id, title } = useAppContext().appState.cardPageData;
  const cardPagePath = `cardPage/${id || '*'}`;

  return (
    <>
      <header className={cl.header}>
        <div className="container">
          <nav className={cl.nav}>
            <NavLink end to="/" className={setActive} data-testid={TestIds.home}>
              Home
            </NavLink>
            <NavLink to="about" className={setActive} data-testid={TestIds.about}>
              About
            </NavLink>
            <NavLink to="404" className={setActive} data-testid={TestIds.errorPage}>
              404
            </NavLink>
            <NavLink to="forms" className={setActive} data-testid={TestIds.forms}>
              Forms
            </NavLink>
            <NavLink to={cardPagePath} className={setCardPageActive}>
              {title}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
