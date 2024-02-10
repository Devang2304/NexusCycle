import './App.css';
import { Navigate, Route, Routes } from "react-router-dom"
import Landing from './pages/Landing';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/UserContext"
import Login from './pages/Login';
import Register from './pages/Register';
import "./css_files/rohit.css";

function App() {
  const { token, setToken,isAuth, setIsAuth,setUser } = useContext(UserContext)

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to={"/dashboard"} />} />
      <Route path="/register" element={!isAuth ? <Register /> : <Navigate to={"/dashboard"} />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="dark"
      // transition:Bounce
    />
    </div>
  );
}

export default App;
