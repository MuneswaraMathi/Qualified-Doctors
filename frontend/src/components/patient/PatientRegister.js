import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e3f0ff 0%, #f0f4f8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(21,101,192,0.12)',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '460px',
  },
  heading: {
    fontSize: '1.7rem',
    fontWeight: '700',
    color: '#1565c0',
    marginBottom: '6px',
  },
  subheading: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '28px',
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
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
    outline: 'none',
    transition: 'border-color 0.2s',
    color: '#1a202c',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.82rem',
    marginTop: '4px',
  },
  apiError: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.88rem',
    color: '#64748b',
  },
  link: {
    color: '#1565c0',
    fontWeight: '600',
  },
};

function PatientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!form.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/qualified-doctors/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          mobileNumber: form.mobileNumber,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setApiError(data.message || 'Registration failed. Please try again.');
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify({ ...data, role: 'patient' }));
        navigate('/qualified-doctors/patient/myaccount');
      }
    } catch {
      setApiError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🧑‍🤝‍🧑 Patient Registration</h2>
        <p style={styles.subheading}>Create your patient account to get started</p>
        {apiError && <div style={styles.apiError}>{apiError}</div>}
        <form onSubmit={handleSubmit} noValidate>
          {[
            { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Jane Doe' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'jane@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: '••••••••' },
            { label: 'Mobile Number', name: 'mobileNumber', type: 'tel', placeholder: '+1 555 000 0000' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} style={styles.formGroup}>
              <label style={styles.label} htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  borderColor: errors[name] ? '#dc2626' : '#cbd5e1',
                }}
              />
              {errors[name] && <p style={styles.errorText}>{errors[name]}</p>}
            </div>
          ))}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/qualified-doctors/patient/login" style={styles.link}>Login</Link>
          {' · '}
          <Link to="/qualified-doctors/home" style={styles.link}>← Home</Link>
        </p>
      </div>
    </div>
  );
}

export default PatientRegister;
