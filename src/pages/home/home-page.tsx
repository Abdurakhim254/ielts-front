import { Card, Typography, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          border: "none",
          background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            <SmileOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
            <Title level={2} style={{ marginTop: "10px" }}>
              Xush kelibsiz!
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#555" }}>
              Bu sizning <b>Dashboard</b> bosh sahifangiz. Chap menyudan kerakli
              bo‘limni tanlang va ishlashni boshlang.
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
