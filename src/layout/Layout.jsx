import { Link, Outlet, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  {
    to: "/smartphones",
    label: "Telefoni",
  },
  {
    to: "/compare",
    label: "Confronta",
  },
  {
    to: "/favorites",
    label: "Preferiti",
  },
];

const Layout = () => {
  return (
    <div className="app-shell">
      <header className="app-nav-wrap">
        <nav className="app-navbar" aria-label="Navigazione principale">
          <div className="app-navbar-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `app-nav-link ${isActive ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <Link to="/" className="app-navbar-brand" aria-label="Vai alla home">
            <i className="fa-solid fa-mobile-screen-button"></i>
            <span className="app-brand-text">
              <span className="app-brand-title">SmartphoneHub</span>
              <span className="app-brand-subtitle">Comparatore smartphone</span>
            </span>
          </Link>
        </nav>
      </header>

      <main className="app-main container">
        <Outlet />
      </main>
      <button
        type="button"
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Torna su"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default Layout;
