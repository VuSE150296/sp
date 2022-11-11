import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { useLocation } from "react-router-dom";
import LoginGoogle from "./LoginGoogle";
// import { Navbar, NavItem, Icon } from 'react-materialize'

export default function Navigation({ loading, setLoading }) {
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location --> /contact
  const { pathname } = location;
  //split method to get the name of the path in array --> ['', 'contact']
  const splitLocation = pathname.split("/");
  const { theme, toggle, dark } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(null);
  useEffect(
    () => {
      setLoading(false);
      setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
    },
    // eslint-disable-next-line
    [loading]
  );
  return (
    <header>
      <div
        className="header"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <div className="headerLogo">FILMS</div>
        <div className="navbar">
          <nav>
            <ul className="nav-cont">
              {isLogin && (
                <li>
                  <Link className="active" to={"/addFilm"}>
                    ADD
                  </Link>
                </li>
              )}

              <li>
                <Link className="active" to={""}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={"news"}>News</Link>
              </li>
              <li>
                <Link to={"about"}>About</Link>
              </li>
              <li>
                <Link to={"contact"}>Contact</Link>
              </li>
              {isLogin ? (
                <>
                  <li>
                    <Link
                      to="#"
                      onClick={() => {
                        localStorage.removeItem("userLogin");
                        setLoading(true);
                      }}
                    >
                      LOGOUT
                    </Link>
                  </li>
                  <img
                    src={isLogin.imageUrl}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </>
              ) : (
                <LoginGoogle setLoading={setLoading} />
              )}
            </ul>
          </nav>
        </div>
        <div style={{ position: "relative" }}>
          <a
            className="switch-mode"
            href="#"
            onClick={toggle}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
              outline: "none",
            }}
            data-testid="toggle-theme-btn"
          >
            Switch Nav {!dark ? "On" : "Off"}
          </a>
        </div>
      </div>
    </header>
  );
}
