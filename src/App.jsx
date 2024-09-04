
import './App.css'
import Patient from './Component/Entry/Patient'
import Login from './Component/Header/Login'
import DataTable from "./Component/DataTable/DataTable"
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './ContextApi/AuthContext';
import { useContext } from 'react';
import SecureRoute from './Component/DataTable/SecureRoute';


function App() {




  return (
    <>
      <AuthProvider>

        <Routes>
          <Route path='/' element={<SecureRoute><Login /></SecureRoute>} />
          <Route path='/dashboard' element={ <SecureRoute><DataTable /></SecureRoute>    } />
          <Route path='/addPatient' element={<SecureRoute><Patient /></SecureRoute> } />
        </Routes>

      </AuthProvider>





    </>
  )
}

export default App
