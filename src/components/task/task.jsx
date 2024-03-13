import { useContext, useRef, useState, useEffect } from "react";
import { TaskContext } from "../../store/taskcontext";
import classes from "./task.module.css";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";

export default function NewTask({ value }) {
  const subtask = useRef();
  const navigate = useNavigate();
  const { addTask, updateTask, task } = useContext(TaskContext);
  const [subTask, setSubtask] = useState([]);
  console.log(value);
  useEffect(() => {
    if (value) {
      setSubtask([...value.subtask.subtask]);
    }
  }, []);

  async function handleAddTask(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    if (title === "") {
      alert("Please Enter Title!");
      return;
    }
    const task = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      priority: formData.get("priority"),
      category: formData.get("category"),
      status: "To-Do",
      subtask: subTask,
    };
    if (value) {
      updateTask(task, value.taskId);
    } else addTask(task);
    console.log(task);
    navigate("/task");
  }

  function handleAddSubTask(event) {
    event.preventDefault();
    const task = subtask.current.value;
    const check = subTask.includes(task);
    if (task === "") {
      alert("Enter Subtask To add!");
      return;
    }
    if (check) {
      alert("Task Already Present!");
      return;
    }
    setSubtask((pre) => [...pre, task]);
    subtask.current.value = "";
  }

  function handleClerSubTask(data) {
    const sub = [...subTask];
    const updatedSubtask = sub.filter((ele) => ele != data);
    setSubtask([...updatedSubtask]);
  }

  return (
    <div className={classes.outer}>
      <img
        className={classes.img}
        src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuJTIwYW5kJTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D"
        alt=""
      />
      <form className={classes.form} onSubmit={handleAddTask}>
        <h1>{value ? "Edit Task" : "Add Task"}</h1>
        <TaskItem title="title" type="text" value={value ? value.title : ""}>
          Task Title
        </TaskItem>
        <label className={classes.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={classes.textarea}
          name="description"
          id="description"
          defaultValue={value ? value.description : ""}
        ></textarea>
        <TaskItem title="date" type="date" value={value ? value.date : ""}>
          Due Date
        </TaskItem>

        <div className={classes.option}>
          <label className={classes.label} htmlFor="priority">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            defaultValue={value ? value.priority : ""}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label className={classes.label} htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            defaultValue={value ? value.category : ""}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <button className={classes.button}>{value ? "Update" : "Add"}</button>
      </form>
      <div className={classes.subtask}>
        <label className={classes.label} htmlFor="subtask">
          Sub-Task
        </label>
        <input
          className={classes.input}
          type="text"
          name="subtask"
          ref={subtask}
        />
        <button className={classes.show} onClick={handleAddSubTask}>
          +
        </button>
        {subTask.length > 0 && (
          <ul className={classes.subTaskClass}>
            {subTask.map((ele) => (
              <li>
                <p>{ele}</p>
                <button onClick={() => handleClerSubTask(ele)}>Clear</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
