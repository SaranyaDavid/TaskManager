import { FaBars, FaTimes } from "react-icons/fa";
import classes from "./header.module.css";
import { useState } from "react";
import NavLinker from "./NavLink";

export default function Header(prop) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const showNavbar = () => {
    console.log("Hello");
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <header className={classes.header}>
        <h3>TASK MANAGER</h3>
        <button className={classes.navBtn} onClick={showNavbar}>
          <FaBars />
        </button>
        <nav
          className={`${classes.nav} ${isNavOpen ? classes.responsiveNav : ""}`}
        >
          <NavLinker href="/">Home</NavLinker>
          <NavLinker href="/task">Task</NavLinker>
          <NavLinker href="/new-task">Add Task</NavLinker>
          <button
            className={`${classes.navBtn} ${classes.navCloseBtn}`}
            onClick={showNavbar}
          >
            <FaTimes />
          </button>
        </nav>
      </header>
      {prop.children}
    </>
  );
}
