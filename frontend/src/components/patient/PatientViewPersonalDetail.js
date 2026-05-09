import React, { useState, useEffect } from 'react';
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
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1565c0',
    margin: 0,
  },
  editBtn: {
    padding: '8px 20px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelBtn: {
    padding: '8px 20px',
    background: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '10px',
  },
  detailRow: {
    display: 'flex',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#374151',
    minWidth: '160px',
  },
  detailValue: {
    color: '#4b5563',
  },
  metaRow: {
    marginTop: '20px',
    fontSize: '0.82rem',
    color: '#94a3b8',
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
  },
  actionRow: {
    display: 'flex',
    marginTop: '8px',
  },
  saveBtn: {
    flex: 1,
    padding: '12px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
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
  loadingText: {
    color: '#64748b',
    fontSize: '1rem',
  },
  noDataText: {
    color: '#64748b',
    fontSize: '0.95rem',
  },
};

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

function formatDateTime(isoDateTime) {
  if (!isoDateTime) return '—';
  const dt = new Date(isoDateTime);
  return dt.toLocaleString();
}

function PatientViewPersonalDetail() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [editing, setEditing] = useState(false);
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

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/qualified-doctors/patient/view-personal-details', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else if (response.status === 401) {
        navigate('/qualified-doctors/patient/login');
      } else if (response.status === 404) {
        setDetails(null);
      } else {
        setErrorMsg('Failed to load personal details.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setForm({
      fullName: details.fullName || '',
      dateOfBirth: details.dateOfBirth || '',
      age: details.age != null ? String(details.age) : '',
      height: details.height != null ? String(details.height) : '',
      weight: details.weight != null ? String(details.weight) : '',
    });
    setSuccessMsg('');
    setErrorMsg('');
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSave = async (e) => {
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
      const response = await fetch('/qualified-doctors/patient/update-personal-details', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updated = await response.json();
        setDetails(updated);
        setEditing(false);
        setSuccessMsg('Personal details updated successfully!');
      } else if (response.status === 401) {
        navigate('/qualified-doctors/patient/login');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.message || 'Failed to update personal details.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
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

  const renderView = () => {
    if (!details) {
      return (
        <p style={styles.noDataText}>
          No personal details found. Please{' '}
          <span
            style={{ color: '#1565c0', cursor: 'pointer', fontWeight: '600' }}
            onClick={() => navigate('/qualified-doctors/patient/add-personal-details')}
          >
            add your personal details
          </span>
          .
        </p>
      );
    }

    return (
      <>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Full Name</span>
          <span style={styles.detailValue}>{details.fullName || '—'}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Date of Birth</span>
          <span style={styles.detailValue}>{formatDate(details.dateOfBirth)}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Age</span>
          <span style={styles.detailValue}>{details.age != null ? details.age : '—'}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Height (cm)</span>
          <span style={styles.detailValue}>{details.height != null ? details.height : '—'}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Weight (kg)</span>
          <span style={styles.detailValue}>{details.weight != null ? details.weight : '—'}</span>
        </div>
        <div style={styles.metaRow}>
          Last updated: {formatDateTime(details.updatedDateTime)}
        </div>
      </>
    );
  };

  const renderEditForm = () => (
    <form onSubmit={handleSave} noValidate>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="fullName">Full Name *</label>
        <input
          style={styles.input}
          id="fullName"
          name="fullName"
          type="text"
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
          min="0"
          step="0.1"
          value={form.weight}
          onChange={handleChange}
        />
      </div>
      <div style={styles.actionRow}>
        <button type="button" style={styles.cancelBtn} onClick={handleCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" style={styles.saveBtn} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );

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
            <div style={styles.titleRow}>
              <h2 style={styles.title}>Personal Details</h2>
              {!editing && details && (
                <button style={styles.editBtn} onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>

            {loading ? (
              <p style={styles.loadingText}>Loading…</p>
            ) : editing ? (
              renderEditForm()
            ) : (
              renderView()
            )}

            {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
            {errorMsg && <div style={styles.errorMsg}>{errorMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientViewPersonalDetail;
