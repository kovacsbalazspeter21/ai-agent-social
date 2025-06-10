"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./stepsection.module.scss"

export default function PlatformStep({ platformName, description, imageSrc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={styles.container}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={`${platformName} UI`}
          fill
          className={styles.image}
          quality={90}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h2>{platformName}</h2>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
