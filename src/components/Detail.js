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
    fetch(`https://636e5dac182793016f3ec699.mockapi.io/news/${idPlayer}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <header>
      <div
        className="product-card"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <div>
          <nav className="product-tumb">
            <img src={APIData.image} />
          </nav>
        </div>
        <div className="trailer">
          <a
            onClick={() => setIsOpen(true)}
            className="btn-floating waves-effect"
          >
            <span class="material-icons">ondemand_video</span>
          </a>
          {isOpen && <ModalCase setIsOpen={setIsOpen} film={APIData} />}
        </div>
        <div className="product-titile">
          <h2>{APIData.title}</h2>
          <div className="product-content">{APIData.content}</div>
        </div>
      </div>
    </header>
  );
}
