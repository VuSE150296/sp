import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import { Section, Card, Row, Col, Icon } from 'react-materialeze';

function Film({ setIdPlayer, loading, setLoading }) {
  const [isLogin, setIsLogin] = useState(null);
  const [value, setValue] = useState(false);
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    fetch("https://636e5dac182793016f3ec699.mockapi.io/news", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [value]);

  useEffect(
    () => {
      setLoading(false);
      setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
    },
    // eslint-disable-next-line
    [loading]
  );

  const deleteFilm = (id) => {
    fetch(`https://636e5dac182793016f3ec699.mockapi.io/news/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setValue(!value);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="container">
      {APIData.map((film, index) => (
        <div className="card" key={index}>
          <div className="item">
            <div className="avatarImg">
              <img src={film.image} alt="" />
            </div>
          </div>
          <div className="profile">
            <span className="name">{film.title}</span>
            <div className="year">
              <span className="info">{film.year}</span>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`detail/${film.id}`}
                  onClick={() => setIdPlayer(film.id)}
                >
                  <p>
                    <button>Detail</button>
                  </p>
                </Link>
                {isLogin && (
                  <>
                    <Link to="/addFilm" onClick={() => setIdPlayer(film.id)}>
                      <p>
                        <button
                          style={{ background: "darkcyan", cursor: "pointer" }}
                        >
                          Update
                        </button>
                      </p>
                    </Link>
                    <Link to="#" onClick={() => deleteFilm(film.id)}>
                      <p>
                        <button
                          style={{ background: "crimson", cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="skills">
              <span className="info" key={index}>
                {film.nation}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Film;
