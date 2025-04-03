import Card from 'react-bootstrap/Card';

function BasicExample(item) {
  return (
    <Card xs={6} key={item.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.message}</Card.Text>
        <Card.Text>{item.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
