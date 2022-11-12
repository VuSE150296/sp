import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import { Section, Card, Row, Col, Icon } from 'react-materialeze';

function News({ setIdPlayer, loading, setLoading }) {
  const [isLogin, setIsLogin] = useState(null);
  const [value, setValue] = useState(false);
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    fetch("https://636f06a5f2ed5cb047d39abd.mockapi.io/news", {
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
    fetch(`https://636f06a5f2ed5cb047d39abd.mockapi.io/news/${id}`, {
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
      {APIData.map((news, index) => (
        <div className="card" key={index}>
          <div className="item">
            <div className="avatarImg">
              <img src={news.img} alt="" />
            </div>
          </div>
          <div className="profile">
            <span className="name">{news.title}</span>
            <div className="year">
              <span className="info">{news.description}</span>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`detail/${news.id}`}
                  onClick={() => setIdPlayer(news.id)}
                >
                  <p>
                    <button>Detail</button>
                  </p>
                </Link>
                {isLogin && (
                  <>
                    <Link to="/addNews" onClick={() => setIdPlayer(news.id)}>
                      <p>
                        <button
                          style={{ background: "darkcyan", cursor: "pointer" }}
                        >
                          Update
                        </button>
                      </p>
                    </Link>
                    <Link to="#" onClick={() => deleteFilm(news.id)}>
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
                {news.views} views
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default News;
