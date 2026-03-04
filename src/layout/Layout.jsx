import { useEffect, useState } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const isUnifiedPage =
    location.pathname === "/" ||
    location.pathname === "/smartphones" ||
    location.pathname === "/compare" ||
    location.pathname === "/favorites";
  const showScrollTop = location.pathname === "/" || location.pathname === "/smartphones";
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const mainClassName = isUnifiedPage ? "app-main app-main-home" : "app-main container";
  const shellClassName = isUnifiedPage ? "app-shell app-shell-home" : "app-shell";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!showScrollTop) {
      setHasScrolledEnough(false);
      return;
    }

    const threshold = 280;
    const handleScroll = () => {
      setHasScrolledEnough(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollTop]);

  return (
    <div className={shellClassName}>
      <header className="app-nav-wrap">
        <nav className="app-navbar" aria-label="Navigazione principale">
          <Link
            to="/"
            className="app-navbar-brand"
            aria-label="Vai alla home"
            onClick={scrollToTop}
          >
            <i className="fa-solid fa-mobile-screen-button"></i>
            <span className="app-brand-text">
              <span className="app-brand-title">SmartphoneHub</span>
              <span className="app-brand-subtitle">Comparatore smartphone</span>
            </span>
          </Link>

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

          <div className="app-navbar-spacer" aria-hidden="true"></div>
        </nav>
      </header>

      <main className={mainClassName}>
        <div key={location.pathname} className="route-enter">
          <Outlet />
        </div>
      </main>
      {showScrollTop && hasScrolledEnough ? (
        <button
          type="button"
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Torna su"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      ) : null}
    </div>
  );
};

export default Layout;
