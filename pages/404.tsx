import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Page not found</p>
        <Link href="/">
          <button style={styles.button}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 50%, #06b6d4 100%)',
    backgroundAttachment: 'fixed',
  },

  content: {
    textAlign: 'center' as const,
  },

  title: {
    fontSize: '96px',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },

  message: {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '32px',
  },

  button: {
    padding: '12px 32px',
    borderRadius: '24px',
    background: '#ec4899',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  } as any,
};
