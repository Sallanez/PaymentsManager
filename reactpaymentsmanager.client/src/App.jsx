import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";

function App() {
  return (
    <>
      <main className="w-full fulls-h-screen">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route element={<ProtectedAdminRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route path='/payments' element={<Payments/>} />
        </Routes>
        </BrowserRouter>
      </main>
      <ToastContainer/>
    </>
  )
}

export default App
