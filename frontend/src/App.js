import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import AdminMyAccount from './components/admin/AdminMyAccount';
import DoctorLogin from './components/doctor/DoctorLogin';
import DoctorRegister from './components/doctor/DoctorRegister';
import DoctorMyAccount from './components/doctor/DoctorMyAccount';
import PatientLogin from './components/patient/PatientLogin';
import PatientRegister from './components/patient/PatientRegister';
import PatientMyAccount from './components/patient/PatientMyAccount';
import PatientPersonalDetail from './components/patient/PatientPersonalDetail';
import PatientViewPersonalDetail from './components/patient/PatientViewPersonalDetail';

function ProtectedRoute({ children, redirectTo, requiredRole }) {
  const raw = sessionStorage.getItem('currentUser');
  if (!raw) {
    return <Navigate to={redirectTo} replace />;
  }
  try {
    const user = JSON.parse(raw);
    if (requiredRole && user.role && user.role.toLowerCase() !== requiredRole.toLowerCase()) {
      return <Navigate to={redirectTo} replace />;
    }
  } catch {
    sessionStorage.removeItem('currentUser');
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
        <Route path="/qualified-doctors/admin/login" element={<AdminLogin />} />
        <Route path="/qualified-doctors/admin/register" element={<AdminRegister />} />
        <Route
          path="/qualified-doctors/admin/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/admin/register" requiredRole="admin">
              <AdminMyAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/qualified-doctors/doctor/login" element={<DoctorLogin />} />
        <Route path="/qualified-doctors/doctor/register" element={<DoctorRegister />} />
        <Route
          path="/qualified-doctors/doctor/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/doctor/register" requiredRole="doctor">
              <DoctorMyAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/qualified-doctors/patient/login" element={<PatientLogin />} />
        <Route path="/qualified-doctors/patient/register" element={<PatientRegister />} />
        <Route
          path="/qualified-doctors/patient/myaccount"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/patient/register" requiredRole="patient">
              <PatientMyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qualified-doctors/patient/add-personal-details"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/patient/login" requiredRole="patient">
              <PatientPersonalDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qualified-doctors/patient/view-personal-details"
          element={
            <ProtectedRoute redirectTo="/qualified-doctors/patient/login" requiredRole="patient">
              <PatientViewPersonalDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
