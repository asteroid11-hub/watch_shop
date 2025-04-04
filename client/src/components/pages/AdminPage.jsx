import React, { useState, useEffect, use } from 'react';
import {
  Container,
  Button,
  Card,
  Form,
  Alert,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../config/axiosInstance';
import CardFeedback from '../ui/CardFeedback';

const AdminPage = ({ user, setUser }) => {
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [feedback, setFeedback] = useState([]);
  const version = true;

  useEffect(() => {
    fetchSecretKey();
    getFeedback();
  }, []);

  const fetchSecretKey = async () => {
    try {
      const res = await axiosInstance.post('/admin/secretkey', user);
      setSecretKey(res.data.secretKey);
    } catch (error) {
      console.log('Error fetching secret key:', error.message);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const res = await axiosInstance
        .get('/admin/getcsv', {
          responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '1feedback.csv');
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url); // Free memory
        });
      console.log(res);
    } catch (error) {
      console.log('Error downloading CSV:', error.message);
    }
  };

  const regenerateSecretKey = async () => {};

  const aiQuestionHandler = async () => {
    try {
      const res = await axiosInstance.post('/admin/aidescription', {
        prompt: aiQuestion,
      });
      setAnswer(res.data);
      setAiQuestion('');
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getFeedback = async () => {
    try {
      const res = await axiosInstance.get('/feedback');
      setFeedback(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (!version)
    return (
      <>
        <div className="d-flex">
          <Container className="mt-5" style={{ width: '50%' }}>
            <h1 className="text-center mb-4">Admin Dashboard</h1>

            {message && (
              <Alert
                variant={isError ? 'danger' : 'success'}
                dismissible
                onClose={() => setMessage('')}
              >
                {message}
              </Alert>
            )}

            <Card className="mb-4">
              <Card.Header>Database Operations</Card.Header>
              <Card.Body>
                <Button variant="primary" onClick={handleDownloadCSV}>
                  Экспорт заявок в CSV файл
                </Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Admin Registration Key</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Secret Key</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type={showKey ? 'text' : 'password'}
                      value={secretKey}
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    This key is required for new admin registration
                  </Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={regenerateSecretKey}>
                  Regenerate Key
                </Button>
              </Card.Body>
            </Card>
            {!answer ? (
              <Card>
                <Card.Header>AI Question</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Задайте вопрос AI</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  <Button variant="warning" onClick={aiQuestionHandler}>
                    Send
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Header>AI Question</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <div className="d-flex">
                      <p>{answer.description}</p>
                    </div>
                  </Form.Group>
                  <Form.Control
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                  />
                  <Button variant="warning" onClick={aiQuestionHandler}>
                    Send
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Container>
          <Container
            style={{ display: 'flex', width: '50%', flexWrap: 'wrap', gap: '16px' }}
          >
            {feedback.map((el) => CardFeedback(el))}
          </Container>
        </div>
      </>
    );

  if (version)
    return (
      <div className="p-4">
        <Container fluid>
          <Row className="g-4">
            {/* Left Side */}
            <Col md={6}>
              <h1 className="text-center mb-4 display-4">Admin Dashboard</h1>

              {message && (
                <Alert
                  variant={isError ? 'danger' : 'success'}
                  dismissible
                  onClose={() => setMessage('')}
                  className="mb-4"
                >
                  {message}
                </Alert>
              )}

              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                  Database Operations
                </Card.Header>
                <Card.Body>
                  <Button
                    variant="outline-primary"
                    onClick={handleDownloadCSV}
                    className="w-100"
                  >
                    Экспорт заявок в CSV файл
                  </Button>
                </Card.Body>
              </Card>

              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                  Admin Registration Key
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Secret Key</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showKey ? 'text' : 'password'}
                        value={secretKey}
                        readOnly
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? 'Hide' : 'Show'}
                      </Button>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      This key is required for new admin registration
                    </Form.Text>
                  </Form.Group>
                  <Button
                    variant="outline-warning"
                    onClick={regenerateSecretKey}
                    className="mt-2"
                  >
                    Regenerate Key
                  </Button>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">AI Question</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Задайте вопрос AI</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="Enter your question..."
                      />
                      <Button variant="outline-warning" onClick={aiQuestionHandler}>
                        Send
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {answer && (
                    <Card className="mt-3 bg-light">
                      <Card.Body>
                        <p className="lead mb-0">{answer.description}</p>
                      </Card.Body>
                    </Card>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Right Side */}
            <Col md={6}>
              <h2 className="text-center mb-4 display-6">User Feedback</h2>
              <Row xs={1} md={2} lg={2} className="g-4">
                {feedback.map((el, index) => (
                  <Col key={index}>{CardFeedback(el)}</Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default AdminPage;
