import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container py-3">
      <nav className="mb-3 d-flex justify-content-between align-items-center">
        <div className="app-navbar">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/compare" className="nav-link">Confronta</NavLink>
          <NavLink to="/favorites" className="nav-link">Preferiti</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
