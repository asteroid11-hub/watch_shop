import React from 'react';
import styles from './CardInfo.module.css';

export default function CardInfo({ watch }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxLeft}>
          <div className={styles.boxImage}>
            {/* {watch.image} */}
            <img src={watch.image} alt="" />
          </div>
        </div>

        <div className={styles.boxRight}>
          <div className={styles.boxRigtTop}>
            <h2>{watch.model}</h2>
          </div>
          <div className={styles.boxRightBottom}>
            <h3>{watch.description}</h3>
            <button className={styles.oneCardBtn}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
