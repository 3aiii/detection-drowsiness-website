import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/authLayout";
import Index from "./pages/Index";
import IndexLayout from "./layouts/IndexLayout";
import Profile from "./pages/user/Profile";
import System from "./pages/user/System";
import HistoryIndex from "./pages/admin/history/Index";
import UserIndex from "./pages/admin/users/Index";
import Create from "./pages/admin/users/Create";
import Edit from "./pages/admin/users/Edit";
import History from "./pages/admin/history/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<IndexLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/system" element={<System />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/history" element={<HistoryIndex />} />
          <Route path="/admin/view/history/:id" element={<History />} />
          <Route path="/admin/user" element={<UserIndex />} />
          <Route path="/admin/create/user" element={<Create />} />
          <Route path="/admin/edit/user/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
