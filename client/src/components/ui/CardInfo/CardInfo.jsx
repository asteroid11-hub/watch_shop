import React from 'react';
import styles from './CardInfo.module.css';
import { Nav, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router';

export default function CardInfo({ watch }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxLeft}>
          <div className={styles.boxImage}>
            <img src={`/uploads/watch/${watch.image}`} alt={watch.model} />
          </div>
        </div>

        <div className={styles.boxRight}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Link
                as={Link}
                to="/"
                style={{
                  color: 'green',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  marginRight: '15px',
                }}
                className="hover-link"
              >
                Связаться с нами
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
