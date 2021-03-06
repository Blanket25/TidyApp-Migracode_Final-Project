import "./index.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";
import AdminPanel from "./pages/AdminPanel";
import EditTasks from "./pages/EditTasks";
import EditUsers from "./pages/EditUsers";
import EditFrequency from "./pages/EditFrequency";
import TasksInfo from "./pages/TasksInfo";
import NoOfRommies from "./pages/NoOfRommies";
import RoomiesInfo from "./pages/RoomiesInfo";
import TasksFrequency from "./pages/TasksFrequency";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks-info" element={<TasksInfo />} />
        <Route path="/tasks-frequency" element={<TasksFrequency />} />
        <Route path="/number-of-roomies" element={<NoOfRommies />} />
        <Route path="/board/:groupId" element={<Board />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/set_roomies" element={<RoomiesInfo />} />
        <Route path="/edit_users" element={<EditUsers />} />
        <Route path="/edit_tasks" element={<EditTasks />} />
        <Route path="/edit_frequency" element={<EditFrequency />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
