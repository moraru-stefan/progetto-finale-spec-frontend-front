import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container py-3">
      <nav className="mb-3 d-flex gap-3">
        <Link to="/">Lista</Link>
        <Link to="/compare">Confronta</Link>
        <Link to="/favorites">Preferiti</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
