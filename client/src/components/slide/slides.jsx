'use client';
import styles from './slides.module.scss';
import Image from 'next/image';

export default function Slide({ data }) {
  if (!data) return null;

  return (
    <section className={styles.slide}>
      <div
        className={styles.left}
        style={{
          background: `linear-gradient(135deg, ${data.colorLight}, ${data.colorDark})`,
        }}
      >
        <div className={styles['text-wrapper']}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          {data.logo && (
            <img src={data.logo} alt={data.name} className={styles.logo} />
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles['image-wrapper']}>
          <Image
            src={data.image}
            alt={`${data.name} AI`}
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
