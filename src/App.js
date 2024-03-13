import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskContextProdiver from "./store/taskcontext";
import NewTask from "./components/task/task";
import Home from "./components/home/home";
import TaskView from "./pages/TaskPage";
import NotFound from "./components/errorpages/NotFoundError";
import "./App.css";
import RootLayout from "./pages/RootPage";
import Edit from "./pages/EditPage";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      errorElement: <NotFound></NotFound>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "/task", element: <TaskView></TaskView> },
        { path: "/new-task", element: <NewTask></NewTask> },
        { path: "/edit-task/:id", element: <Edit></Edit> },
      ],
    },
  ]);
  return (
    <TaskContextProdiver>
      <RouterProvider router={route}></RouterProvider>
    </TaskContextProdiver>
  );
}

export default App;
