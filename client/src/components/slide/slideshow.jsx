'use client';
import { useEffect, useState } from 'react';
import Slide from './Slide';
import platforms from '../data/platform';



export default function SlideShow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % platforms.length);
    }, 5000); // 5 másodpercenként vált

    return () => clearInterval(timer);
  }, []);

  return <Slide data={platforms[index]} />;
}
