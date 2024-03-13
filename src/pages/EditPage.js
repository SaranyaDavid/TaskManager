import NewTask from "../components/task/task";
import { useContext } from "react";

import { TaskContext } from "../store/taskcontext";
import { useParams } from "react-router-dom";

export default function Edit() {
  const { getTaskById } = useContext(TaskContext);
  const param = useParams();
  return <NewTask value={getTaskById(param.id)}></NewTask>;
}
