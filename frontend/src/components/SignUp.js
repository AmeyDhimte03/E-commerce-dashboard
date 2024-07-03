import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // a hook used for redirecting

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false); // Additional state for email error
  const [userExists, setUserExists] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // if user authenticated hai toh chahkar bi signup page pe nhi aasakta
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const collectData = async () => {
    if (!name || !email || !password) {
      setError(true); //see line 9
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError(true); // Set email error state if email is invalid
      return false;
    }
    // console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(result);
    if (result.status === 400) {
    //   const data = await result.json();
    //   if (data.message === "User already exists") {
        setUserExists(true);
        return;
    //   }
    }

    result = await result.json();
    // console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {(error && !email && (
        <span className="invalid-input">Cannot be empty</span>
      )) ||
        (emailError && (
          <span className="invalid-input">Enter a valid email address</span>
        ))}
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && !password && (
        <span className="invalid-input">Enter valid password</span>
      )}

      {userExists && <span className="invalid-input">User already exists. Please try logging in.</span>}

      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
