import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/home/home.page"
import Login from "./pages/login/login.page"
import Register from "./pages/register/register.page"
import Profile from "./pages/profile/profile.page"
import Admin from "./pages/admin/admin.page"
import NotFound from "./pages/not-found/notfound.page"
import UnAuthorized from "./pages/unauthorized/unauthorized.page"

function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
        <div className='container'>
          <Route path="/" component={Home}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/profile" element={
            <AuthGuard roles={[Role.ADMIN,Role.USER]}>
                <Profile/>
            </AuthGuard>
          }/>
          
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/404" element={<NotFound/>}/>
          <Route path="/401" element={<UnAuthorized/>}/>
        </div>
        </Routes>
        
    </BrowserRouter>
      
    </>
  );
}

export default App;
