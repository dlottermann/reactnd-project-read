import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { capitalizeFirstLetter } from "../utils/func";


const Nav = props => {
  const { categories } = props;
  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <NavLink to="/new" activeClassName="active">
            New Post
          </NavLink>
        </li>
        {!Object.keys(categories).length
          ? null
          : Object.values(categories).map(category => (
              <li key={ category.path } className="nav-item">
                <NavLink to={ `/posts/${category.path}` } activeClassName="active">
                 { capitalizeFirstLetter(category.name) }
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

function mapStateToProps(state) {
  const { categories } = state;
  return {
    categories
  };
}

export default connect(mapStateToProps)(Nav);
