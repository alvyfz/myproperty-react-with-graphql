import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import Error from "../components/error/ErrorNotFound";
// Pages
import Home from "./home/Home";
import Search from "./search/SearchPage";
import DetailProperties from "./detailProperties/DetailProperties";
import Properties from "./properties/Properties";
import House from "./categories/House";
import Apartement from "./categories/Apartement";
import ContactUs from "./contact/ContactUs";
import Login from "./login/Login";
import Wishlist from "./wishlist/wishlist";
import MyAccount from "./myAccount/MyAccount";
import Chat from "./chat/Chat";

export default function Routing() {
  const data = useSelector((s) => s.listProperty.listProperties);
  let path = useLocation();
  return (
    <>
      {path.pathname === "/login" ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/search" element={<Search />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/categories/house" element={<House />} />
        <Route path="/categories/apartement" element={<Apartement />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/properties/:id"
          element={<DetailProperties data={data} />}
        />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
      {path.pathname === "/login" ? null : <Footer />}
    </>
  );
}
