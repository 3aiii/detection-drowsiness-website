import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import { APP_URL } from "./confidential";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/system" />
        <Route path="/profile" />

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
