import "./index.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";
import AdminPanel from "./pages/AdminPanel";
import CreateGroup from "./pages/CreateGroup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create_group" element={<CreateGroup />} />
        <Route path="/board" element={<Board />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
