// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const Profile = () => {
//   const [user, setUsers] = useState([]);
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     setUsers(user);
//   }, []);

//   const navigate = useNavigate();
//   const logout = () => {
//     localStorage.clear();
//     navigate("/signup");
//   };

//   return (
//     <ul className="profile">
//       <li>
//         Your Name: <b>{user.name}</b>
//       </li>
//       <li>
//         Your Email: <b> {user.email}</b>
//       </li>
//       <li>
//         <Link className="logout-option" onClick={logout} to="/signup">
//          <b> Logout</b>
//         </Link>
//       </li>
//     </ul>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Handle case where user data is not available in localStorage
      navigate("/signup"); // Redirect to signup page if user data is not found
    }
  }, [navigate]);

  const logout = () => {
    // Clear localStorage and redirect to signup page on logout
    localStorage.clear();
    navigate("/signup");
  };

  if (!user) {
    return null; // Render nothing if user data is not available yet
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <ul>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <Link className="logout-option" onClick={logout} to="/signup">
            <strong>Logout</strong>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
