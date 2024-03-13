import classes from "./task.module.css";
export default function TaskItem({ children, title, type, value }) {
  return (
    <>
      <label className={classes.label} htmlFor={title}>
        {children}
      </label>
      <input
        className={classes.input}
        type={type}
        name={title}
        id={title}
        defaultValue={value}
      />
    </>
  );
}
