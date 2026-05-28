import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Auto-redirect to chat if already authenticated
      if (currentUser) {
        router.push('/chat');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>Loading XakChat...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.headerButton}>⊞ APPS</button>
          <button style={styles.headerButton}>≡</button>
          <button style={styles.headerButton}>▢</button>
        </div>
        
        <div style={styles.headerCenter}>
          <h1 style={styles.headerTitle}>XAKCHAT</h1>
        </div>

        <div style={styles.headerRight}>
          {user ? (
            <button style={styles.signInButton} onClick={handleSignOut}>
              SIGN OUT
            </button>
          ) : (
            <Link href="/auth">
              <button style={styles.signInButton}>SIGN IN</button>
            </Link>
          )}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.hero}>
          <div style={styles.logo}>
            <div style={styles.logoInner}>X</div>
          </div>
          
          <h2 style={styles.heroTitle}>XAKCHAT</h2>
          <p style={styles.heroSubtitle}>MESSAGING • COMMUNITIES • 3D ROOMS</p>

          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search servers and friends..."
              style={styles.searchInput}
              disabled
            />
          </div>

          {!user && (
            <div style={styles.ctaContainer}>
              <Link href="/auth">
                <button style={styles.ctaButton}>Get Started</button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 50%, #06b6d4 100%)',
    backgroundAttachment: 'fixed',
  },
  
  header: {
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },

  headerLeft: {
    display: 'flex',
    gap: '12px',
  },

  headerButton: {
    padding: '10px 16px',
    borderRadius: '24px',
    background: 'rgba(15, 23, 42, 0.5)',
    color: '#f1f5f9',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  } as any,

  headerCenter: {
    flex: 1,
    textAlign: 'center' as const,
  },

  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '2px',
  },

  headerRight: {
    display: 'flex',
    gap: '12px',
  },

  signInButton: {
    padding: '12px 32px',
    borderRadius: '24px',
    background: '#ec4899',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  } as any,

  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },

  hero: {
    textAlign: 'center' as const,
    maxWidth: '800px',
    padding: '40px',
  },

  logo: {
    width: '120px',
    height: '120px',
    borderRadius: '30px',
    background: '#1e293b',
    border: '4px solid #ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px',
    fontSize: '60px',
    fontWeight: '700',
    color: '#ffffff',
  } as any,

  logoInner: {},

  heroTitle: {
    fontSize: '64px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '2px',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },

  heroSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: '4px',
    marginBottom: '50px',
    fontWeight: '300',
  },

  searchContainer: {
    marginBottom: '50px',
  },

  searchInput: {
    width: '100%',
    maxWidth: '500px',
    padding: '16px 24px',
    borderRadius: '32px',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#94a3b8',
    fontSize: '16px',
    backdropFilter: 'blur(10px)',
  } as any,

  ctaContainer: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },

  ctaButton: {
    padding: '14px 48px',
    borderRadius: '28px',
    background: '#ec4899',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  } as any,

  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '20px',
    color: '#ffffff',
  },
};
