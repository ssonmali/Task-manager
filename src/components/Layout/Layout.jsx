import React from "react";
import { NavLink } from "react-router-dom";
import { delete_cookie } from "../../utils/cookies";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const handleLogout = () => {
    delete_cookie("authorized");
    window.location.replace("/");
  };
  return (
    <div className={classes.mainContainer}>
      <div className={classes.sidebarContainer}>
        <div className={classes.logoName}>
          <img className={classes.logo} src="favicon.png" alt="logo" />
          Task Manager <br />
          <span className={classes.text}>by</span>
          <span>SSONMALI</span>
        </div>
        <div className={classes.sidebar}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.activeLink, classes.navLink].join(" ")
                : classes.navLink
            }
            to={"/dashboard"}
          >
            All tasks
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.activeLink, classes.navLink].join(" ")
                : classes.navLink
            }
            to={"/projects"}
          >
            By Projects
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.activeLink, classes.navLink].join(" ")
                : classes.navLink
            }
            to={"/members"}
          >
            By Members
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? [classes.activeLink, classes.navLink].join(" ")
                : classes.navLink
            }
            to={"/add"}
          >
            Add Task
          </NavLink>
        </div>
        <button
          className={classes.logoutButton}
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </button>
      </div>
      <div className={classes.offLayout}>{children}</div>
    </div>
  );
};

export default Layout;
