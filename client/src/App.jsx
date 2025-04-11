import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/authLayout";
import Index from "./pages/Index";
import IndexLayout from "./layouts/IndexLayout";
import Profile from "./pages/user/Profile";
import System from "./pages/user/System";

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
        </Route>

        <Route path="/admin/dashboard" />
        <Route path="/admin/history" />
        <Route path="/admin/user" />
        <Route path="/admin/create/user" />
        <Route path="/admin/edit/user/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
