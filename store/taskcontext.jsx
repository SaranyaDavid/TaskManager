simport { createContext } from "react";
import { useState, useEffect } from "react";

export const TaskContext = createContext({
  task: [],
  completed: 0,
  pending: 0,
  filteredTask: [],
  addTask: () => {},
  updateTask: () => {},
  markAsComplete: () => {},
  changePriority: () => {},
  countOfTasks: () => {},
  deleteTask: () => {},
  handleFilterButtonClick: () => {},
  filterItems: () => {},
});

export default function TaskContextProdiver({ children }) {
  const [taskList, setTaskList] = useState({
    filteredTask: getLocalStorageTask(),
    primayKey: 0,
    task: [],
    completed: 0,
    pending: 0,
  });
  useEffect(() => {
    const value = getLocalStoragePrimaryKey();
    const data = getLocalStorageTask();
    localStorage.setItem("filters", JSON.stringify([]));
    localStorage.setItem("filteredTask", JSON.stringify(data));
    countOfTasks();
    localStorage.setItem("primaryKey", value);
  }, []);

  function addTask(text) {
    const tasks = getLocalStorageTask();
    const taskId = Number(getLocalStoragePrimaryKey()) + 1;
    const newTask = {
      taskId,
      ...text,
      subtask: { taskId, subtask: [...text.subtask] },
    };
    let updateTask = [];
    if (tasks) {
      updateTask = [...tasks, newTask];
    } else {
      updateTask = [newTask];
    }
    setLocalStorageTask(updateTask);
    setLocalStoragePrimaryKey(taskId);
    setTaskList((pre) => {
      return {
        ...pre,
        task: updateTask,
        primayKey: pre.primayKey + 1,
      };
    });
    filterItems();
  }

  function updateTask(data, id) {
    console.log("update" + id);
    let task = getLocalStorageTask();
    const value = task.filter((ele) => ele.taskId != id);
    const newValue = {
      taskId: id,
      ...data,
      subtask: { taskId: id, subtask: [...data.subtask] },
    };
    setLocalStorageTask([...value, newValue]);
    setTaskList((ele) => {
      return {
        ...ele,
        task: [...value, newValue],
      };
    });
    filterItems();
  }

  function markAsComplete(id) {
    const allTasks = getLocalStorageTask();
    const index = allTasks.findIndex((task) => task.taskId === id);
    const task = allTasks[index];
    const updatedTask = {
      ...task,
      status: "Completed",
    };
    allTasks[index] = updatedTask;
    setLocalStorageTask([...allTasks]);
    setTaskList((prevState) => {
      return {
        ...prevState,
        task: allTasks,
      };
    });
    countOfTasks();
    filterItems();
  }

  function changePriority(id) {
    const priority = ["Low", "Medium", "High"];
    const allTasks = getLocalStorageTask();
    const index = allTasks.findIndex((task) => task.taskId === id);
    const task = allTasks[index];
    let getPriority = priority.findIndex(
      (priority) => priority == task.priority
    );
    if (getPriority === 2) {
      getPriority = 0;
    } else {
      getPriority += 1;
    }
    const updatedTask = {
      ...task,
      priority: priority[getPriority],
    };
    allTasks[index] = updatedTask;
    setLocalStorageTask(allTasks);
    setTaskList((pre) => {
      return {
        ...pre,
        task: allTasks,
      };
    });
    filterItems();
  }

  function countOfTasks() {
    const total = taskList.task.filter((ele) => !ele.deleted);
    const completed = taskList.task.filter(
      (ele) => ele.status === "Completed" && !ele.deleted
    );
    setTaskList((ele) => {
      return {
        ...ele,
        completed: completed.length,
        pending: total.length - completed.length,
      };
    });
  }

  function deleteTask(id) {
    const allTasks = getLocalStorageTask();
    const index = allTasks.findIndex((task) => task.taskId === id);
    const task = allTasks[index];
    const data = {
      ...task,
      deleted: true,
    };
    allTasks[index] = data;
    setLocalStorageTask(allTasks);
    setTaskList((ele) => {
      const tasks = [...ele.task];
      const value = tasks.filter((work) => work.taskId != id);
      return {
        ...ele,
        task: value,
      };
    });
    console.log(taskList.task);
    filterItems();
  }

  function getTaskById(id) {
    const data = localStorage.getItem("task");
    const task = JSON.parse(data);
    const index = task.findIndex((ele) => ele.taskId == id);
    const existingTask = task[index];
    return existingTask;
  }

  function setLocalStorageTask(tasks) {
    localStorage.setItem("task", JSON.stringify(tasks));
  }

  function setLocalStoragePrimaryKey(primaryKey) {
    localStorage.setItem("primaryKey", primaryKey);
  }

  function setLocalStorageFilters(filters) {
    localStorage.setItem("filters", JSON.stringify(filters));
  }

  function getLocalStorageFilters() {
    const data = localStorage.getItem("filters");
    if (data) return JSON.parse(data);
    else return null;
  }

  function getLocalStoragePrimaryKey() {
    const data = localStorage.getItem("primaryKey");
    if (data) return data;
    else return 1;
  }

  function getLocalStorageTask() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("task");
      if (data) return JSON.parse(data);
    } else {
      return null;
    }
  }
  function getLocalStorageFilteredTasks() {
    const data = localStorage.getItem("filteredTask");
    if (data) return JSON.parse(data);
    else return null;
  }

  const handleFilterButtonClick = (selectedCategory) => {
    const filt = getLocalStorageFilters();
    const index = filt.findIndex((ele) => ele === selectedCategory);
    if (index === -1) {
      setLocalStorageFilters([...filt, selectedCategory]);
    } else {
      const data = filt.filter((ele) => ele != selectedCategory);
      setLocalStorageFilters([...data]);
    }
    filterItems();
  };
  // function handleFindDeleted() {
  //   const task = getLocalStorageTask();
  //   let temp = task.filter((ele) => ele.deleted);
  //   localStorage.setItem("filteredTask", JSON.stringify(temp));
  //   setTaskList((prevState) => {
  //     return {
  //       ...prevState,
  //       filteredTask: temp,
  //     };
  //   });
  //   console.log(taskList.filteredTask);
  // }
  const filterItems = () => {
    const task = getLocalStorageTask();
    const filt = getLocalStorageFilters();
    if (filt.length > 0) {
      let tempItems = filt.map((selectedCategory) => {
        console.log(task);
        let temp = task.filter(
          (ele) =>
            ele.category == selectedCategory ||
            ele.priority == selectedCategory ||
            ele.status === selectedCategory
        );
        return temp;
      });
      const uniqueTasks = [...new Set(tempItems.flat())];
      console.log("#$@$23");
      console.log(uniqueTasks);
      localStorage.setItem("filteredTask", JSON.stringify(uniqueTasks));
      setTaskList((prevState) => {
        return {
          ...prevState,
          filteredTask: uniqueTasks,
        };
      });
    } else {
      localStorage.setItem(
        "filteredTask",
        JSON.stringify(getLocalStorageTask())
      );
      setTaskList((prevState) => {
        return {
          ...prevState,
          filteredTask: getLocalStorageTask(),
        };
      });
    }
  };
  const ctxtValue = {
    task: getLocalStorageTask(),
    filteredTask: taskList.filteredTask,
    completed: taskList.completed,
    pending: taskList.pending,
    addTask: addTask,
    updateTask,
    markAsComplete,
    changePriority,
    countOfTasks,
    deleteTask,
    handleFilterButtonClick,
    filterItems,
    getTaskById,
    // handleFindDeleted,
  };

  return (
    <TaskContext.Provider value={ctxtValue}>{children}</TaskContext.Provider>
  );
}
