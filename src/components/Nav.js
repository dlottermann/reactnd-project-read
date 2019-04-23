import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav className="navbar">
    <ul>
      <li className='nav-item'>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to="/new" activeClassName="active">
          New Post
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
