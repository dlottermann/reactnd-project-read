import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => { 
  const { categories } = props
  return (
  <nav className="navbar">
    <ul>
      <li className='nav-item'>
        <NavLink to="/new" activeClassName="active">
          New Post
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      { !Object.keys(categories).length
        ? null
        : categories.map( c => (<li>oi</li>)) 
      }
    </ul>
  </nav>
)
}

function mapStateToProps(state){
  const { categories } = state
  return{
    categories
  }
}

export default connect(mapStateToProps)(Nav);
