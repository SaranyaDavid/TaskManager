import TaskList from "../components/task/taskList";
import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../store/taskcontext";
import SideBar from "../components/task/sidebar";
import { NavLink } from "react-router-dom";
import classes from "./taskPage.module.css";
import { useNavigate } from "react-router-dom";
export default function TaskView() {
  const navigate = useNavigate();
  const { task, filteredTask, handleFilterButtonClick } =
    useContext(TaskContext);
  function handelClick(event) {
    event.preventDefault();
    navigate("/new-task");
  }
  return (
    <>
      <span className={classes.task}>
        <button onClick={handelClick}>Add Task</button>
      </span>
      <SideBar handleAddCategory={handleFilterButtonClick}>
        <TaskList tasks={filteredTask}></TaskList>
      </SideBar>
    </>
  );
}
