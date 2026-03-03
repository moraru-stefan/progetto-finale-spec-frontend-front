import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: "fa-solid fa-house", tone: "nav-home" },
  {
    to: "/smartphones",
    label: "Telefoni",
    icon: "fa-solid fa-mobile-screen",
    tone: "nav-shop",
  },
  {
    to: "/compare",
    label: "Confronta",
    icon: "fa-solid fa-scale-balanced",
    tone: "nav-compare",
  },
  {
    to: "/favorites",
    label: "Preferiti",
    icon: "fa-solid fa-heart",
    tone: "nav-favorites",
  },
];

const Layout = () => {
  return (
    <div className="container app-shell">
      <header className="app-nav-wrap">
        <nav className="app-navbar" aria-label="Navigazione principale">
          <div className="app-navbar-brand">
            <i className="fa-solid fa-mobile-screen-button"></i>
            <span>SmartphoneHub</span>
          </div>

          <div className="app-navbar-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `app-nav-link ${item.tone} ${isActive ? "is-active" : ""}`
                }
              >
                <i className={`${item.icon} nav-icon`}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <Outlet />
      <i
        className="fa-regular fa-circle-up scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></i>
    </div>
  );
};

export default Layout;
