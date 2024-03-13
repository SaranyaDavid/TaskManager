import { NavLink } from "react-router-dom";
import classes from "./header.module.css"; // Assuming you have a CSS module for styling

export default function NavLinker({ href, children }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => (isActive ? classes.active : "")}
    >
      {children}
    </NavLink>
  );
}
