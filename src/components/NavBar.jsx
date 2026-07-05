import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function NavBar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const LINKS = [
    { to: "/", label: t("navHome") },
    { to: "/recipes", label: t("navRecipes") },
    { to: "/basics", label: t("navBasics") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sage-500 text-white">
      <div className="container flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="font-display text-xl font-extrabold">
          tessels<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-semibold transition ${
                  active ? "text-white underline underline-offset-8" : "text-white/[.82] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`${lang === "en" ? "NL" : "EN"} — ${t("langSwitchLabel")}`}
            onClick={toggleLang}
            className="flex h-11 min-w-[2.75rem] items-center justify-center rounded-full px-2 text-sm font-bold transition hover:bg-white/10"
          >
            {lang === "en" ? "NL" : "EN"}
          </button>
          <Link
            to="/search"
            aria-label={t("navSearchLabel")}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10"
          >
            <SearchIcon />
          </Link>
          <button
            type="button"
            aria-label={t("navMenuLabel")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10 md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Primary mobile" className="border-t border-white/15 bg-sage-500 md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] px-2 py-3 text-white/[.9]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
