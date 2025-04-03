import React from 'react';
import styles from './CardInfo.module.css';
import { Link } from 'react-router';

export default function CardInfo({ watch }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxLeft}>
          <div className={styles.boxImage}>
            <img src={watch.image} alt="" />
          </div>
        </div>

        <div className={styles.boxRight}>
          <div className={styles.boxRigtTop}>
            <h2>{watch.model}</h2>
          </div>
          <div className={styles.boxRightBottom}>
            <h3>{watch.description}</h3>

            <Link to="/" className={styles.oneCard}>
              Связаться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
