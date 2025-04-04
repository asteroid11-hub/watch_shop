import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

export default function About({ isLoggedIn }) {
  const initialContent = `
    <p><strong>Время – это искусство.</strong> Мы – команда мастеров, для которых создание часов не просто ремесло, а настоящее искусство. Каждая наша модель – это сочетание традиционного мастерства, современных технологий и смелых дизайнерских решений.</p>
    <p>Наши часы создаются вручную, с особым вниманием к деталям. Мы используем только премиальные материалы: благородные металлы, натуральную кожу, сапфировое стекло и эксклюзивные механизмы.</p>
    <p>Каждый экземпляр – уникален, как и его владелец. Мы не просто создаем часы – мы создаем историю, которая будет идти с вами <strong>в ногу со временем.</strong></p>
  `;

  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('aboutContent');
    return savedContent ? savedContent : initialContent;
  });

  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
      localStorage.setItem('aboutContent', newContent);
    },
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow-lg border-0">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">
                О нас
              </Card.Title>
              {isEditing ? (
                <div className="mt-3">
                  <EditorContent editor={editor} />
                </div>
              ) : (
                <div className="mt-3" dangerouslySetInnerHTML={{ __html: content }} />
              )}
            </Card.Body>
            {isLoggedIn && (
              <div className="text-center mb-3">
                <Button
                  variant="dark"
                  className="d-flex align-items-center ms-4"
                  onClick={toggleEdit}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
