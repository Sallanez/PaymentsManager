import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ProtectedUserRoute from "./Routes/ProtectedUserRoute";
import PaymentsSearch from "./pages/PaymentsSearch";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <BrowserRouter>
          <Navbar/>
          <main className="container flex-grow px-3 pb-12 mx-auto">
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='*' element={<h1>Not Found</h1>} />
                <Route element={<ProtectedAdminRoute/>}>
                  <Route path='/dashboard' element={<Dashboard/>} />
                </Route>
                <Route element={<ProtectedUserRoute/>}>
                  <Route path='/payments' element={<Payments/>} />
                  <Route path='/payments/search' element={<PaymentsSearch/>} />
                </Route>
              </Routes>
          </main>
        </BrowserRouter>
        <Footer/>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
