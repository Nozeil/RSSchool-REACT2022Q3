import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import cl from './Layout.module.css';

class Layout extends React.Component {
  setActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${cl['active-link']} ${cl['nav-link']} link` : `${cl['nav-link']} link`;

  render() {
    return (
      <>
        <header className={`${cl.header} container`}>
          <nav className={cl.nav}>
            <NavLink end to="/" className={this.setActive}>
              Home
            </NavLink>
            <NavLink to="about" className={this.setActive}>
              About
            </NavLink>
            <NavLink to="404" className={this.setActive}>
              404
            </NavLink>
          </nav>
        </header>
        <main className="container">
          <Outlet />
        </main>
      </>
    );
  }
}

export default Layout;
