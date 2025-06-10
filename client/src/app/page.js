'use client';
import Slide from '../components/slide/slides';
import { slides } from '../data/platforms';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PlatformStep from "../components/stepsection"; // új komponens
import Generate from "../components/generate/page"; // új komponens
import styles from "./partner.module.scss";

export default function Home() {
  const partners = [
  { name: "Partner 1", logo: "/partners/marketing_astro_logo.jpg" },
  { name: "Partner 2", logo: "/partners/openai-icon.png" },
  { name: "Partner 3", logo: "/partners/google-icon.png" },
  { name: "Partner 4", logo: "/partners/diet-pepsi-max-scaled.png" },
  { name: "Partner 5", logo: "/partners/intel-logo.png" },
  { name: "Partner 6", logo: "/partners/openvc-logo-scaled.png" },
  { name: "Partner 7", logo: "/partners/api-people-scaled.png" },
  { name: "Partner 8", logo: "/partners/telekom-sport-logo-scaled.png" },
  { name: "Partner 9", logo: "/partners/vercel-logo.png" },
  { name: "Partner 10", logo: "/partners/rock-fm-logo.png" },
  { name: "Partner 11", logo: "/partners/elte-logo.png" },
  { name: "Partner 12", logo: "/partners/lego-education.png" },
];

  // Partner logók csúszkazása
  const [index, setIndex] = useState(0);
  const logosPerView = 5; // hány logót mutatunk egyszerre
  const logoWidth = 120; // egy logó szélessége pixelben

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index === partners.length) {
      // animáció után azonnal visszaugrik 0-ra (szakadás nélkül)
      setTimeout(() => setIndex(0), 50);
    }
  }, [index, partners.length]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const extendedPartners = partners.concat(partners.slice(0, logosPerView));

  return (
    <>
      <Slide data={slides[currentIndex]} darkMode={isDark} />
      <div style={{ textAlign: 'center', marginTop: 20 }} />

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Generate>
          <button style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
            Start AI Post Generator
          </button>
        </Generate>
      </div>

      <main className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Hogyan működik?
        </h2>

        {/* Slide-szerű, szöveg-kép kombinált blokkok platformokra */}
        <PlatformStep
          platformName="Facebook"
          description="Lépj be Facebook fiókodba, és az AI elkészíti a posztodat az oldaladhoz igazodva."
          imageSrc="/images/facebook-ui.jpg"
        />
        <PlatformStep
          platformName="Instagram"
          description="Az AI segít vizuálisan is kreatív tartalmakat készíteni Instagramra."
          imageSrc="/images/instagram-ui.jpg"
        />
        <PlatformStep
          platformName="Threads"
          description="Könnyed, de figyelemfelkeltő bejegyzések generálása a Threads platformra."
          imageSrc="/images/threads-ui.jpg"
        />
        <PlatformStep
          platformName="X (Twitter)"
          description="Tömör, de hatásos bejegyzések automatikus generálása."
          imageSrc="/images/x-ui.jpg"
        />
        <PlatformStep
          platformName="Linkedin"
          description="Professzionális bejegyzések generálása LinkedIn-re, hogy kiemelkedj a szakmai közösségben."
          imageSrc="/images/linkedin-ui.jpg"
        />
      </main>

      <div className={styles.partnerSlider}>
        <h3 className={styles.title}>Partnereink</h3>
        <div className={styles.sliderWindow} style={{ width: `${logosPerView * logoWidth}px` }}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${index * logoWidth}px)`,
              transition: index === 0 ? "none" : "transform 0.5s cubic-bezier(.4,0,.2,1)"
            }}
          >
            {extendedPartners.map((p, i) => (
              <div className={styles.partnerLogo} key={i}>
                <img src={p.logo} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <div>
          <p>&copy; {new Date().getFullYear()} AI Post Generator. Minden jog fenntartva.</p>
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
            Adatvédelmi irányelvek
          </Link>
        </div>
      </footer>
      
    </>
  );
}
