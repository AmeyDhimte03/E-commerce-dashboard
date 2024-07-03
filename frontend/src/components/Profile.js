import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsers(user);
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <ul className="profile">
      <li>
        Your Name: <b>{user.name}</b>
      </li>
      <li>
        Your Email: <b> {user.email}</b>
      </li>
      <li>
        <Link className="logout-option" onClick={logout} to="/signup">
         <b> Logout</b>
        </Link>
      </li>
      {/* <li>Thanks for using the website.</li>
      <li>Contact Us: ameydhimte03@gmail.com</li> */}
    </ul>
  );
};

export default Profile;
