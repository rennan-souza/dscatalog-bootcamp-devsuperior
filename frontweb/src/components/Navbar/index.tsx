import 'bootstrap/js/src/collapse.js';
import './styles.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import history from '../../util/history';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuthData } from '../../util/storage';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        autheticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        autheticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      autheticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>DS Catalog</h4>
        </Link>

        <button
          className="navbar-toggler  border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
            <li className="nav-login-logout-mobile mt-4">
              {authContextData.autheticated ? (
                <a href="#logout" onClick={handleLogoutClick}>
                  LOGOUT
                </a>
              ) : (
                <Link to="/admin/auth">LOGIN</Link>
              )}
            </li>
          </ul>
        </div>

        <div className="nav-login-logout">
          {authContextData.autheticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
