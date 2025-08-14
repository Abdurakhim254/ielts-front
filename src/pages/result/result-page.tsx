import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Natija topilmadi</h2>
        <Button onClick={() => navigate("/")}>Bosh sahifaga qaytish</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <Card title="Test Natijalari" bordered>
        <p><strong>Jami savollar:</strong> {result.total}</p>
        <p style={{ color: "green" }}><strong>To‘g‘ri javoblar:</strong> {result.correct}</p>
        <p style={{ color: "red" }}><strong>Noto‘g‘ri javoblar:</strong> {result.incorrect}</p>
        <Button type="primary" onClick={() => navigate("/")}>
          Bosh sahifaga qaytish
        </Button>
      </Card>
    </div>
  );
};

export default ResultPage;
