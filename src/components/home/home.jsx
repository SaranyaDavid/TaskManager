import classes from "./home.module.css";
import { useContext, useEffect } from "react";
import { TaskContext } from "../../store/taskcontext";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { pending, completed, countOfTasks } = useContext(TaskContext);
  useEffect(() => {
    countOfTasks();
  }, [pending, completed]);
  return (
    <div className={classes.bg}>
      <div className={classes.img}>
        <img
          className={classes.imgSize}
          src="https://as1.ftcdn.net/v2/jpg/01/69/11/06/1000_F_169110617_WOcjMFEU0gxDkASJxBpH8XiFjsXtWxHt.jpg"
          alt=""
        />
      </div>
      <div className={classes.text}>
        <h1>Manage Your Task Efficiently!</h1>
        <p>
          Our task management app helps users organize, prioritize, and track
          their tasks efficiently. Users can manage their tasks effectively,
          ensuring productivity and timely completion of projects and goals.
        </p>
        <div className={classes.box}>
          <div className={classes.boxinner}>
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>
          <div className={classes.boxinner}>
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>
        </div>

        <NavLink to="/task">
          <button className={classes.button}>Explore Tasks</button>
        </NavLink>
      </div>
    </div>
  );
}
