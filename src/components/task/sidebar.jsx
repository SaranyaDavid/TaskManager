import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import classes from "./sidebar.module.css";
import SideButton from "./sideButton";
import { TaskContext } from "../../store/taskcontext";
export default function SideBar({ children, handleAddCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  // const { handleFindDeleted } = useContext(TaskContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={classes.outer}>
      <div className={`main_box ${isOpen ? "active" : ""}`}>
        {isOpen && <input type="checkbox" id="check" checked={isOpen} />}
        <div className="btn_one">
          <label htmlFor="check" onClick={toggleSidebar}>
            {isOpen ? <></> : <FaBars />}
          </label>
        </div>
        <div className="sidebar_menu">
          <div className="logo">
            <a href="#">Filter Tasks</a>
          </div>
          <div>
            {isOpen && <input type="checkbox" id="check" checked={isOpen} />}
            <div className="btn_one">
              <label htmlFor="check" onClick={toggleSidebar}>
                {isOpen ? <FaTimes></FaTimes> : <FaBars />}
              </label>
            </div>
          </div>

          <div className="menu">
            <ul>
              {/* <li className="innerUl">
                <button onClick={() => handleAddCategory("All")}>
                  All Tasks
                </button>
              </li> */}
              {/* <SideButton
                section={["All Tasks"]}
                handleAddCategory={handleAddCategory}
              ></SideButton> */}
              <SideButton
                title="Status"
                section={["Completed", "To-Do"]}
                QR
                handleAddCategory={handleAddCategory}
              ></SideButton>
              <SideButton
                handleAddCategory={handleAddCategory}
                title="Priority"
                section={["Low", "Medium", "High"]}
                priority
              ></SideButton>
              <SideButton
                title="Category"
                section={["Work", "Personal"]}
                category
                handleAddCategory={handleAddCategory}
              ></SideButton>
              {/* <li className="innerUl">
                <button onClick={handleFindDeleted}>Bin</button>
              </li> */}
            </ul>
          </div>
        </div>
        <div className={classes.child}>{children}</div>
      </div>
    </div>
  );
}

