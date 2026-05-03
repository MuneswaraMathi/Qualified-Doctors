import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    background: '#1565c0',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    flexShrink: 0,
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    background: '#0d47a1',
  },
  logoText: {
    fontSize: '1.1rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  nav: {
    padding: '20px 0',
    flex: 1,
  },
  sectionHeader: {
    fontSize: '0.7rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: 'rgba(255,255,255,0.6)',
    padding: '8px 20px 4px',
    marginTop: '12px',
  },
  navLink: {
    display: 'block',
    padding: '10px 20px 10px 32px',
    fontSize: '0.92rem',
    color: 'rgba(255,255,255,0.85)',
    transition: 'background 0.15s ease, color 0.15s ease',
    borderLeft: '3px solid transparent',
  },
  navLinkActive: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    borderLeft: '3px solid #fff',
  },
};

function QDLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="6" fill="white" fillOpacity="0.2" />
      <rect x="13" y="6" width="4" height="18" rx="2" fill="white" />
      <rect x="6" y="13" width="18" height="4" rx="2" fill="white" />
    </svg>
  );
}

function SidebarNav({ basePath, role }) {
  const getLinkStyle = ({ isActive }) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : {}),
  });

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoArea}>
        <QDLogo />
        <span style={styles.logoText}>Qualified Doctors</span>
      </div>
      <nav style={styles.nav}>
        {role === 'doctor' && (
          <>
            <div style={styles.sectionHeader}>Professional Details</div>
            <NavLink to={`${basePath}/add-professional-details`} style={getLinkStyle}>
              Add Professional Details
            </NavLink>
            <NavLink to={`${basePath}/view-professional-details`} style={getLinkStyle}>
              View Professional Details
            </NavLink>

            <div style={styles.sectionHeader}>Hospital Details</div>
            <NavLink to={`${basePath}/add-hospital-details`} style={getLinkStyle}>
              Add Hospital Details
            </NavLink>
            <NavLink to={`${basePath}/view-hospital-details`} style={getLinkStyle}>
              View Hospital Details
            </NavLink>

            <div style={styles.sectionHeader}>Appointment Details</div>
            <NavLink to={`${basePath}/view-appointment-details`} style={getLinkStyle}>
              View Appointment Details
            </NavLink>
          </>
        )}

        {role === 'patient' && (
          <>
            <div style={styles.sectionHeader}>Personal Details</div>
            <NavLink to={`${basePath}/add-personal-details`} style={getLinkStyle}>
              Add Personal Details
            </NavLink>
            <NavLink to={`${basePath}/view-personal-details`} style={getLinkStyle}>
              View Personal Details
            </NavLink>

            <div style={styles.sectionHeader}>Problem Details</div>
            <NavLink to={`${basePath}/add-problem-details`} style={getLinkStyle}>
              Add Problem Details
            </NavLink>
            <NavLink to={`${basePath}/view-problem-details`} style={getLinkStyle}>
              View Problem Details
            </NavLink>

            <div style={styles.sectionHeader}>Appointment Details</div>
            <NavLink to={`${basePath}/add-appointment-details`} style={getLinkStyle}>
              Add Appointment Details
            </NavLink>
            <NavLink to={`${basePath}/view-appointment-details`} style={getLinkStyle}>
              View Appointment Details
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default SidebarNav;
