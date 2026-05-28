import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import Link from 'next/link';

export default function Auth() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('/chat');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(result.user, { displayName });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/chat');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/">
          <span style={styles.logo}>← XAKCHAT</span>
        </Link>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</h2>

          <form onSubmit={handleAuth} style={styles.form}>
            {isSignUp && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Display Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={styles.input}
                />
              </div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div style={styles.toggle}>
            <span style={styles.toggleText}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={styles.toggleButton}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 50%, #06b6d4 100%)',
    backgroundAttachment: 'fixed',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
  },

  header: {
    padding: '20px',
    textAlign: 'center' as const,
  },

  logo: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '2px',
    cursor: 'pointer',
  },

  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    background: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  } as any,

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '30px',
    textAlign: 'center' as const,
  },

  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#cbd5e1',
  },

  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#f1f5f9',
    fontSize: '16px',
  } as any,

  button: {
    padding: '12px 24px',
    borderRadius: '12px',
    background: '#ec4899',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  } as any,

  error: {
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    color: '#fca5a5',
    fontSize: '14px',
  },

  toggle: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '20px',
  },

  toggleText: {
    color: '#94a3b8',
    fontSize: '14px',
  },

  toggleButton: {
    color: '#ec4899',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  } as any,
};
