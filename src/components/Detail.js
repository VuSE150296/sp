import { useParams } from "react-router-dom";
import { ListOfFilms } from "../lists/ListOfFilms";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useState, useEffect } from "react";
import { ModalCase } from "./ModalCase";

export default function Details({ idPlayer }) {
  const userName = useParams();
  const { theme, toggle, dark } = useContext(ThemeContext);
  const [APIData, setAPIData] = useState([]);
  const film = ListOfFilms.find((obj) => {
    return obj.id === userName.id;
  });
  const [isOpen, setIsOpen] = useState(false);
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
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
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
