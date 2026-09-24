import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  Sparkles,
  Search,
  FileText,
  FolderOpen,
  Bell,
  UserRound,
  Settings,
  Menu,
  X,
  ArrowRight,
  Moon,
  Sun,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleAlert,
  Upload,
  Send,
  Bot,
  MessageCircle,
  SlidersHorizontal,
  LogOut,
  GraduationCap,
  WalletCards,
  Award,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

import "./styles.css";

const scholarships = [
  {
    id: 1,
    name: "Future Scholars Grant",
    provider: "Demo Education Foundation",
    amount: "₹50,000",
    deadline: "18 Oct 2026",
    match: 96,
    category: "Merit",
    description:
      "Financial support for students demonstrating strong academic performance and financial need.",
  },
  {
    id: 2,
    name: "STEM Opportunity Scholarship",
    provider: "Demo STEM Foundation",
    amount: "₹75,000",
    deadline: "26 Oct 2026",
    match: 92,
    category: "STEM",
    description:
      "A prototype scholarship opportunity designed for students pursuing technology and engineering.",
  },
  {
    id: 3,
    name: "Young Innovators Award",
    provider: "Demo Innovation Trust",
    amount: "₹40,000",
    deadline: "03 Nov 2026",
    match: 88,
    category: "Innovation",
    description:
      "Supports students working on innovative academic and technology projects.",
  },
  {
    id: 4,
    name: "Academic Excellence Grant",
    provider: "Demo Student Foundation",
    amount: "₹60,000",
    deadline: "12 Nov 2026",
    match: 84,
    category: "Academic",
    description:
      "Prototype funding opportunity for students with consistent academic performance.",
  },
];

