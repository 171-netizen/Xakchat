import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface Server {
  id: string;
  name: string;
  icon: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

const mockServers: Server[] = [
  { id: '1', name: 'Xakteir Dev', icon: '🏢' },
  { id: '2', name: 'Elywar Squad', icon: '🎮' },
  { id: '3', name: 'Creators', icon: '🎨' },
  { id: '4', name: 'Community', icon: '👥' },
];

export default function Chat() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState('1');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Ridwan', text: 'Welcome to XakChat! 🎉', timestamp: Date.now() - 5000 },
    { id: '2', user: 'Rayhan', text: 'This is incredible! The 3D rooms are insane', timestamp: Date.now() - 3000 },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showVoiceChannels, setShowVoiceChannels] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: user?.displayName || user?.email?.split('@')[0] || 'User',
      text: inputValue,
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}>Loading XakChat...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h3 style={styles.sidebarTitle}>SERVERS</h3>
        </div>

        <div style={styles.serversList}>
          {mockServers.map((server) => (
            <button
              key={server.id}
              onClick={() => setActiveServer(server.id)}
              style={{
                ...styles.serverButton,
                ...(activeServer === server.id && styles.serverButtonActive),
              }}
              title={server.name}
            >
              <span style={styles.serverIcon}>{server.icon}</span>
              <div style={styles.serverName}>{server.name}</div>
            </button>
          ))}
        </div>

        <div style={styles.sidebarFooter}>
          <button style={styles.footerButton} title="Settings">
            ⚙️
          </button>
          <button style={styles.footerButton} title="User">
            👤
          </button>
          <button style={styles.footerButton} onClick={handleSignOut} title="Sign Out">
            🚪
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main style={styles.main}>
        {/* Channel Header */}
        <header style={styles.channelHeader}>
          <div style={styles.channelInfo}>
            <h2 style={styles.channelName}>
              {mockServers.find((s) => s.id === activeServer)?.name}
            </h2>
            <p style={styles.channelTopic}>Welcome to XakChat! Start a conversation</p>
          </div>

          <div style={styles.channelActions}>
            <button
              style={styles.actionButton}
              onClick={() => setShowVoiceChannels(!showVoiceChannels)}
              title="Voice Channels"
            >
              🎙️
            </button>
            <button style={styles.actionButton} title="3D Rooms">
              🎮
            </button>
            <button style={styles.actionButton} title="Members">
              👥
            </button>
          </div>
        </header>

        {/* Voice Channels Panel */}
        {showVoiceChannels && (
          <div style={styles.voicePanel}>
            <h3 style={styles.voiceTitle}>Voice Channels</h3>
            <button style={styles.voiceChannel}>🎙️ general</button>
            <button style={styles.voiceChannel}>🎙️ gaming</button>
            <button style={styles.voiceChannel}>🎙️3d-rooms</button>
          </div>
        )}

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.messageGroup}>
              <div style={styles.messageAuthor}>{msg.user}</div>
              <div style={styles.message}>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={styles.inputArea}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Send a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={styles.messageInput}
            />
            <button
              onClick={handleSendMessage}
              style={styles.sendButton}
              disabled={!inputValue.trim()}
            >
              ➜
            </button>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Members */}
      <aside style={styles.rightSidebar}>
        <div style={styles.rightHeader}>
          <h3 style={styles.rightTitle}>MEMBERS</h3>
        </div>

        <div style={styles.membersList}>
          <div style={styles.member}>
            <span style={styles.memberStatus}>🟢</span>
            <span style={styles.memberName}>Ridwan</span>
          </div>
          <div style={styles.member}>
            <span style={styles.memberStatus}>🟢</span>
            <span style={styles.memberName}>Rayhan</span>
          </div>
          <div style={styles.member}>
            <span style={styles.memberStatus}>⚪</span>
            <span style={styles.memberName}>Community</span>
          </div>
        </div>

        <div style={styles.rightFooter}>
          <div style={styles.userCard}>
            <div style={styles.userCardContent}>
              <div style={styles.userName}>
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </div>
              <div style={styles.userStatus}>Active</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    background: '#0f172a',
    color: '#f1f5f9',
  },

  // Sidebar Styles
  sidebar: {
    width: '280px',
    background: 'rgba(15, 23, 42, 0.8)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    backdropFilter: 'blur(10px)',
  },

  sidebarHeader: {
    padding: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },

  sidebarTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '2px',
    margin: 0,
  },

  serversList: {
    flex: 1,
    padding: '12px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  serverButton: {
    padding: '12px',
    borderRadius: '12px',
    background: 'transparent',
    border: '1px solid transparent',
    color: '#cbd5e1',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
  } as any,

  serverButtonActive: {
    background: 'rgba(236, 72, 153, 0.2)',
    border: '1px solid rgba(236, 72, 153, 0.5)',
    color: '#ec4899',
  } as any,

  serverIcon: {
    fontSize: '24px',
  },

  serverName: {
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'center' as const,
  },

  sidebarFooter: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },

  footerButton: {
    padding: '8px 12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#cbd5e1',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  } as any,

  // Main Area
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#0f172a',
  },

  channelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  channelInfo: {
    flex: 1,
  },

  channelName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#f1f5f9',
    margin: 0,
  },

  channelTopic: {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '4px 0 0 0',
  },

  channelActions: {
    display: 'flex',
    gap: '12px',
  },

  actionButton: {
    padding: '8px 12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#cbd5e1',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  } as any,

  voicePanel: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  voiceTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    margin: 0,
    marginRight: '12px',
  },

  voiceChannel: {
    padding: '8px 12px',
    borderRadius: '6px',
    background: 'rgba(236, 72, 153, 0.1)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    color: '#ec4899',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  } as any,

  // Messages
  messagesContainer: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },

  messageGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },

  messageAuthor: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ec4899',
  },

  message: {
    fontSize: '16px',
    color: '#cbd5e1',
    lineHeight: '1.5',
  },

  // Input Area
  inputArea: {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  inputWrapper: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  messageInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#f1f5f9',
    fontSize: '16px',
  } as any,

  sendButton: {
    padding: '12px 16px',
    borderRadius: '12px',
    background: '#ec4899',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  } as any,

  // Right Sidebar
  rightSidebar: {
    width: '280px',
    background: 'rgba(15, 23, 42, 0.8)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    backdropFilter: 'blur(10px)',
  },

  rightHeader: {
    padding: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },

  rightTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '2px',
    margin: 0,
  },

  membersList: {
    flex: 1,
    padding: '12px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },

  member: {
    padding: '12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  } as any,

  memberStatus: {
    fontSize: '12px',
  },

  memberName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#cbd5e1',
  },

  rightFooter: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  userCard: {
    padding: '12px',
    borderRadius: '12px',
    background: 'rgba(236, 72, 153, 0.1)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
  },

  userCardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },

  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#f1f5f9',
  },

  userStatus: {
    fontSize: '12px',
    color: '#94a3b8',
  },

  // Loading
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#0f172a',
  },

  loader: {
    fontSize: '20px',
    color: '#cbd5e1',
  },
};
