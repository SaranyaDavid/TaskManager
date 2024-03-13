import classes from "./tastList.module.css";
import { useContext } from "react";
import { TaskContext } from "../../store/taskcontext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

export default function TaskList({ tasks }) {
  const { markAsComplete, changePriority, deleteTask } =
    useContext(TaskContext);
  const param = useParams();
  const navigate = useNavigate();
  function handelEdit(id) {
    navigate("/edit-task/" + id);
  }
  const priorityColors = {
    Low: "#2ca22c",
    Medium: "yellow",
    High: "#da5858",
  };
  return (
    <ul className={classes.outer}>
      {tasks || (tasks && tasks.length === 0) ? (
        tasks.map(
          (ele) =>
            !ele.deleted && (
              <li key={ele.taskId}>
                <article className={classes.article}>
                  <div className={classes.headerText}>
                    <div className={classes.head}>
                      <h2>{ele.title}</h2>
                      <button
                        onClick={() => changePriority(ele.taskId)}
                        style={{
                          backgroundColor: priorityColors[ele.priority],
                        }}
                      >
                        {ele.priority}
                      </button>
                    </div>
                    <p className={classes.textContent}>{ele.description}</p>
                    <p>{ele.date}</p>
                    <p className={classes.category}>{ele.category}</p>
                  </div>
                  <div className={classes.buttonBox}>
                    <button
                      className={classes.status}
                      onClick={() => markAsComplete(ele.taskId)}
                    >
                      {ele.status == "Completed"
                        ? "Completed"
                        : "Mark As Completed"}
                    </button>
                    {ele.status == "To-Do" && (
                      <button
                        onClick={() => handelEdit(ele.taskId)}
                        className={classes.status}
                      >
                        Edit Task
                      </button>
                    )}
                    <RiDeleteBinLine
                      onClick={() => deleteTask(ele.taskId)}
                      size={32}
                    />
                  </div>
                </article>
              </li>
            )
        )
      ) : (
        <li>
          <p className={classes.error}>No Task!</p>
        </li>
      )}
    </ul>
  );
}
