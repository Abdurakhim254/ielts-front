import React, { useEffect, useState } from "react";
import { Card, List, Typography, Tag, Spin, message, Button, Space, Popconfirm } from "antd";
import { request } from "../../../config/axios.instance";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const GetAllQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const res = await request.get("/question");
      setQuestions(res.data.questions || []);
    } catch (error) {
      console.error(error);
      message.error("Error fetching questions");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      await request.delete(`/question/${id}`);
      message.success("Question deleted successfully");
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      console.error(error);
      message.error("Failed to delete question");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        📋 All Questions
      </Title>

      {questions.map((q) => (
        <Card
          key={q.id}
          style={{ marginBottom: 20 }}
          title={
            <span
              style={{ cursor: "pointer", color: "#1677ff" }}
              onClick={() => navigate(`/dashboard/question/get/${q.id}`)
            } // GetOneQuestion sahifasiga
            >
              {q.text}{" "}
              <Tag color="blue" style={{ fontSize: "12px" }}>
                ID: {q.id}
              </Tag>
            </span>
          }
          extra={
            <Text type="secondary">
              {new Date(q.createdAt).toLocaleDateString()}
            </Text>
          }
        >
          <List
            dataSource={q.options}
            renderItem={(option: string, idx: number) => (
              <List.Item>
                <Text strong={idx === q.correctIndex}>
                  {idx + 1}. {option}{" "}
                  {idx === q.correctIndex && (
                    <Tag color="green" style={{ marginLeft: 8 }}>
                      Correct
                    </Tag>
                  )}
                </Text>
              </List.Item>
            )}
          />

          <Space style={{ marginTop: 10 }}>
            <Button
              type="primary"
              onClick={() => 
                navigate(`/dashboard/question/edit/${q.id}`)
            }
            >
              Edit
            </Button>

            <Popconfirm
              title="Are you sure delete this question?"
              onConfirm={() => deleteQuestion(q.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </Card>
      ))}
    </div>
  );
};
