import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from '../shared/SidebarNav';

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#f0f4f8',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '16px 32px',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  logoutBtn: {
    padding: '8px 20px',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  content: {
    padding: '40px 36px',
    flex: 1,
  },
  welcomeCard: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(21,101,192,0.1)',
    padding: '36px',
    maxWidth: '640px',
  },
  welcomeTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#1565c0',
    marginBottom: '8px',
  },
  welcomeSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '28px',
  },
  detailRow: {
    display: 'flex',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.95rem',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#374151',
    minWidth: '140px',
  },
  detailValue: {
    color: '#4b5563',
  },
};

function DoctorMyAccount() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/qualified-doctors/doctor/logout', { method: 'POST' });
    } catch {
      // proceed with client-side logout even if request fails
    } finally {
      sessionStorage.removeItem('currentUser');
      navigate('/qualified-doctors/doctor/register');
    }
  };

  return (
    <div style={styles.layout}>
      <SidebarNav basePath="/qualified-doctors/doctor" />
      <div style={styles.main}>
        <div style={styles.topBar}>
          <button style={styles.logoutBtn} onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
        <div style={styles.content}>
          <div style={styles.welcomeCard}>
            <h2 style={styles.welcomeTitle}>
              Welcome, Dr. {user.fullName || 'Doctor'}! 👋
            </h2>
            <p style={styles.welcomeSubtitle}>Here are your account details</p>
            {user.fullName && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Full Name</span>
                <span style={styles.detailValue}>{user.fullName}</span>
              </div>
            )}
            {user.email && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email</span>
                <span style={styles.detailValue}>{user.email}</span>
              </div>
            )}
            {user.mobileNumber && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Mobile Number</span>
                <span style={styles.detailValue}>{user.mobileNumber}</span>
              </div>
            )}
            {user.role && (
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Role</span>
                <span style={styles.detailValue}>{user.role}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorMyAccount;
