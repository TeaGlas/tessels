import { useLanguage } from "../context/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-sage-900 text-white/90">
      <div className="container flex flex-col items-start justify-between gap-1 py-10 sm:flex-row sm:items-center">
        <p className="font-display text-lg font-extrabold">
          tessels<span className="text-accent">.</span>
        </p>
        <p className="text-sm text-white/70">{t("footerTagline")}</p>
      </div>
    </footer>
  );
}
