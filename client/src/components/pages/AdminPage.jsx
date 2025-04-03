import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Fetch secret key from backend
    fetchSecretKey();
  }, []);

  const fetchSecretKey = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/secret-key');
      const data = await response.json();
      setSecretKey(data.key);
    } catch (error) {
      setMessage('Failed to fetch secret key');
      setIsError(true);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/export-csv');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('Data downloaded successfully');
      setIsError(false);
    } catch (error) {
      setMessage('Failed to download data');
      setIsError(true);
    }
  };

  const regenerateSecretKey = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/regenerate-key', {
        method: 'POST'
      });
      const data = await response.json();
      setSecretKey(data.key);
      setMessage('Secret key regenerated');
      setIsError(false);
    } catch (error) {
      setMessage('Failed to regenerate secret key');
      setIsError(true);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {message && (
        <Alert variant={isError ? 'danger' : 'success'} dismissible onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>Database Operations</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleDownloadCSV}>
            Download Data as CSV
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
    </Container>
  );
};

export default AdminPage;