import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/footer";
import Detail from "./components/Detail";
import Contact from "./components/Contact";
import News from "./components/News";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AddNews from "./components/AddNews";
import TopNews from "./components/About";

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
            <News
              setIdPlayer={setIdPlayer}
              loading={loading}
              setLoading={setLoading}
            />
          }
        ></Route>
        <Route
          path="/addNews"
          exact
          element={<AddNews idPlayer={idPlayer} setIdPlayer={setIdPlayer} />}
        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail idPlayer={idPlayer} />}
        ></Route>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/topnews" element={<TopNews />}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
