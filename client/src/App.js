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
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminStakeholder from './pages/Admin/AdminStakeholder';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminMain from './pages/Admin/AdminMain';
import ProjectList from './components/ScrumMaster/ProjectList';
import ProductOwnerMain from './pages/ProductOwner/ProductOwnerMain';

function App() {
  const { token, setToken, isAuth, setIsAuth, setUser, user } = useContext(UserContext)

  useEffect(() => {
    console.log("user=", user)
  }, [user])

  return (
    <div className="App">
      <ProjectList/>
      {
        user === null && <>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </>
      }
      {
        user !== null && user.role === 'admin' && <>
          <AdminMain />
        </>
      }
      {
        user!==null&&user.role==='scrummaster'&&<>
        <div>ScrumMaster</div>
        </>
      }
      {
        user!==null&&user.role==='productowner'&&<>
        <ProductOwnerMain/>
        </>
      }

      {/* <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to={"/dashboard"} />} />
        <Route path="/register" element={!isAuth ? <Register /> : <Navigate to={"/dashboard"} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes> */}
      <div>
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
        />
      </div>
    </div>
  );
}

export default App;
