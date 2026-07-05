import { getFeatured, getRecipes } from "../lib/data.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import WhatsNewRail from "../components/WhatsNewRail.jsx";

export default function Home() {
  const { lang } = useLanguage();
  const featured = getFeatured(lang);
  const recipes = getRecipes(lang);

  return (
    <main id="main" className="page-enter">
      <div className="container">
        <HeroCarousel recipes={featured} />
      </div>
      <div className="container pb-16">
        <WhatsNewRail recipes={recipes} />
      </div>
    </main>
  );
}
