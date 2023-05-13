import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useContext} from "react";

import './style.scss';
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import {AuthContext} from "./context/AuthContext.js";

function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return (
          <Navigate to='/login'/>
      )
    }
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route
                index
                element={
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                }
            />
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
