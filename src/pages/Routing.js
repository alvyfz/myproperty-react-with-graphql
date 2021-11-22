import { Routes, Route } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Test from "./test";
// Pages
import Home from "./home/Home";
import Search from "./search/SearchPage";
import DetailProperties from "./detailProperties/DetailProperties";
import { useSelector } from "react-redux";
export default function Routing() {
  const data = useSelector((s) => s.listProperty.listProperties);
  // let path = useLocation();
  return (
    <>
      {/* {path.pathname === "/login" || "/signup" ? null : <Navbar />} */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/properties/:id"
          element={<DetailProperties data={data} />}
        />
      </Routes>
      <Footer />
    </>
  );
}
