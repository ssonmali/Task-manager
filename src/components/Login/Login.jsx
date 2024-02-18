import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import classes from "./Login.module.css";

const Login = ({ onLogIn }) => {
  const emptyFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(emptyFormData);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000 * 3600;
        now.setTime(expireTime);
        const user = userCredential.user;
        document.cookie = `authorized=${true};expires=${now.toUTCString()}`;
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Invalid Credentials. Please try again");
      });
  };
  return (
    <div className={classes.mainContainer}>
      <img className={classes.logo} src="favicon.png" alt="logo" />
      <p className={classes.logo}>Task Manager</p>
<p className={classes.logo}>by</p>
<p className={classes.logo}>SSONMALI</p>
      <form
        className={classes.formContainer}
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className={classes.formItem}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            id="email"
            type="email"
            maxLength={50}
          />
        </div>
        <div className={classes.formItem}>
          <label className={classes.password} htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            id="password"
            type="password"
          />
        </div>
        <div className={classes.buttonContainer}>
          <button
            type="submit"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
