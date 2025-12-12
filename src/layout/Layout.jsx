import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container py-3">
      <nav className="mb-3 d-flex justify-content-between align-items-center">
        <div className="app-navbar">
          <Link to="/">Home</Link>
          <Link to="/compare">Confronta</Link>
          <Link to="/favorites">Preferiti</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
