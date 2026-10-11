import { useState } from "react";

type IconName =
  | "shield"
  | "grid"
  | "globe"
  | "activity"
  | "devices"
  | "settings"
  | "help"
  | "bell"
  | "chevron"
  | "download"
  | "upload"
  | "clock"
  | "power"
  | "search"
  | "arrow";

const iconPaths: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-5" />,
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z" />
    </>
  ),
  activity: <path d="M3 12h4l2.2-6 4.2 12 2.3-6H21" />,
  devices: (
    <>
      <rect x="3" y="4" width="13" height="11" rx="2" />
      <path d="M7 20h11M10 15v5M18 8h3v9h-7v-2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9a2.5 2.5 0 1 1 3.2 2.4c-.8.3-.8 1-.8 1.6M12 17h.01" />
    </>
  ),
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />,
  upload: <path d="M12 21V9m0 0 5 5m-5-5-5 5M5 3h14" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  power: <path d="M12 3v9m5.7-6.7a8 8 0 1 1-11.4 0" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const servers = [
  { city: "Zurich", country: "Switzerland", code: "CH", ping: 24, flag: "🇨🇭" },
  { city: "Stockholm", country: "Sweden", code: "SE", ping: 31, flag: "🇸🇪" },
  { city: "Toronto", country: "Canada", code: "CA", ping: 58, flag: "🇨🇦" },
  { city: "Tokyo", country: "Japan", code: "JP", ping: 86, flag: "🇯🇵" },
];

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Locations", icon: "globe" },
  { label: "Activity", icon: "activity" },
  { label: "Devices", icon: "devices" },
];

