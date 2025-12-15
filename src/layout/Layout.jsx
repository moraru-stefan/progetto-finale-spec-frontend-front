import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container py-3">
      <nav className="mb-3 d-flex justify-content-center align-items-center">
        <div className="app-navbar">
           <NavLink to="/" className="nav-link">
            <i className="fa-solid fa-house nav-icon"></i>
            <span>Home</span>
          </NavLink>
           <NavLink to="/smartphones" className="nav-link">
            <i className="fa-solid fa-mobile-screen nav-icon"></i>
            <span>Smartphones</span>
          </NavLink>
          <NavLink to="/compare" className="nav-link">
            <i className="fa-solid fa-balance-scale nav-icon"></i>
            <span className="ms-1">Confronta</span>
          </NavLink>
         <NavLink to="/favorites" className="nav-link">
            <i className="fa-solid fa-heart nav-icon"></i>
            <span>Preferiti</span>
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <i
        className="fa-regular fa-circle-up scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></i>
    </div>
  );
};

export default Layout;
