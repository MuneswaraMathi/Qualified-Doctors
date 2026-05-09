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
  },
  content: {
    padding: '40px 36px',
    flex: 1,
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(21,101,192,0.1)',
    padding: '36px',
    maxWidth: '560px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1565c0',
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: '#1e293b',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  successMsg: {
    marginTop: '16px',
    padding: '12px 16px',
    background: '#dcfce7',
    color: '#166534',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  errorMsg: {
    marginTop: '16px',
    padding: '12px 16px',
    background: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
};

function PatientPersonalDetail() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    age: '',
    height: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    const payload = {
      fullName: form.fullName,
      dateOfBirth: form.dateOfBirth,
      age: parseInt(form.age, 10),
      height: form.height ? parseFloat(form.height) : null,
      weight: form.weight ? parseFloat(form.weight) : null,
    };

    try {
      const response = await fetch('/qualified-doctors/patient/add-personal-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMsg('Personal details saved successfully!');
        setForm({ fullName: '', dateOfBirth: '', age: '', height: '', weight: '' });
      } else if (response.status === 401) {
        setErrorMsg('Session expired. Please log in again.');
        setTimeout(() => navigate('/qualified-doctors/patient/login'), 2000);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.message || 'Failed to save personal details. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/qualified-doctors/patient/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // proceed with client-side logout even if request fails
    } finally {
      sessionStorage.removeItem('currentUser');
      navigate('/qualified-doctors/patient/login');
    }
  };

  return (
    <div style={styles.layout}>
      <SidebarNav basePath="/qualified-doctors/patient" role="patient" />
      <div style={styles.main}>
        <div style={styles.topBar}>
          <button style={styles.logoutBtn} onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
        <div style={styles.content}>
          <div style={styles.card}>
            <h2 style={styles.title}>Add Personal Details</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="fullName">Full Name *</label>
                <input
                  style={styles.input}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  style={styles.input}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="age">Age *</label>
                <input
                  style={styles.input}
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  min="0"
                  max="150"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="height">Height (cm)</label>
                <input
                  style={styles.input}
                  id="height"
                  name="height"
                  type="number"
                  placeholder="Enter your height in cm"
                  min="0"
                  step="0.1"
                  value={form.height}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="weight">Weight (kg)</label>
                <input
                  style={styles.input}
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Enter your weight in kg"
                  min="0"
                  step="0.1"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>

              <button style={styles.submitBtn} type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save Personal Details'}
              </button>
            </form>

            {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
            {errorMsg && <div style={styles.errorMsg}>{errorMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPersonalDetail;