export default function App() {
  const [connected, setConnected] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [server, setServer] = useState(servers[0]);
  const [showServers, setShowServers] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  const toggleConnection = () => {
    if (connecting) return;
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 850);
  };

  const chooseServer = (nextServer: (typeof servers)[number]) => {
    setServer(nextServer);
    setShowServers(false);
    if (connected) {
      setConnecting(true);
      window.setTimeout(() => setConnecting(false), 700);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"><Icon name="shield" size={22} /></span>
          <span>Nodus</span>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map((item) => (
            <button
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              type="button"
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
            </button>
          ))}
          <p className="nav-label nav-label-secondary">Manage</p>
          <button className="nav-item" type="button"><Icon name="settings" size={19} /><span>Settings</span></button>
          <button className="nav-item" type="button"><Icon name="help" size={19} /><span>Support</span></button>
        </nav>

        <div className="plan-card">
          <span className="plan-pill">PRO</span>
          <p>Protected on every device</p>
          <small>3 of 10 devices active</small>
          <div className="plan-progress"><span /></div>
          <button type="button">Manage plan <Icon name="arrow" size={15} /></button>
        </div>

        <div className="user-profile">
          <span className="avatar">MK</span>
          <span><strong>Miracle Kim</strong><small>miracle@nodus.io</small></span>
          <button type="button" aria-label="Open profile"><Icon name="chevron" size={17} /></button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p className="eyebrow">SECURE NETWORK</p>
            <h1>Good morning, Miracle</h1>
          </div>
          <div className="header-actions">
            <div className={`status-chip ${connected ? "online" : ""}`}>
              <span />
              {connecting ? "Reconnecting" : connected ? "Protected" : "Unprotected"}
            </div>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Icon name="bell" size={19} />
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        <section className={`connection-card ${connected && !connecting ? "is-connected" : ""}`}>
          <div className="connection-copy">
            <div className="status-line">
              <span className="pulse-dot" />
              {connecting ? "ESTABLISHING SECURE TUNNEL" : connected ? "YOUR CONNECTION IS SECURE" : "YOU ARE NOT PROTECTED"}
            </div>
            <h2>{connecting ? "Connecting..." : connected ? "Privacy is on." : "You’re exposed."}</h2>
            <p>
              {connected
                ? "Your internet traffic is encrypted and your real location is hidden."
                : "Connect to encrypt your traffic and browse without leaving a trace."}
            </p>

            <div className="server-select-wrap">
              <p className="field-label">CONNECTED LOCATION</p>
              <button
                className="server-select"
                type="button"
                aria-expanded={showServers}
                onClick={() => setShowServers((value) => !value)}
              >
                <span className="flag">{server.flag}</span>
                <span className="server-copy"><strong>{server.city}</strong><small>{server.country}</small></span>
                <span className="latency"><i />{server.ping} ms</span>
                <Icon name="chevron" size={18} />
              </button>

              {showServers ? (
                <div className="server-menu">
                  <div className="search-row"><Icon name="search" size={17} /><span>Quick locations</span></div>
                  {servers.map((item) => (
                    <button
                      className={item.code === server.code ? "selected" : ""}
                      key={item.code}
                      type="button"
                      onClick={() => chooseServer(item)}
                    >
                      <span className="flag">{item.flag}</span>
                      <span><strong>{item.city}</strong><small>{item.country}</small></span>
                      <em>{item.ping} ms</em>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="connection-visual">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <span className="orbit-node node-one" />
            <span className="orbit-node node-two" />
            <span className="orbit-node node-three" />
            <button
              className="power-button"
              type="button"
              onClick={toggleConnection}
              aria-label={connected ? "Disconnect VPN" : "Connect VPN"}
            >
              <span><Icon name="power" size={37} /></span>
            </button>
            <p>{connecting ? "PLEASE WAIT" : connected ? "CLICK TO DISCONNECT" : "CLICK TO CONNECT"}</p>
          </div>
        </section>

        <section className="stats-grid" aria-label="Connection statistics">
          <article className="stat-card">
            <div className="stat-icon mint"><Icon name="clock" size={20} /></div>
            <div><p>Session time</p><strong>{connected ? "02:14:37" : "—"}</strong></div>
            <span className="mini-chart bars">{[30, 54, 42, 74, 58, 88, 68, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon violet"><Icon name="download" size={20} /></div>
            <div><p>Download</p><strong>{connected ? "84.2" : "0"} <small>Mbps</small></strong></div>
            <span className="trend">+12%</span>
          </article>
          <article className="stat-card">
            <div className="stat-icon orange"><Icon name="upload" size={20} /></div>
            <div><p>Upload</p><strong>{connected ? "32.8" : "0"} <small>Mbps</small></strong></div>
            <span className="trend neutral">Stable</span>
          </article>
        </section>

        <section className="bottom-grid">
          <article className="traffic-card">
            <div className="section-heading">
              <div><p className="eyebrow">LIVE TRAFFIC</p><h3>Network activity</h3></div>
              <button type="button">Last 24 hours <span>⌄</span></button>
            </div>
            <div className="chart">
              <div className="chart-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
              <svg viewBox="0 0 760 150" preserveAspectRatio="none" aria-label="Network traffic chart">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#58d6ad" stopOpacity=".24" />
                    <stop offset="100%" stopColor="#58d6ad" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="area" d="M0 125 C60 120 68 85 130 101 S215 126 270 75 340 90 390 66 450 98 500 52 570 90 620 45 700 56 760 20 V150 H0Z" />
                <path className="line" d="M0 125 C60 120 68 85 130 101 S215 126 270 75 340 90 390 66 450 98 500 52 570 90 620 45 700 56 760 20" />
              </svg>
              <div className="chart-times"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div>
            </div>
          </article>

          <article className="security-card">
            <div className="section-heading">
              <div><p className="eyebrow">PROTECTION</p><h3>Security center</h3></div>
              <span className="score">98</span>
            </div>
            <div className="security-list">
              <div><span className="check">✓</span><span><strong>Threat blocker</strong><small>342 trackers blocked</small></span><em>Active</em></div>
              <div><span className="check">✓</span><span><strong>Kill switch</strong><small>Prevents data leaks</small></span><em>Active</em></div>
              <div><span className="check">✓</span><span><strong>DNS protection</strong><small>Private DNS enabled</small></span><em>Active</em></div>
            </div>
          </article>
        </section>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button className={activeNav === item.label ? "active" : ""} key={item.label} onClick={() => setActiveNav(item.label)} type="button">
            <Icon name={item.icon} size={20} /><span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