const applications = [
  {
    name: "Future Scholars Grant",
    status: "Under Review",
    date: "12 Sep 2026",
  },
  {
    name: "STEM Opportunity Scholarship",
    status: "Documents Submitted",
    date: "08 Sep 2026",
  },
  {
    name: "Young Innovators Award",
    status: "Draft",
    date: "05 Sep 2026",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("scholarai-theme") === "dark";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const toggleTheme = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(
      "scholarai-theme",
      newMode ? "dark" : "light"
    );
  };

  const navigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const filteredScholarships = scholarships.filter((scholarship) =>
    `${scholarship.name} ${scholarship.provider} ${scholarship.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <div className="brand-name">ScholarAI</div>
            <div className="brand-subtitle">Scholarship Copilot</div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-title">MAIN</div>

        <nav className="sidebar-nav">
          <NavItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => navigate("Dashboard")}
          />

          <NavItem
            icon={<Sparkles size={19} />}
            label="My Matches"
            active={activePage === "My Matches"}
            onClick={() => navigate("My Matches")}
          />

          <NavItem
            icon={<Search size={19} />}
            label="Explore Scholarships"
            active={activePage === "Explore Scholarships"}
            onClick={() => navigate("Explore Scholarships")}
          />

          <NavItem
            icon={<FileText size={19} />}
            label="Applications"
            active={activePage === "Applications"}
            onClick={() => navigate("Applications")}
          />

          <NavItem
            icon={<FolderOpen size={19} />}
            label="Documents"
            active={activePage === "Documents"}
            onClick={() => navigate("Documents")}
          />
        </nav>

        <div className="sidebar-section-title">ACCOUNT</div>

        <nav className="sidebar-nav">
          <NavItem
            icon={<Bell size={19} />}
            label="Notifications"
            active={activePage === "Notifications"}
            onClick={() => navigate("Notifications")}
            badge="3"
          />

          <NavItem
            icon={<UserRound size={19} />}
            label="Profile"
            active={activePage === "Profile"}
            onClick={() => navigate("Profile")}
          />

          <NavItem
            icon={<Settings size={19} />}
            label="Settings"
            active={activePage === "Settings"}
            onClick={() => navigate("Settings")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-ai-card">
            <div className="sidebar-ai-icon">
              <Bot size={18} />
            </div>

            <div>
              <strong>ScholarAI Copilot</strong>
              <span>Ready to help you</span>
            </div>
          </div>

          <div className="user-mini">
            <div className="avatar">KG</div>

            <div className="user-mini-info">
              <strong>Keshav</strong>
              <span>B.Tech CSE</span>
            </div>

            <button>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="search-wrapper">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search scholarships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <span className="search-shortcut">⌘ K</span>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button"
              onClick={toggleTheme}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            <button className="icon-button notification-button">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="topbar-profile">
              <div className="avatar small">KG</div>

              <div>
                <strong>Keshav</strong>
                <span>Student</span>
              </div>

              <ChevronRight size={16} />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="content">
          {activePage === "Dashboard" && (
            <Dashboard
              scholarships={filteredScholarships}
              setSelectedScholarship={setSelectedScholarship}
              setCopilotOpen={setCopilotOpen}
              navigate={navigate}
            />
          )}

          {activePage === "My Matches" && (
            <Matches
              scholarships={filteredScholarships}
              setSelectedScholarship={setSelectedScholarship}
            />
          )}

          {activePage === "Explore Scholarships" && (
            <Explore
              scholarships={filteredScholarships}
              search={search}
              setSearch={setSearch}
              setSelectedScholarship={setSelectedScholarship}
            />
          )}

          {activePage === "Applications" && (
            <Applications />
          )}

          {activePage === "Documents" && (
            <Documents />
          )}

          {activePage === "Notifications" && (
            <Notifications />
          )}

          {activePage === "Profile" && (
            <Profile />
          )}

          {activePage === "Settings" && (
            <SettingsPage
              darkMode={darkMode}
              toggleTheme={toggleTheme}
            />
          )}
        </div>
      </main>

      {/* COPILOT BUTTON */}
      <button
        className="copilot-floating"
        onClick={() => setCopilotOpen(true)}
      >
        <Sparkles size={19} />
        <span>Ask ScholarAI</span>
      </button>

      {/* COPILOT */}
      {copilotOpen && (
        <Copilot onClose={() => setCopilotOpen(false)} />
      )}

      {/* SCHOLARSHIP MODAL */}
      {selectedScholarship && (
        <ScholarshipModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
    </div>
  );
}


/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}

      <span>{label}</span>

      {badge && <small>{badge}</small>}
    </button>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  scholarships,
  setSelectedScholarship,
  setCopilotOpen,
  navigate,
}) {
  return (
    <>
      <section className="welcome-section">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR SCHOLARSHIP COMMAND CENTER
          </div>

          <h1>
            Good morning, Keshav <span>👋</span>
          </h1>

          <p>
            Your profile is getting noticed. Here are the
            opportunities that match you best.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setCopilotOpen(true)}
        >
          <Sparkles size={17} />
          Ask ScholarAI
        </button>
      </section>

      {/* AI HERO */}
      <section className="ai-hero">
        <div className="ai-hero-glow" />

        <div className="ai-hero-content">
          <div className="ai-label">
            <Sparkles size={15} />
            SCHOLARAI INSIGHT
          </div>

          <h2>
            We found{" "}
            <span>8 opportunities</span>{" "}
            that may fit your profile.
          </h2>

          <p>
            Your strongest matches are based on the academic,
            course and profile information currently available.
          </p>

          <div className="ai-hero-actions">
            <button
              className="white-button"
              onClick={() => navigate("My Matches")}
            >
              View my matches
              <ArrowRight size={17} />
            </button>

            <button
              className="ghost-white-button"
              onClick={() => setCopilotOpen(true)}
            >
              <MessageCircle size={16} />
              Ask why
            </button>
          </div>
        </div>

        <div className="ai-hero-visual">
          <div className="ai-orbit orbit-one" />
          <div className="ai-orbit orbit-two" />

          <div className="ai-center">
            <Sparkles size={34} />
          </div>

          <div className="floating-match match-one">
            <span>96%</span>
            Match
          </div>

          <div className="floating-match match-two">
            <CheckCircle2 size={15} />
            Eligible
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        <StatCard
          icon={<Sparkles size={21} />}
          title="Matched Scholarships"
          value="18"
          change="+4 this week"
          type="blue"
        />

        <StatCard
          icon={<Send size={21} />}
          title="Applications"
          value="4"
          change="2 under review"
          type="purple"
        />

        <StatCard
          icon={<CalendarDays size={21} />}
          title="Upcoming Deadlines"
          value="3"
          change="Next in 6 days"
          type="orange"
        />

        <StatCard
          icon={<TrendingUp size={21} />}
          title="Profile Strength"
          value="82%"
          change="Almost complete"
          type="green"
        />
      </section>

      <div className="dashboard-grid">
        {/* RECOMMENDATIONS */}
        <section className="section-card recommendations">
          <div className="section-heading">
            <div>
              <div className="section-title-row">
                <h2>Recommended for you</h2>
                <span className="ai-badge">
                  <Sparkles size={12} />
                  AI MATCHED
                </span>
              </div>

              <p>
                Opportunities selected from your current profile.
              </p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("Explore Scholarships")}
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="scholarship-list">
            {scholarships.slice(0, 3).map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onClick={() =>
                  setSelectedScholarship(scholarship)
                }
              />
            ))}
          </div>
        </section>

        {/* DEADLINES */}
        <section className="section-card deadlines">
          <div className="section-heading">
            <div>
              <h2>Upcoming deadlines</h2>
              <p>Don't miss an opportunity.</p>
            </div>

            <CalendarDays size={20} />
          </div>

          <Deadline
            title="Future Scholars Grant"
            date="18 Oct"
            days="26 days"
            urgent={false}
          />

          <Deadline
            title="STEM Opportunity"
            date="26 Oct"
            days="34 days"
            urgent={false}
          />

          <Deadline
            title="Young Innovators Award"
            date="03 Nov"
            days="42 days"
            urgent={false}
          />

          <div className="deadline-footer">
            <button onClick={() => navigate("Explore Scholarships")}>
              View calendar
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>

      {/* PROFILE + APPLICATION */}
      <div className="bottom-grid">
        <ProfileProgress />

        <ApplicationProgress />
      </div>
    </>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, title, value, change, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{change}</small>
      </div>

      <ArrowRight className="stat-arrow" size={17} />
    </div>
  );
}


/* =========================================================
   SCHOLARSHIP CARD
========================================================= */

function ScholarshipCard({ scholarship, onClick }) {
  return (
    <article className="scholarship-card">
      <div className="scholarship-top">
        <div className="provider-logo">
          <Award size={19} />
        </div>

        <div className="scholarship-info">
          <span>{scholarship.provider}</span>
          <h3>{scholarship.name}</h3>
        </div>

        <div className="match-score">
          <strong>{scholarship.match}%</strong>
          <span>match</span>
        </div>
      </div>

      <p>{scholarship.description}</p>

      <div className="scholarship-meta">
        <span>
          <WalletCards size={14} />
          {scholarship.amount}
        </span>

        <span>
          <CalendarDays size={14} />
          {scholarship.deadline}
        </span>

        <span className="category-tag">
          {scholarship.category}
        </span>
      </div>

      <button className="card-action" onClick={onClick}>
        View scholarship
        <ArrowRight size={16} />
      </button>
    </article>
  );
}


/* =========================================================
   DEADLINE
========================================================= */

function Deadline({
  title,
  date,
  days,
  urgent,
}) {
  return (
    <div className="deadline-item">
      <div className="deadline-date">
        <span>{date.split(" ")[1]}</span>
        <strong>{date.split(" ")[0]}</strong>
      </div>

      <div className="deadline-info">
        <strong>{title}</strong>
        <span>
          <Clock3 size={13} />
          {days} remaining
        </span>
      </div>

      {urgent && (
        <CircleAlert
          size={17}
          className="deadline-warning"
        />
      )}
    </div>
  );
}


/* =========================================================
   PROFILE PROGRESS
========================================================= */

function ProfileProgress() {
  return (
    <section className="section-card profile-progress">
      <div className="section-heading">
        <div>
          <h2>Complete your profile</h2>
          <p>
            A complete profile helps ScholarAI find better
            matches.
          </p>
        </div>

        <strong className="progress-number">82%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{ width: "82%" }}
        />
      </div>

      <div className="profile-checks">
        <div className="check-row done">
          <CheckCircle2 size={17} />
          Academic information
        </div>

        <div className="check-row done">
          <CheckCircle2 size={17} />
          Course information
        </div>

        <div className="check-row done">
          <CheckCircle2 size={17} />
          Basic profile
        </div>

        <div className="check-row">
          <CircleAlert size={17} />
          Financial information
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   APPLICATION PROGRESS
========================================================= */

function ApplicationProgress() {
  return (
    <section className="section-card application-progress">
      <div className="section-heading">
        <div>
          <h2>Application activity</h2>
          <p>Your recent scholarship activity.</p>
        </div>

        <FileText size={20} />
      </div>

      <div className="application-funnel">
        <div>
          <strong>18</strong>
          <span>Matched</span>
        </div>

        <ArrowRight size={18} />

        <div>
          <strong>7</strong>
          <span>Shortlisted</span>
        </div>

        <ArrowRight size={18} />

        <div>
          <strong>4</strong>
          <span>Applied</span>
        </div>
      </div>

      <div className="activity-note">
        <ShieldCheck size={17} />

        <span>
          Your documents are stored for reuse across
          applications.
        </span>
      </div>
    </section>
  );
}


/* =========================================================
   MATCHES
========================================================= */

function Matches({
  scholarships,
  setSelectedScholarship,
}) {
  return (
    <PageHeader
      eyebrow="PERSONALIZED DISCOVERY"
      title="My Matches"
      description="Scholarships that match the information in your profile."
    >
      <div className="filter-row">
        <button className="filter-button active">
          <Sparkles size={15} />
          Best matches
        </button>

        <button className="filter-button">
          <SlidersHorizontal size={15} />
          All filters
        </button>
      </div>

      <div className="large-scholarship-grid">
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            onClick={() =>
              setSelectedScholarship(scholarship)
            }
          />
        ))}
      </div>
    </PageHeader>
  );
}


/* =========================================================
   EXPLORE
========================================================= */

function Explore({
  scholarships,
  search,
  setSearch,
  setSelectedScholarship,
}) {
  return (
    <PageHeader
      eyebrow="SCHOLARSHIP MARKETPLACE"
      title="Explore Scholarships"
      description="Search and discover opportunities based on your needs."
    >
      <div className="explore-toolbar">
        <div className="large-search">
          <Search size={19} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scholarship, provider or category..."
          />
        </div>

        <button className="filter-button">
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="large-scholarship-grid">
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onClick={() =>
                setSelectedScholarship(scholarship)
              }
            />
          ))
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No scholarships found</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </PageHeader>
  );
}


/* =========================================================
   APPLICATIONS
========================================================= */

function Applications() {
  return (
    <PageHeader
      eyebrow="APPLICATION TRACKER"
      title="My Applications"
      description="Track the status of your scholarship applications."
    >
      <div className="applications-card">
        {applications.map((application, index) => (
          <div className="application-row" key={index}>
            <div className="application-icon">
              <FileText size={19} />
            </div>

            <div className="application-name">
              <strong>{application.name}</strong>
              <span>Submitted {application.date}</span>
            </div>

            <div
              className={`status ${
                application.status
                  .toLowerCase()
                  .replaceAll(" ", "-")
              }`}
            >
              {application.status}
            </div>

            <button className="row-arrow">
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </PageHeader>
  );
}


/* =========================================================
   DOCUMENTS
========================================================= */

function Documents() {
  return (
    <PageHeader
      eyebrow="DOCUMENT VAULT"
      title="My Documents"
      description="Upload your documents once and reuse them during applications."
    >
      <div className="document-upload">
        <div className="upload-icon">
          <Upload size={26} />
        </div>

        <h2>Upload a document</h2>

        <p>
          PDF, JPG or PNG files up to 10 MB.
        </p>

        <button className="primary-button">
          <Upload size={17} />
          Choose file
        </button>
      </div>

      <div className="document-list">
        <DocumentItem
          name="Academic Marksheet"
          type="PDF"
        />

        <DocumentItem
          name="Income Certificate"
          type="PDF"
        />

        <DocumentItem
          name="Category Certificate"
          type="PDF"
        />
      </div>
    </PageHeader>
  );
}


function DocumentItem({ name, type }) {
  return (
    <div className="document-item">
      <div className="document-file-icon">
        <FileText size={19} />
      </div>

      <div>
        <strong>{name}</strong>
        <span>{type} • Ready to use</span>
      </div>

      <CheckCircle2
        size={18}
        className="document-check"
      />
    </div>
  );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications() {
  const notifications = [
    {
      title: "New scholarship match",
      text: "A new opportunity matches your profile.",
      time: "2 hours ago",
      icon: Sparkles,
    },
    {
      title: "Application update",
      text: "Your Future Scholars Grant application is under review.",
      time: "Yesterday",
      icon: FileText,
    },
    {
      title: "Deadline approaching",
      text: "STEM Opportunity Scholarship closes soon.",
      time: "2 days ago",
      icon: CalendarDays,
    },
  ];

  return (
    <PageHeader
      eyebrow="UPDATES"
      title="Notifications"
      description="Important updates about your scholarship journey."
    >
      <div className="notification-list">
        {notifications.map((item, index) => {
          const Icon = item.icon;

          return (
            <div className="notification-item" key={index}>
              <div className="notification-icon">
                <Icon size={18} />
              </div>

              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </PageHeader>
  );
}


/* =========================================================
   PROFILE
========================================================= */

function Profile() {
  return (
    <PageHeader
      eyebrow="YOUR INFORMATION"
      title="My Profile"
      description="Manage the information ScholarAI uses to find relevant opportunities."
    >
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">KG</div>

          <div>
            <h2>Keshav</h2>
            <p>B.Tech Computer Science & Engineering</p>
          </div>

          <button className="secondary-button">
            Edit profile
          </button>
        </div>

        <div className="profile-fields">
          <ProfileField
            label="Education"
            value="B.Tech CSE"
          />

          <ProfileField
            label="Academic Year"
            value="4th Year"
          />

          <ProfileField
            label="Academic Performance"
            value="82%"
          />

          <ProfileField
            label="Location"
            value="Delhi"
          />
        </div>
      </div>
    </PageHeader>
  );
}


function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}


/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage({ darkMode, toggleTheme }) {
  return (
    <PageHeader
      eyebrow="PREFERENCES"
      title="Settings"
      description="Customize your ScholarAI experience."
    >
      <div className="settings-card">
        <div className="setting-row">
          <div className="setting-info">
            <div className="setting-icon">
              {darkMode ? (
                <Moon size={19} />
              ) : (
                <Sun size={19} />
              )}
            </div>

            <div>
              <strong>Dark mode</strong>
              <span>
                Use a darker appearance throughout ScholarAI.
              </span>
            </div>
          </div>

          <button
            className={`switch ${darkMode ? "on" : ""}`}
            onClick={toggleTheme}
          >
            <span />
          </button>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <div className="setting-icon">
              <Bell size={19} />
            </div>

            <div>
              <strong>Scholarship alerts</strong>
              <span>
                Receive notifications about new matches.
              </span>
            </div>
          </div>

          <button className="switch on">
            <span />
          </button>
        </div>
      </div>
    </PageHeader>
  );
}


/* =========================================================
   PAGE HEADER
========================================================= */

function PageHeader({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            {eyebrow}
          </div>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}


/* =========================================================
   COPILOT
========================================================= */

function Copilot({ onClose }) {
  const [message, setMessage] = useState("");

  const quickQuestions = [
    "Why was I matched with this scholarship?",
    "Find scholarships for B.Tech students",
    "What documents should I prepare?",
    "Which deadlines are coming up?",
  ];

  return (
    <div className="copilot-overlay">
      <div className="copilot">
        <div className="copilot-header">
          <div className="copilot-title">
            <div className="copilot-logo">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>ScholarAI Copilot</strong>
              <span>Your scholarship assistant</span>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="copilot-body">
          <div className="copilot-welcome">
            <div className="copilot-large-icon">
              <Bot size={30} />
            </div>

            <h2>How can I help?</h2>

            <p>
              Ask me about your scholarship matches,
              applications or documents.
            </p>
          </div>

          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setMessage(question)}
              >
                {question}
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="copilot-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask ScholarAI anything..."
          />

          <button>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="copilot-disclaimer">
          <ShieldCheck size={13} />
          Recommendations are based on available profile data.
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   SCHOLARSHIP MODAL
========================================================= */

function ScholarshipModal({
  scholarship,
  onClose,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="scholarship-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={19} />
        </button>

        <div className="modal-provider">
          <div className="provider-logo large">
            <Award size={23} />
          </div>

          <span>{scholarship.provider}</span>
        </div>

        <h2>{scholarship.name}</h2>

        <p className="modal-description">
          {scholarship.description}
        </p>

        <div className="modal-stats">
          <div>
            <span>Award amount</span>
            <strong>{scholarship.amount}</strong>
          </div>

          <div>
            <span>Deadline</span>
            <strong>{scholarship.deadline}</strong>
          </div>

          <div>
            <span>Your match</span>
            <strong className="match-green">
              {scholarship.match}%
            </strong>
          </div>
        </div>

        <div className="eligibility-box">
          <div className="eligibility-title">
            <Sparkles size={16} />
            Why this matches you
          </div>

          <div className="eligibility-list">
            <div>
              <CheckCircle2 size={16} />
              Course requirement appears relevant
            </div>

            <div>
              <CheckCircle2 size={16} />
              Academic criteria appear relevant
            </div>

            <div>
              <CheckCircle2 size={16} />
              Profile information available
            </div>

            <div className="warning">
              <CircleAlert size={16} />
              Verify official eligibility before applying
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>

          <button className="primary-button">
            View application
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   RENDER
========================================================= */

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);