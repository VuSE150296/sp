import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/footer";
import Detail from "./components/Detail";
import Contact from "./components/Contact";
import About from "./components/About";
import Film from "./components/Film";
import { Routes, Route } from "react-router-dom";
import News from "./components/News";
import { useState } from "react";
import AddFilm from "./components/AddFilm";

function App() {
  const [loading, setLoading] = useState(false);
  const [idPlayer, setIdPlayer] = useState(null);
  return (
    <div className="App">
      <Navigation loading={loading} setLoading={setLoading} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Film
              setIdPlayer={setIdPlayer}
              loading={loading}
              setLoading={setLoading}
            />
          }
        ></Route>
        <Route
          path="/addFilm"
          exact
          element={<AddFilm idPlayer={idPlayer} setIdPlayer={setIdPlayer} />}
        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail idPlayer={idPlayer} />}
        ></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/news" element={<News />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
