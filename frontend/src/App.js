import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminRegister from './components/admin/AdminRegister';
import AdminMyAccount from './components/admin/AdminMyAccount';
import DoctorRegister from './components/doctor/DoctorRegister';
import DoctorMyAccount from './components/doctor/DoctorMyAccount';
import PatientRegister from './components/patient/PatientRegister';
import PatientMyAccount from './components/patient/PatientMyAccount';

function ProtectedRoute({ children, redirectTo }) {
  const user = sessionStorage.getItem('currentUser');
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qualified-doctors/home" element={<HomePage />} />
        <Route path="/qualified-doctors/admin/register" element={<AdminRegister />} />
        <Route
          path="/qualified-doctors/admin/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/admin/register">
              <AdminMyAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/qualified-doctors/doctor/register" element={<DoctorRegister />} />
        <Route
          path="/qualified-doctors/doctor/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/doctor/register">
              <DoctorMyAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/qualified-doctors/patient/register" element={<PatientRegister />} />
        <Route
          path="/qualified-doctors/patient/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/patient/register">
              <PatientMyAccount />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
