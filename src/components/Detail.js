import React from "react";
import { useState, useEffect } from "react";

export default function Details({ idPlayer }) {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    fetch(`https://636f06a5f2ed5cb047d39abd.mockapi.io/news/${idPlayer}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  console.log(APIData);

  return (
    <header>
      <div
        className="product-card"
        // style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <div className="detail-content-header">
          <nav className="product-tumb">
            <img src={APIData.img} alt="" />
            <span className="info">{APIData.views} views</span>
          </nav>
        </div>
        <div className="product-titile">
          <h2>{APIData.title}</h2>
          <h5>{APIData.description}</h5>
          <div className="product-content">{APIData.content}</div>
        </div>
      </div>
    </header>
  );
}
