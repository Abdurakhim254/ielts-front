import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  List, Typography, Tag, Spin, message } from "antd";
import { request } from "../../../config/axios.instance";

const { Title, Text } = Typography;

const GetOneQuestion: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(id);
  
  const fetchQuestion = async () => {
    try {
      const res = await request.get(`/question/${id}`);
    
      setQuestion(res.data.question);
    } catch (error) {
      console.error(error);
      message.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!question) {
    return (
      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <Text type="danger">Question not found</Text>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Title level={2}>
        {question.text}{" "}
        <Tag color="blue">ID: {question.id}</Tag>
      </Title>
      <List
        dataSource={question.options}
        renderItem={(option: string, idx: number) => (
          <List.Item>
            <Text strong={idx === question.correctIndex}>
              {idx + 1}. {option}{" "}
              {idx === question.correctIndex && (
                <Tag color="green" style={{ marginLeft: 8 }}>
                  Correct
                </Tag>
              )}
            </Text>
          </List.Item>
        )}
      />
      <Text type="secondary">
        Created at: {new Date(question.createdAt).toLocaleString()}
      </Text>
    </div>
  );
};

export default GetOneQuestion;
