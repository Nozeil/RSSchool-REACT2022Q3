import { TestIds } from 'enums';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import cl from './Layout.module.css';

const Layout = () => {
  const setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${cl['active-link']} ${cl['nav-link']} link` : `${cl['nav-link']} link`;

  return (
    <>
      <header className={`${cl.header} container`}>
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
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
