import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
// We use Link instead of anchor tag coz anchor tag refreshes the page
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {/* <img
            alt='logo'
            className='logo'
            src='shopping-cart.jpg' /> */}
      {auth ? (
        <ul className="nav-ul">
          <Link to="/" className="logo">
            <FontAwesomeIcon icon={faCartArrowDown} className="fa-xl" />
          </Link>

          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          {/* <li><Link to="/update"> Update Products</Link></li> */}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {/* <li>
            {" "}
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li> */}
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <Link to="/" className="logo">
            <FontAwesomeIcon icon={faCartArrowDown} className="fa-xl" />
          </Link>
          <li>
            {" "}
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
