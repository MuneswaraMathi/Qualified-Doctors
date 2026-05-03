import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #1a237e 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
    color: '#fff',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '12px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '300',
    opacity: 0.9,
  },
  cardsContainer: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px 32px',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1565c0',
  },
};

function RoleCard({ emoji, label, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 36px rgba(0,0,0,0.3)'
          : '0 8px 24px rgba(0,0,0,0.2)',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: '3.5rem' }}>{emoji}</span>
      <span style={styles.cardTitle}>{label}</span>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏥 Qualified Doctors</h1>
        <p style={styles.subtitle}>Book Doctor Appointments Online</p>
      </div>
      <div style={styles.cardsContainer}>
        <RoleCard
          emoji="🛡️"
          label="Admins"
          onClick={() => navigate('/qualified-doctors/admin/register')}
        />
        <RoleCard
          emoji="👨‍⚕️"
          label="Doctors"
          onClick={() => navigate('/qualified-doctors/doctor/register')}
        />
        <RoleCard
          emoji="🧑‍🤝‍🧑"
          label="Patients"
          onClick={() => navigate('/qualified-doctors/patient/register')}
        />
      </div>
    </div>
  );
}

export default HomePage;
