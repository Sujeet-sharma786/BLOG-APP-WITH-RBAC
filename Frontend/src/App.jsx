import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PermissionPage from "./pages/PermissionPage";
import DashboardPage from "./pages/DashboardPage";
import RolePage from "./pages/RolePage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import LandingPage from "./pages/Landing";
import Register from './pages/Register';
import Login from "./pages/Login";
import AddBlogs from "./pages/AddBlog/AddBlogs";
import YourBlogs from "./pages/YourBlogs/yourBlogs";
import Blogs from "./pages/Blogs/Blogs";
import WriteBook from "./pages/writeBook/writeBook";
import Library from "./pages/Library/Library";
import BookDetails from "./pages/BookDetails/BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/permissions" element={<PermissionPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/add-blog" element={<AddBlogs/>} />
        <Route path="/my-blogs" element={<YourBlogs/>} />
         <Route path="/blogs" element={<Blogs/>} />
         <Route path="/write-book" element={<WriteBook/>} />
         <Route path="/book-store" element={<Library/>} />
          <Route path="/book/:id" element={<BookDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
