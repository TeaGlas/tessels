import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Browse from "./pages/Browse.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import Search from "./pages/Search.jsx";
import Basics from "./pages/Basics.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <NavBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Browse />} />
          <Route path="/recipes/:slug" element={<RecipeDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/basics" element={<Basics />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
